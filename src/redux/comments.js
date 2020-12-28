import {COMMENTS} from '../shared/comments';
import * as ActionTypes from './ActionTypes';

export const Comments= (state = COMMENTS, actions) =>{
    switch(actions.type){
        case ActionTypes.ADD_COMMENT:
            var comment =  actions.payload;
            comment.id = state.length;
            comment.date = new Date().toISOString();
            console.log("Comment: ", comment);
            return state.concat(comment);
        default:
            return state;
    }
}