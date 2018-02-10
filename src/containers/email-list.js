import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMail, fetchLabels, fetchMessage, deleteLabel, createLabel, updateLabel, fetchLabel, emptyMessages, modifyMessage } from '../actions';
import _ from 'lodash';
import { Draggable, Droppable } from 'react-drag-and-drop';

var should_continue = true;



class EmailListing extends Component {
	constructor(props) {
	  	super(props);
	
	  	this.state = {
	  		labelname: '',
	  		editedlabelname: '',
	  		editLabelId: '',
	  		currentHoverLabel: '',
	  		activeLabel: 'INBOX',
	  		activeLabelName: 'Inbox',
	  	};

	  	this.getAllMessages = this.getAllMessages.bind(this);
	  	this.renderMessages = this.renderMessages.bind(this);
	  	this.checkMails = this.checkMails.bind(this);
	}

	componentDidMount(){
		this.props.fetchMail();
		this.props.fetchLabels();

		// console.log(this.props.mails);
	}

	getAllMessages(source){
		this.props.emptyMessages();
		_.forEach(source, (value, key) => {
			this.props.fetchMessage(value.id);
		});
	}

	renderMessages(){
		return _.map(this.props.messages, message => {
			return (
				<tr key={message.id}>
					<td>{message.From.value}</td>
					<td data-toggle="tooltip" title="Drag and drop the subject text to any of the label to move the message"><Draggable type="message" data={message.id}>{message.Subject.value}</Draggable></td>
					<td>{message.Date.value}</td>
				</tr>
			);
		});
	}

	onDrop(data){
		console.log(data);
		this.props.modifyMessage(data.message, this.state.currentHoverLabel, this.state.activeLabel);
	}

	onDragEnter(id){
		// console.log(e);
		console.log(name);
		this.setState({currentHoverLabel: id});
	}

	renderLabels(){
		return _.map(this.props.labels, label => {
			if(label.labelListVisibility === 'labelShow'){
				return (
					<div className="btn-group" key={label.id}>
						<Droppable
			                data-name={label.name}
			                types={['message']} // <= allowed drop types
			                onDrop={this.onDrop.bind(this)}
			                // onDragEnter={this.onDrop}
			                onDragEnter={(e) => this.onDragEnter(label.id)}
			            >
							<button 
								type="button" 
								className="btn btn-primary" 
								onClick={() => {
									should_continue = true; 
									this.props.fetchLabel(label.id);
									this.setState({activeLabel: label.id, activeLabelName: label.name});
								}}
							>{label.name}</button>
						</Droppable>

					  	<button className="btn btn-info dropdown-toggle" type="button" data-toggle="dropdown">
					  		<span className="caret"></span>
					  		<span className="sr-only">Toggle Dropdown</span>
					  	</button>
					  	<ul className="dropdown-menu">
						    <li>
						      	<a 
						      		href="javascript:void(0)" 
						      		data-target="#edit-label-modal" 
						      		data-toggle="modal" 
						      		onClick={() => this.setState({
						      			editedlabelname: label.name,
						      			editLabelId: label.id
						      		})}
						      	>Edit</a>
						    </li>
						    <li>
						    	<a onClick={() => this.props.deleteLabel(label.id)} href="javascript:void(0)">Delete</a>
						    </li>
					    </ul>
					</div>

				);
			}
		});
	}

	checkCreateLabel(){
		if(this.state.labelname != ''){
			this.props.createLabel(this.state.labelname);
			this.setState({labelname: ''});
			$('#add-label-modal').modal('hide');
		}
	}

	addLabelModal(){
		return (
			<div className="modal fade" id="add-label-modal" tabIndex="-1" role="dialog">
		      <div className="modal-dialog modal-lg">
		        <div className="modal-content">
		          <div className="modal-header">
		            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
		              <span aria-hidden="true">&times;</span>
		            </button>
		            <h4 className="modal-title">Create Label</h4>
		          </div>
		            <div className="modal-body">
		              	<div className="form-group">
		                	<input 
		                		type="text" 
		                		className="form-control" 
		                		placeholder="Enter label name" 
		                		value={this.state.labelname}
		                		onChange={(event) => {this.setState({labelname: event.target.value});}}
		                	/>
		              	</div>

		            </div>
		            <div className="modal-footer">
		              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
		              <button type="submit" className="btn btn-primary" onClick={() => this.checkCreateLabel()}>Send</button>
		            </div>
		        </div>
		      </div>
		    </div>
		);
	}

	checkEditLabel(){
		if(this.state.editedlabelname != ''){
			this.props.updateLabel(this.state.editLabelId, this.state.editedlabelname);
			this.setState({editedlabelname: ''});
			$('#edit-label-modal').modal('hide');
		}
	}

	editLabelModal(){
		return (
			<div className="modal fade" id="edit-label-modal" tabIndex="-1" role="dialog">
		      <div className="modal-dialog modal-lg">
		        <div className="modal-content">
		          <div className="modal-header">
		            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
		              <span aria-hidden="true">&times;</span>
		            </button>
		            <h4 className="modal-title">Create Label</h4>
		          </div>
		            <div className="modal-body">
		              	<div className="form-group">
		                	<input 
		                		type="text" 
		                		className="form-control" 
		                		placeholder="Enter label name" 
		                		value={this.state.editedlabelname}
		                		onChange={(event) => {this.setState({editedlabelname: event.target.value});}}
		                	/>
		              	</div>

		            </div>
		            <div className="modal-footer">
		              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
		              <button type="submit" className="btn btn-primary" onClick={() => this.checkEditLabel()}>Send</button>
		            </div>
		        </div>
		      </div>
		    </div>
		);
	}

	checkMails(){
		const { mails } = this.props;
		const { messages } = this.props;

		if(!mails.length){
			return(
				<tr>
					<td colSpan="3">{mails.length} mails</td>
				</tr>
			);
		}else{
			if(should_continue){
				should_continue = false;
				if(this.props.mails == undefined){
					this.props.emptyMessages();
				}else{
					this.getAllMessages(this.props.mails);
				}
			}
			if(!messages.length){
				return(
					<tr>
						<td colSpan="3">{messages.length} messages</td>
					</tr>
				);
			}else{
				return (
		        	this.renderMessages()
				);
			}
		}
		
	}

	render() {

		return (
			<div>
				<div className="top-fixed">
					<div className="text">Mail listing</div>
					<div className="buttons-wrap">
						{this.renderLabels()}
			        	<button className="btn btn-secondary" data-toggle="modal" data-target="#add-label-modal">+</button>
			        	{this.addLabelModal()}
			        	{this.editLabelModal()}
					</div>
				</div>

				<div className="active-label">
					Active Label: {this.state.activeLabelName}
				</div>

				<table className="table table-striped table-inbox table-bordered">
			        <thead>
			          <tr>
			            <th>From</th>
			            <th>Subject</th>
			            <th>Date/Time</th>
			          </tr>
			        </thead>
			        <tbody>
				        {this.checkMails()}
			        </tbody>
			    </table>
			</div>
		);
	}
}

function mapStatetoProps(state){
	return { 
		mails: state.mails,
		messages: state.messages,
		labels: state.labels,
		// singleLabel: state.singleLabel
	};
}

export default connect(mapStatetoProps, { fetchMail, fetchLabels, fetchMessage, deleteLabel, createLabel, updateLabel, fetchLabel, emptyMessages, modifyMessage })(EmailListing);