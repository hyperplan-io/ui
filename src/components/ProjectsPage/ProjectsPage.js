import React from 'react';


import './ProjectsPage.css';
import Project from '../Project/Project';
import { Button, H2 } from "@blueprintjs/core";

class Projects extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			projects: null
		};
    this.handleCreateProject = this.handleCreateProject.bind(this);
	}

  handleCreateProject() {
    this.props.history.push('createProject');
  }

	componentDidMount() {
    const headers = {
      'Authorization': `Bearer ${this.props.user.accessToken}`
    };
    
    fetch(
      "/projects",
      {
        headers: headers,
        method: "GET",
      }
    ).then(res => {
      res.json().then(body => {
        this.setState( {
          projects: body
        })
      })
    }).catch((err) => {
        if(err.response) {
          if(err.response.status === 401) {
            localStorage.setItem('isAuthenticated', false);
          }
        } else if(err.request) {

        } else {

        }
      });
	}

	render() {
		const projectComponents = this.state.projects && this.state.projects.map(project => <Project key={project.id} project={project}/>)
		const mainContent = (
			<div className="test">
				<H2>Projects</H2>
				<p>These are your algorithm projects, they regroup algorithm that achieve the same goal and share the same inputs and ouputs</p>
				<div>
					{ projectComponents }
				</div>

			</div>
		)
    return (
      <div>
      <Button onClick={this.handleCreateProject}className="rightButton" rightIcon="arrow-right" intent="success">Create</Button>
      { mainContent }
      </div>
    )
	}
	
}

export default Projects;
