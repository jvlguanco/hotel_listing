import {createContext, useEffect, useReducer} from 'react'

const INITIAL_STATE = {
    reviews:JSON.parse(localStorage.getItem("reviews")) || [],
    loading: false,
    error:null,
};

export const ReviewContext = createContext(INITIAL_STATE);

const ReviewReducer = (state, action) => {
    switch (action.type){
        case 'REVIEW_START':
            return {
                reviews:[],
                loading: true,
                error:null,
            };
        case 'REVIEW_SUCCESS':
            return {
                reviews:action.payload,
                loading: false,
                error:null,
            };
        case 'REVIEW_FAIL':
            return {
                reviews:[],
                loading: true,
                error:action.payload,
            };
        default:
            return state;
    }
};

export const ReviewContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(ReviewReducer, INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem("reviews", JSON.stringify(state.reviews));
    }, [state.reviews]);

        return(
            <ReviewContext.Provider value={{
                reviews: state.reviews,
                loading: state.loading,
                error: state.error,
                dispatch,
            }}>
                {children}
            </ReviewContext.Provider>
        )
};