import jws from "jsonwebtoken";
import {createError} from "../utils/error.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if(!token){
        return next(createError("You are not authenticated", 401));
    }

    jws.verify(token, process.env.JWT, (err, user) => {
        if(err)
            return next(createError("You are not authenticated", 401));

        req.user = user;
        next();
    });
};

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next,() => {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        } else {
            return next(createError("You are not authenticated", 401));
        }
    });
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next,() => {
        if(req.user.isAdmin){
            next();
        } else {
            return next(createError("You are not authenticated", 401));
        }
    });
};