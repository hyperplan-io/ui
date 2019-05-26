import React from 'react';

class SignIn extends React.Component {

	constructor() {
		super()
		this.handleSubmit = this.handleSubmit.bind(this);	
	}

	handleSubmit() {

	}

	render() {
		return (
				<form onSubmit={this.handleSubmit}>
				
				</form>
		)
	}
}

export default SignIn;
