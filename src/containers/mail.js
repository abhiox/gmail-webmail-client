import React, { Component } from 'react';
import loadjs from 'loadjs';

import EmailListing from './email-list';

const CLIENT_ID = "<your-client-id>";
const API_KEY = "<your-api-key>";
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
    	if(authResult && !authResult.error) {

          	localStorage.setItem('user', JSON.stringify(authResult));

          	this.loadGmailApi();
        } else {
        	this.setState({showAuthoriseButton: true});
        }
	}

	checkAuth(){
		gapi.auth.authorize({
          	client_id: CLIENT_ID,
          	scope: SCOPES,
          	immediate: true
        }, this.handleAuthResult);
	}

	handleLoad(){
		gapi.client.setApiKey(API_KEY);
		window.setTimeout(this.checkAuth, 1);
	}

	componentDidMount(){
		window.handleGoogleClientLoad = () => {
			this.handleLoad();
		}

		loadjs('https://apis.google.com/js/client.js?onload=handleGoogleClientLoad', {});
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
					<EmailListing />
				}

			</div>
		);
	}
}

export default MailList;