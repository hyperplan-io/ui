import React from 'react';
import axios from 'axios';

import Project from '../Project/Project';
import { Button, Divider, H2, H3, Text } from "@blueprintjs/core";
import Features from '../Features/Features';
import Labels from '../Labels/Labels';
import Algorithms from '../Algorithms/Algorithms';
import './ProjectPage.css';

function Policy(props) {
  return (
    <div>
      <H3>Policy</H3>
      { (props.policy.class == 'NoAlgorithm' &&
      <Text> This project does not have any algorithms </Text>)}
    </div>
  )
}

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
      });
  }
  render() {
    return (
      <div>
        { this.state.project && 
          <div>
            <H2> {this.state.project.name}</H2>
            <Divider />
            <div>
              <div className="leftPanel">
      <Button style={ { marginRight: '2em', marginTop: '1em'}} onClick={this.handleCreateFeatures} className="rightButton" rightIcon="arrow-right" intent="success">Create a new algorithm</Button>
                <Algorithms algorithms={this.state.project.algorithms} />
              </div>
              <div className="rightPanel">
              <br/>
                <Policy policy={this.state.project.policy}/>    
                <br/>
                <Features features={this.state.project.configuration.features} />
                <br/>
                <Labels labels={this.state.project.configuration.labels} />
              </div>
            </div>
          </div>
          
        }
      </div>
    )
  }
  
}

export default ProjectPage;

