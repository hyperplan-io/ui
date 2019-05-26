import React from 'react';
import './Navbar.css'

import { Navbar, NavbarGroup, Classes, NavbarHeading, Alignment, NavbarDivider, Button } from "@blueprintjs/core";
import { withRouter } from 'react-router';


class MyNavbar extends React.Component {

	constructor() {
		super()
		this.redirectProjects = this.redirectProjects.bind(this);
		this.redirectFeatures = this.redirectFeatures.bind(this);
		this.redirectLabels = this.redirectLabels.bind(this);
	}
		
	redirectProjects() {
		this.props.history.push('Projects')
	}

	redirectFeatures() {
		this.props.history.push('Features')
	}

	redirectLabels() {
		this.props.history.push('Labels')
	}

	render() {
		return (
			<Navbar className="bp3-dark" style={ {position: 'fixed', top: 0}}> 
			<NavbarGroup align={Alignment.RIGHT}>
			<NavbarHeading>FoundaMl</NavbarHeading>
			<NavbarDivider />
			<Button className={Classes.MINIMAL} icon="home" text="Projects"  onClick={ this.redirectProjects}/>
			<Button className={Classes.MINIMAL} icon="document" text="Features" onClick={ this.redirectFeatures}/>
			<Button className={Classes.MINIMAL} icon="document" text="Labels" onClick={ this.redirectLabels}/>
			</NavbarGroup>

			</Navbar>
		)
	}
	
}

export default withRouter(MyNavbar);
