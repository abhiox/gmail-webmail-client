import _ from 'lodash';
import { FETCH_MESSAGE, EMPTY_MESSAGES, MODIFY_MESSAGE } from '../actions';

export default function(state = [], action){
	switch(action.type){
		case FETCH_MESSAGE:
			// console.log(action);
			// console.log(action.payload);

			const result = action.payload.result;
			const message = {
				id: result.id,
			};

			_.forEach(result.payload.headers, (value, key) => {
				let temp = value.name;
				message[temp] = value;
			});

			// console.log(message);

			// const an = [];
			// console.log([...an, message]);

			// console.log(state);

			return [ ...state, message ];

		case EMPTY_MESSAGES:
			// console.log('emptying messages');
			// console.log(action);
			return [];

		case MODIFY_MESSAGE:
			// console.log(action);

			// var newState = state;
			// _.forEach(newState, (value, key) => {

			// });

			_.remove(state, (obj) => {
				return obj.id == action.meta.id;
			});

			// console.log(state);

			return state;

		default:
			return state;
	}
}