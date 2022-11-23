import User from "../models/Users.js";

export const updateUser = async (req, res, next) => {
    try{
        const UpdatedUser = await User.findById(req.params.id);
        if(UpdatedUser.userId === req.body.userId){
            await UpdatedUser.updateOne({$set: req.body}), {new: true};
            res.status(200).json("The User has been updated");
        }else{
            res.status(403).json("You can update only your User");
        }
    }catch (err){
        next(err);
    }
};

export const deleteUser = async (req, res, next) => {
    try{
        const DeletedUser = await User.findById(req.params.id);
        if(DeletedUser.userId === req.body.userId){
            await DeletedUser.deleteOne();
            res.status(200).json("The User has been deleted");
        }else{
            res.status(403).json("You can delete only your User");
        }
    }catch (err){
        next(err);
    }
};

export const getUser = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    }catch (err){
        next(err);
    }
};

export const getAllUser = async (req, res, next) => {
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch (err){
        next(err);
    }
};