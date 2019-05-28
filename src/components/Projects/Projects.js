import React from 'react';

import './Projects.css';
import Project from '../Project/Project';
import { H2 } from "@blueprintjs/core";

import axios from 'axios';

class Projects extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			projects: null
		};
	}

	componentDidMount() {
    const headers = {
      'Authorization': `Bearer ${this.props.user.accessToken}`
    };
    axios.get('https://antoine.api.foundaml.org/projects', { headers: headers })
      .then(r => {
        this.setState( {
			    projects: r.data
		    });
      })
	}

	render() {
		const projectComponents = this.state.projects && this.state.projects.map(project => <Project key={project.id} project={project}/>)
		return (
			<div className="test">
				<H2>Projects</H2>
				<p>These are your algorithm projects, they regroup algorithm that achieve the same goal and share the same inputs and ouputs</p>
				<div>
					{ projectComponents }
				</div>

			</div>
		)
	}
	
}

export default Projects;
