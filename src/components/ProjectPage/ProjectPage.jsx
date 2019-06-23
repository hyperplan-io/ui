import React from 'react';

import { Button, Divider, H2 } from '@blueprintjs/core';

import Features from '../Features/Features.jsx';
import Labels from '../Labels/Labels.jsx';
import Policy from '../Policy/Policy.jsx';
import CurlExample from '../CurlExample/CurlExample.jsx';
import Algorithms from '../Algorithms/Algorithms.jsx';

import './ProjectPage.css';

import { getProjectById } from '../../utils/Api';

class ProjectPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleCreateAlgorithm = this.handleCreateAlgorithm.bind(this);
  }

  handleCreateAlgorithm() {
    this.props.history.push(`/createAlgorithm?projectId=${this.state.project.id}`);
  }

  componentDidMount() {
    const projectId = this.props.match.params.projectId;
    getProjectById(projectId, this.props.user.accessToken, this.props.invalidateToken).then(
      project => {
        this.setState({
          project: project,
        });
      },
    );
  }

  render() {
    return (
      <div>
        {this.state.project && (
          <div>
            <H2> {this.state.project.name}</H2>
            <Divider />
            <div>
              <div className="leftPanel">
                <Button
                  style={{ marginRight: '2em', marginTop: '1em' }}
                  onClick={this.handleCreateAlgorithm}
                  className="rightButton"
                  rightIcon="arrow-right"
                  intent="success"
                >
                  Create a new algorithm
                </Button>
                <br />
                <br />
                <br />
                <br />
                <Policy
                  user={this.props.user}
                  invalidateToken={this.props.invalidateToken}
                  projectId={this.state.project.id}
                  algorithms={this.state.project.algorithms}
                  policy={this.state.project.policy}
                  history={this.props.history}
                />
                <br />
                <CurlExample user={this.props.user} project={this.state.project} />
                <br />
                {this.state.project && <Algorithms algorithms={this.state.project.algorithms} />}
              </div>
              <div className="rightPanel">
                <br />
                <Features features={this.state.project.configuration.features} />
                <br />
                {this.state.project.problem === 'classification' && (
                  <Labels labels={this.state.project.configuration.labels} />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ProjectPage;
