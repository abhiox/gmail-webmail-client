import { combineReducers } from 'redux';
import MailReducer from './reducer_mail';
import MessageReducer from './reducer_message';
import LabelReducer from './reducer_label';
// import FetchLabelReducer from './reducer_fetch_label';

const rootReducer = combineReducers({
	mails: MailReducer,
	messages: MessageReducer,
	labels: LabelReducer,
	// singleLabel: FetchLabelReducer
});

export default rootReducer;
