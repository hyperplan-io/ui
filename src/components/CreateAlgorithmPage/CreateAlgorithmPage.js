import React from 'react';

import { Button, HTMLSelect, InputGroup, Card } from '@blueprintjs/core';

import TensorFlowBackendConfiguration from '../TensorFlowBackendConfiguration/TensorFlowBackendConfiguration';
import FeaturesTransformerConfiguration from '../FeaturesTransformerConfiguration/FeaturesTransformerConfiguration';
import LabelsTransformerConfiguration from '../LabelsTransformerConfiguration/LabelsTransormerConfiguration';

import { getProjectById, createAlgorithm } from '../../utils/Api';

const classificationBackends = ['TensorFlowClassificationBackend'];
const regressionBackends = ['TensorFlowRegressionBackend'];

class CreateAlgorithmPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleAlgorithmIdChange = this.handleAlgorithmIdChange.bind(this);
    this.handleBackendChange = this.handleBackendChange.bind(this);
    this.handleProblemTypeChange = this.handleProblemTypeChange.bind(this);
    this.featuresTransformerChange = this.featuresTransformerChange.bind(this);
    this.labelsTransformerChange = this.labelsTransformerChange.bind(this);
    this.backendConfigurationChange = this.backendConfigurationChange.bind(this);
    this.createAlgorithm = this.createAlgorithm.bind(this);

    const params = new URLSearchParams(this.props.location.search);

    this.state = {
      projectId: params.get('projectId'),
      backend: 'TensorFlowClassificationBackend',
      backendConfiguration: {},
    };
  }

  componentDidMount() {
    getProjectById(
      this.state.projectId,
      this.props.user.accessToken,
      this.props.invalidateToken,
    ).then(project => {
      this.setState({
        project: project,
      });
    });
  }

  featuresTransformerChange(featuresTransformer) {
    this.setState(prevState => ({
      featuresTransformer: featuresTransformer,
    }));
  }

  labelsTransformerChange(labelsTransformer) {
    this.setState(prevState => ({
      labelsTransformer: labelsTransformer,
    }));
  }

  handleAlgorithmIdChange(event) {
    const algorithmId = event.target.value;
    this.setState(prevState => ({
      algorithmId: algorithmId,
    }));
  }

  handleBackendChange(event) {
    const backend = event.target.value;
    this.setState(prevState => ({
      backend: backend,
    }));
  }

  handleProblemTypeChange(event) {
    const problemType = event.target.value;
    this.setState(prevState => ({
      problemType: problemType,
    }));
  }
  backendConfigurationChange(backendConfiguration) {
    this.setState(prevState => {
      {
        let prevBackendConfiguration = prevState.backendConfiguration;
        prevBackendConfiguration[backendConfiguration.key] = backendConfiguration.value;
        return {
          backendConfiguration: prevBackendConfiguration,
        };
      }
    });
  }

  createAlgorithm() {
    const payload = {
      id: this.state.algorithmId,
      projectId: this.state.projectId,
      backend: {
        class: this.state.backend,
        host: this.state.backendConfiguration.host,
        port: this.state.backendConfiguration.port,
        featuresTransformer: this.state.featuresTransformer,
        labelsTransformer: this.state.labelsTransformer,
      },
      security: {
        encryption: 'plain',
        headers: [
          {
            key: 'authorization',
            value: 'myToken',
          },
        ],
      },
    };

    createAlgorithm(payload, this.props.user.accessToken, this.props.invalidateToken).then(res => {
      this.props.history.push(`/projects/${this.state.projectId}`);
    });
  }

  render() {
    let options;
    if (this.state.project && this.state.project.problem === 'classification') {
      console.log(this.state.project.problemType);
      options = classificationBackends;
    } else if (this.state.project && this.state.project.problem === 'regression') {
      console.log(this.state.project.problemType);
      options = regressionBackends;
    } else {
      console.log(this.state);
      options = [];
    }

    let backendConfiguration;
    if (this.state.backend === 'TensorFlowClassificationBackend') {
      backendConfiguration = (
        <TensorFlowBackendConfiguration
          backendConfigurationChange={this.backendConfigurationChange}
        />
      );
    } else if (this.state.backend === 'TensorFlowRegressionBackend') {
      backendConfiguration = (
        <TensorFlowBackendConfiguration
          backendConfigurationChange={this.backendConfigurationChange}
        />
      );
    }

    const featuresTransformerComponent = this.state.project && (
      <FeaturesTransformerConfiguration
        project={this.state.project}
        featuresTransformerChange={this.featuresTransformerChange}
      />
    );

    const labelsTransformerComponent = this.state.project &&
      this.state.problemType === 'classification' && (
        <LabelsTransformerConfiguration
          project={this.state.project}
          labelsTransformerChange={this.labelsTransformerChange}
        />
      );

    return (
      <div>
        <div className="leftPanel">
          <InputGroup
            onChange={this.handleAlgorithmIdChange}
            type="text"
            placeholder="Algorithm id (required)"
          />
          <br />
          <br />
          <Card>
            <HTMLSelect
              options={options}
              onChange={this.handleBackendChange}
              value={this.state.backend}
            ></HTMLSelect>
          </Card>
          <br />
          <br />

          <Button
            onClick={this.createAlgorithm}
            className="rightButton"
            rightIcon="arrow-right"
            intent="success"
          >
            Create
          </Button>
        </div>
        <div className="rightPanel">
          {backendConfiguration}
          <br />
          {featuresTransformerComponent}
          <br />
          {labelsTransformerComponent}
        </div>
      </div>
    );
  }
}

export default CreateAlgorithmPage;
