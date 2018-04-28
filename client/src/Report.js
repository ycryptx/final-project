import React, { Component } from 'react';
import 'whatwg-fetch';


class Report extends Component {
	constructor() {
		super();
		this.state = {
			location: '',
			chemical: '',
			amount: '',
			name: '',
			error: '',
			shouldHide: true

		}
		this.handleClick = this.handleClick.bind(this);
		this.updateInputValue = this.updateInputValue.bind(this);
	}
	handleClick(evt) {
		const parent = this;
		evt.preventDefault();
		parent.setState({error:''});
		parent.setState({shouldHide:true});
		let name = this.state.name;
		let location = this.state.location;
		let chemical = this.state.chemical;
		let amount = this.state.amount;
		fetch('/report', {
		  method: 'POST',
		  headers: {
		    'Content-Type': 'application/json'
		  },
		  body: JSON.stringify({
				name: name,
		    location: location,
				chemical : chemical,
				amount: amount
		  })
		})
		.then(checkStatus)
		.then(parseJSON)
		.then(function(data) {
				console.log('request succeeded with JSON response', data);
		}).catch(function(err) {
			parent.setState({shouldHide:false});
			parent.setState({error:err.response});
			console.log('request failed', err.response)
		})
	}
	updateInputValue(evt) {
		this.setState({
			[evt.target.name] : evt.target.value
		});
	}
	render() {
		return (
			<div>
      <h1> Report </h1>
        <form onSubmit={this.handleClick}>
					<p><label for="name">Your Name:</label> <input type="text" onChange={this.updateInputValue} value={this.state.name} name="name" required/></p>
          <p><label for="location">Location:</label> <input type="text" onChange={this.updateInputValue} value={this.state.location} name="location" required/></p>
          <p><label for="chemical">Chemical:</label> <input  type="text" onChange={this.updateInputValue} value={this.state.chemical} name="chemical" required/></p>
          <p><label for="amount">Amount Released:</label> <input type="text" onChange={this.updateInputValue} value={this.state.amount} name="amount"/></p>
          <p><input type="submit" value="Add"/></p>
        </form>
				<div style={this.state.shouldHide ? { display: 'none' } :{}} className='isa_warning'>{this.state.error}</div>
      </div>
		);
	}
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = 'You did not provide a proper address :S'
    throw error
  }
}

function parseJSON(response) {
  return response.json()
}


export default Report;
