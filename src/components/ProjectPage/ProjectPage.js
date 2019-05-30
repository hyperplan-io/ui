import React from 'react';
import axios from 'axios';

import Project from '../Project/Project';
import { Divider, H2 } from "@blueprintjs/core";
import Features from '../Features/Features';

class ProjectPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    const projectId = this.props.match.params.projectId;
    const headers = {
      'Authorization': `Bearer ${this.props.user.accessToken}`
    };
    axios.get(`https://antoine.api.foundaml.org/projects/${projectId}`, { headers: headers })
      .then(r => {
        this.setState( {
			    project: r.data
		    });
      })
  }
  render() {
    return (
      <div>
        { this.state.project && 
          <div>
            <H2> {this.state.project.name}</H2>
            <Divider />
          <br/>
            <Features features={this.state.project.configuration.features} />
          </div>
        }
      </div>
    )
  }
  
}

export default ProjectPage;

