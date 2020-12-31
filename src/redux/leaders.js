import * as ActionTypes from './ActionTypes';

export const Leaders= (state = {isLoading:true, errMess:null, leaders:[]}, actions) =>{
    switch(actions.type){
        case ActionTypes.ADD_LEADERS:
            return{...state, isLoading: false, errMess:null, leaders:actions.payload};

        case ActionTypes.LEADERS_LOADING:
            return{...state, isLoading: true, errMess:null, leaders:[]};

        case ActionTypes.LEADERS_FAILED:
            return{...state, isLoading: false, errMess:actions.payload};

        default:
            return state;
    }
}