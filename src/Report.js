import React, { Component } from 'react';
import 'whatwg-fetch';


class Report extends Component {
	constructor() {
		super();
		this.state = {
			location: '',
			chemical: '',
			amount: '',
			name: ''
		}
		this.handleClick = this.handleClick.bind(this);
		this.updateInputValue = this.updateInputValue.bind(this);
	}
	handleClick(evt) {
		const parent = this;
		evt.preventDefault();
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
		}).catch(function(error) {
			console.log('request failed', error.response)
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
      </div>
		);
	}
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response.text()
    throw error
  }
}

function parseJSON(response) {
  return response.json()
}


export default Report;
