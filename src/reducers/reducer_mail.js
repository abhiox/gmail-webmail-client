
import { FETCH_MAIL, FETCH_LABEL } from '../actions';

export default function(state = [], action){
	switch(action.type){
		case FETCH_MAIL:
			// console.log(action.payload);
			return [ ...state, ...action.payload.result.messages ];

		case FETCH_LABEL:
			// console.log(action.payload);
			// console.log('label messages coming through');

			const newState = action.payload.result.messages;

			if(!newState){
				return [];
			}else{
				return action.payload.result.messages;
			}

		default:
			return state;
	}
}