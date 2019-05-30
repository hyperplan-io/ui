import React from 'react';
import axios from 'axios';

import { Button, Divider, H2, H3, Text } from "@blueprintjs/core";
import Features from '../Features/Features';
import Labels from '../Labels/Labels';
import Algorithms from '../Algorithms/Algorithms';
import './ProjectPage.css';

function Policy(props) {
  return (
    <div>
      <H3>Policy</H3>
      { (props.policy.class === 'NoAlgorithm' &&
      <Text> This project does not have any algorithms </Text>)}
      { (props.policy.class === 'DefaultAlgorithm' &&
      <Text> Serving <b>{props.policy.algorithmId}</b> by default </Text>)}
      { (props.policy.class === 'WeightedAlgorithm' &&
      <Text> Weights <b>{JSON.stringify(props.policy.weights)}</b> </Text>)}
    </div>
  )
}

class ProjectPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
    this.handleCreateAlgorithm = this.handleCreateAlgorithm.bind(this);
  }

  handleCreateAlgorithm() {
    this.props.history.push(`/createAlgorithm?projectId=${this.state.project.id}`)
  }

  componentDidMount() {
    const projectId = this.props.match.params.projectId;
    const headers = {
      'Authorization': `Bearer ${this.props.user.accessToken}`
    };
    axios.get(`https://antoine.api.foundaml.org/projects/${projectId}`, { headers: headers })
      .then(r => {
        console.log('got project !');
        console.log(r.data);
        this.setState( {
			    project: r.data
		    });
      }).catch( err => {
        console.log(err);
      });
  }
  render() {
    console.log('algorithms **')
    console.log(this.state.project);
    return (
      <div>
        { this.state.project && 
          <div>
            <H2> {this.state.project.name}</H2>
            <Divider />
            <div>
              <div className="leftPanel">
                <Button style={ { marginRight: '2em', marginTop: '1em'}} onClick={this.handleCreateAlgorithm} className="rightButton" rightIcon="arrow-right" intent="success">Create a new algorithm</Button>
          <br/><br/><br/><br/>
              { this.state.project && <Algorithms algorithms={this.state.project.algorithms} />}
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

