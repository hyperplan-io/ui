import React from 'react';

import './Projects.css';
import Project from '../Project/Project';
import projectsData from '../../data/projects';
import { H2 } from "@blueprintjs/core";
class Projects extends React.Component {

	constructor() {
		super();
		this.state = {
			projects: null
		};
	}

	projectDataToComponent(project) {
		return (
			<Project project={project}/>
		)
	}

	componentDidMount() {
		this.setState( {
			projects: projectsData
		});

	}

	render() {
		const projectComponents = this.state.projects && this.state.projects.map(project => <Project project={project}/>)
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
