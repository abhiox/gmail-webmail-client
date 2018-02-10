
// import axios from 'axios';

// const CLIENT_ID = "811270220529-3902tdmd6ctkfp6asgof82ve7sqsd82g.apps.googleusercontent.com";
// const API_KEY = "AIzaSyA56hafbNOeQXb8r88SpmDRPBmYk_212xs";

export const FETCH_MAIL = 'fetch_mail';
export const FETCH_MESSAGE = 'fetch_messsage';
export const EMPTY_MESSAGES = 'empty_messages';
export const FETCH_LABELS = 'fetch_labels';
export const CREATE_LABEL = 'create_label';
export const DELETE_LABEL = 'delete_label';
export const UPDATE_LABEL = 'update_label';
export const FETCH_LABEL = 'fetch_label';
export const MODIFY_MESSAGE = 'modify_message';


export function fetchMail() {
	// const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);

	const request = gapi.client.gmail.users.messages.list({
		'userId': 'me',
		'labelIds': 'INBOX',
        'maxResults': 10
	});

	return {
		type: FETCH_MAIL,
		payload: request
	};
}

export function fetchMessage(id) {
	const request = gapi.client.gmail.users.messages.get({
		'userId': 'me',
		'id': id
	});

	return {
		type: FETCH_MESSAGE,
		payload: request
	};
}

export function emptyMessages() {
	// const request = gapi.client.gmail.users.messages.get({
	// 	'userId': 'me',
	// 	'id': id
	// });

	return {
		type: EMPTY_MESSAGES,
		// payload: request
		meta:{
			empty: true
		}
	};
}

export function fetchLabels() {
	const request = gapi.client.gmail.users.labels.list({
		'userId': 'me'
	});

	return {
		type: FETCH_LABELS,
		payload: request
	};
}

export function createLabel(name) {
	const request = gapi.client.gmail.users.labels.create({
		'userId': 'me',
		'resource': {
			'name': name,
			'labelListVisibility': 'labelShow',
			'messageListVisibility': 'show'
		}
	});

	return {
		type: CREATE_LABEL,
		payload: request
	};
}

export function deleteLabel(labelId) {
	const request = gapi.client.gmail.users.labels.delete({
		'userId': 'me',
		'id': labelId
	});

	return {
		type: DELETE_LABEL,
		payload: request,
		meta: {
			labelId	
		}
		// labelId,
	};
}

export function updateLabel(labelId, name, labelListVisibility = 'labelShow', messageListVisibility = 'show') {
	const request = gapi.client.gmail.users.labels.update({
		'userId': 'me',
		'id': labelId,
		'resource': {
			'id': labelId,
			'name': name,
			'labelListVisibility': labelListVisibility,
			'messageListVisibility': messageListVisibility
		}
	});

	return {
		type: UPDATE_LABEL,
		payload: request
	};
}

export function fetchLabel(labelId) {
	// console.log('fetching');
	// console.log(labelId);
	const request = gapi.client.gmail.users.messages.list({
		'userId': 'me',
		'labelIds': [labelId],
		'maxResults': 10
	});

	return {
		type: FETCH_LABEL,
		payload: request,
		meta: {
			empty: true
		}
	};
}

export function modifyMessage(id, addLabelId, removeLabel) {
	const request = gapi.client.gmail.users.messages.modify({
		'userId': 'me',
		'id': id,
		'addLabelIds': [ addLabelId ],
	    'removeLabelIds': [ removeLabel ]
	});

	return {
		type: MODIFY_MESSAGE,
		payload: request,
		meta: {
			id
		}
	};
}


