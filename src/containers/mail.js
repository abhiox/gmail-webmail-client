import React, { Component } from 'react';
import loadjs from 'loadjs';
// import { connect } from 'react-redux';
// import { fetchMail } from '../actions';

import EmailListing from './email-list';

const CLIENT_ID = "811270220529-3902tdmd6ctkfp6asgof82ve7sqsd82g.apps.googleusercontent.com";
const API_KEY = "AIzaSyA56hafbNOeQXb8r88SpmDRPBmYk_212xs";
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly', 'https://www.googleapis.com/auth/gmail.labels', 'https://www.googleapis.com/auth/gmail.modify'];
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"];

class MailList extends Component {
	constructor(props) {
	  	super(props);
	
	  	this.state = {
	  		showAuthorise: true,
	  		showAuthoriseButton: false,
	  	};

	  	this.handleLoad = this.handleLoad.bind(this);
	  	this.loadGmailApi = this.loadGmailApi.bind(this);
	  	this.handleAuthResult = this.handleAuthResult.bind(this);
	  	this.handleAuthClick = this.handleAuthClick.bind(this);
	  	this.checkAuth = this.checkAuth.bind(this);
	}

	loadGmailApi(){
		gapi.client.load('gmail', 'v1', () => {

			// this.props.fetchMail();
			this.setState({showAuthorise: false});
		});

	}

	handleAuthClick(){
		gapi.auth.authorize({
          client_id: CLIENT_ID,
          scope: SCOPES,
          immediate: false
        }, this.handleAuthResult);
        return false;
	}

	handleAuthResult(authResult){
		// console.log(authResult);
    	if(authResult && !authResult.error) {

          	localStorage.setItem('user', JSON.stringify(authResult));

          	this.loadGmailApi();
        } else {
        	this.setState({showAuthoriseButton: true});
        }
	}

	checkAuth(){
		// console.log('checking auth');
		gapi.auth.authorize({
          	client_id: CLIENT_ID,
          	scope: SCOPES,
          	immediate: true
        }, this.handleAuthResult);
	}

	handleLoad(){
		// console.log('checking handle');
		// console.log(gapi);
		// console.log(API_KEY);

		gapi.client.setApiKey(API_KEY);
		window.setTimeout(this.checkAuth, 1);
	}

	componentDidMount(){
		window.handleGoogleClientLoad = () => {
			this.handleLoad();
		}

		loadjs('https://apis.google.com/js/client.js?onload=handleGoogleClientLoad', {
			// success: () => {
			// 	console.log('loaded');
			// 	window.setTimeout(this.handleLoad(), 1000);
			// }
		});
	}

	render() {
		return (
			<div>
				{ this.state.showAuthorise &&
					<div>
						<h1>Welcome to Awesome Web Client</h1>
						{ this.state.showAuthoriseButton && 
							<button className="btn btn-primary" onClick={this.handleAuthClick}>Authorize</button>
						}
					</div>
				}

				{ !this.state.showAuthorise &&
					// <EmailListing mails={this.props.mails} />
					<EmailListing />
				}

			</div>
		);
	}
}

// function mapStatetoProps(state){
// 	return { 
// 		mails: state.mails,
// 		// messages: state.messages
// 	};
// }

// export default connect(mapStatetoProps, { fetchMail })(MailList);
export default MailList;