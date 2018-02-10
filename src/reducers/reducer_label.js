import _ from 'lodash';
import { FETCH_LABELS, CREATE_LABEL, DELETE_LABEL, UPDATE_LABEL } from '../actions';

export default function(state = [], action){
	switch(action.type){
		case FETCH_LABELS:
			// console.log(action.payload);

			return action.payload.result.labels;

		case CREATE_LABEL: 
			// console.log(action);
			// console.log(action.payload);
			return [ ...state, action.payload.result ];		

		case DELETE_LABEL: 
			// console.log(action);
			// console.log(action.payload);

			// let obj = {};
			// const newState = state;
			// _.forEach(newState, (value, key) => {
			// 	if(value.id == action.labelId){
			// 		obj = value;
			// 	}
			// });

			_.remove(state, (obj) => {
				return obj.id == action.meta.labelId;
			});

			return state;

		case UPDATE_LABEL:
			// console.log(action); 
			// console.log(action.payload); 
			// console.log(state); 

			// let obj = {};
			
			// _.forEach(state, (value, key) => {
			// 	if(value.id == action.payload.result.id){
			// 		state.splice(key, 1);
			// 	}
			// });

			_.remove(state, (obj) => {
				return obj.id == action.payload.result.id;
			});

			// _.omit(state, obj);

			return [ ...state, action.payload.result ];

		default:
			return state;
	}
}