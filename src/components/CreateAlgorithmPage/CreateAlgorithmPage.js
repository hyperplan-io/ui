import React from 'react';

import { Button, HTMLSelect, InputGroup, Card } from '@blueprintjs/core';

import TensorFlowBackendConfiguration from '../TensorFlowBackendConfiguration/TensorFlowBackendConfiguration';
import FeaturesTransformerConfiguration from '../FeaturesTransformerConfiguration/FeaturesTransformerConfiguration';
import LabelsTransformerConfiguration from '../LabelsTransformerConfiguration/LabelsTransormerConfiguration';

import { getProjectById, createAlgorithm } from '../../utils/Api';

import { AppToaster } from '../../utils/toaster';

const classificationBackends = ['TensorFlowClassificationBackend'];
const regressionBackends = ['TensorFlowRegressionBackend'];

const defaultFormErrorsTensorFlowClassification = {
  host: 'Backend host is required',
  port: 'Backend port is required',
  signatureName: 'Backend signature name is required',
};

const defaultFormErrorsTensorFlowRegression = {
  host: 'Backend host is required',
  port: 'Backend port is required',
  signatureName: 'Backend signature name is required',
};

const isFormValid = formErrors => {
  let valid = true;
  Object.values(formErrors).forEach(error => error.length > 0 && (valid = false));
  return valid;
};

const toastErrors = errors => {
  errors.forEach(error => {
    if (error.length > 0) {
      AppToaster.show({ message: error });
    }
  });
};

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
      backendConfiguration: {},
      formErrors: {
        id: 'Algorithm id is required',
      },
    };
    document.title = 'Create algorithm - Hyperplan';
  }

  componentDidMount() {
    getProjectById(
      this.state.projectId,
      this.props.user.accessToken,
      this.props.invalidateToken,
    ).then(project => {
      const backendError =
        project.problem === 'classification'
          ? defaultFormErrorsTensorFlowClassification
          : defaultFormErrorsTensorFlowRegression;
      this.setState({
        project: project,
        backend:
          project.problem === 'classification' ? classificationBackends[0] : regressionBackends[0],
        formErrors: Object.assign(backendError, { id: 'Algorithm id is required' }),
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
    const error = algorithmId.length > 0 ? '' : 'Algorithm id is required';
    this.setState(prevState => ({
      algorithmId: algorithmId,
      formErrors: Object.assign(prevState.formErrors, { id: error }),
    }));
  }

  handleBackendChange(event) {
    const backend = event.target.value;
    let backendError = {};
    if (backend === 'TensorFlowClassificationBackend') {
      backendError = defaultFormErrorsTensorFlowClassification;
    } else if (backend === 'TensorFlowRegressionBackend') {
      backendError = defaultFormErrorsTensorFlowRegression;
    }

    this.setState(prevState => ({
      backend: backend,
      formErrors: Object.assign({
        id: prevState.id.length > 0 ? '' : 'Algorithm id is required',
        backendError,
      }),
    }));
  }

  handleProblemTypeChange(event) {
    const problemType = event.target.value;
    this.setState(prevState => ({
      problemType: problemType,
    }));
  }
  backendConfigurationChange(backendConfiguration) {
    let backendError = {};
    if (this.state.backend === 'TensorFlowClassificationBackend') {
      if (backendConfiguration.key === 'host') {
        backendError = {
          host: backendConfiguration.value.length > 0 ? '' : 'Backend host is required',
        };
      } else if (backendConfiguration.key === 'port') {
        backendError = {
          port: backendConfiguration.value.length > 0 ? '' : 'Backend port is required',
        };
      } else if (backendConfiguration.key === 'signatureName') {
        backendError = {
          signatureName:
            backendConfiguration.value.length > 0 ? '' : 'Backend signature name is required',
        };
      }
    } else if (this.state.backend === 'TensorFlowRegressionBackend') {
      if (backendConfiguration.key === 'host') {
        backendError = {
          host: backendConfiguration.value.length > 0 ? '' : 'Backend host is required',
        };
      } else if (backendConfiguration.key === 'port') {
        backendError = {
          port: backendConfiguration.value.length > 0 ? '' : 'Backend port is required',
        };
      } else if (backendConfiguration.key === 'signatureName') {
        backendError = {
          signatureName:
            backendConfiguration.value.length > 0 ? '' : 'Backend signature name is required',
        };
      }
    }

    this.setState(prevState => {
      {
        let prevBackendConfiguration = prevState.backendConfiguration;
        prevBackendConfiguration[backendConfiguration.key] = backendConfiguration.value;
        return {
          backendConfiguration: prevBackendConfiguration,
          formErrors: Object.assign(prevState.formErrors, backendError),
        };
      }
    });
  }

  createAlgorithm() {
    if (this.state.project && isFormValid(this.state.formErrors)) {
      const labelsTransformer =
        this.state.project.problem === 'regression'
          ? {
              fields: {},
            }
          : this.state.labelsTransformer;
      const payload = {
        id: this.state.algorithmId,
        projectId: this.state.projectId,
        backend: {
          class: this.state.backend,
          host: this.state.backendConfiguration.host,
          port: this.state.backendConfiguration.port,
          featuresTransformer: this.state.featuresTransformer,
          labelsTransformer: labelsTransformer,
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
      createAlgorithm(payload, this.props.user.accessToken, this.props.invalidateToken).then(
        res => {
          this.props.history.push(`/projects/${this.state.projectId}`);
        },
      );
    } else {
      if (this.state.project) {
        toastErrors(Object.values(this.state.formErrors));
      } else {
        toastErrors(['Please wait until the project is loaded']);
      }
    }
  }

  render() {
    let options;
    if (this.state.project && this.state.project.problem === 'classification') {
      options = classificationBackends;
    } else if (this.state.project && this.state.project.problem === 'regression') {
      options = regressionBackends;
    } else {
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
      this.state.project.problem === 'classification' && (
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
