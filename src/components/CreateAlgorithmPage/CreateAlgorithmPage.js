import React from 'react';

import { Button, HTMLSelect, InputGroup, Card } from '@blueprintjs/core';

import TensorFlowBackendConfiguration from '../TensorFlowBackendConfiguration/TensorFlowBackendConfiguration';
import RasaNluBackendConfiguration from '../RasaNluBackendConfiguration/RasaNluBackendConfiguration';
import FeaturesTransformerConfiguration from '../FeaturesTransformerConfiguration/FeaturesTransformerConfiguration';
import LabelsTransformerConfiguration from '../LabelsTransformerConfiguration/LabelsTransormerConfiguration';
import RasaNluFeaturesTransformer from '../RasaNluFeaturesTransformer/RasaNluFeaturesTransformer';

import { getProjectById, createAlgorithm } from '../../utils/Api';

import { AppToaster } from '../../utils/toaster';

const classificationBackends = ['TensorFlowClassificationBackend', 'RasaNluClassificationBackend'];
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

const defaultFormErrorsRasaNluClassification = {
  host: 'Rasa Nlu requires a host',
  port: 'Rasa Nlu requires a port',
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
    this.handleJoinCharacterChange = this.handleJoinCharacterChange.bind(this);
    this.handleFeatureQueryChange = this.handleFeatureQueryChange.bind(this);
    this.createAlgorithm = this.createAlgorithm.bind(this);

    const params = new URLSearchParams(this.props.location.search);

    this.state = {
      projectId: params.get('projectId'),
      algorithmId: '',
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
    } else if (backend === 'RasaNluClassificationBackend') {
      backendError = defaultFormErrorsRasaNluClassification;
    } else {
      console.log('Unhandled backend');
      return;
    }

    console.log(backendError);
    this.setState(prevState => ({
      backend: backend,
      formErrors: Object.assign(
        { id: prevState.algorithmId.length > 0 ? '' : 'Algorithm id is required' },
        backendError,
      ),
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
    } else if (this.state.backend === 'RasaNluClassificationBackend') {
      if (backendConfiguration.key === 'host') {
        backendError = {
          host: backendConfiguration.value.length > 0 ? '' : 'Backend host is required',
        };
      } else if (backendConfiguration.key === 'port') {
        backendError = {
          port: backendConfiguration.value.length > 0 ? '' : 'Backend port is required',
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

  handleJoinCharacterChange(joinCharacter) {
    console.log('handleJoinCharacterChange');
    this.setState(prevState => ({
      featuresTransformer: Object.assign(prevState.featuresTransformer, {
        joinCharacter: joinCharacter,
      }),
    }));
  }

  handleFeatureQueryChange(featureQuery) {
    console.log('handleFeatureQueryChange');
    const error = featureQuery === '' ? 'Rasa Nlu requires a feature to be selected' : '';
    this.setState(prevState => ({
      featuresTransformer: Object.assign(prevState.featuresTransformer, { field: featureQuery }),
      formErrors: Object.assign(prevState.formErrors, { featureQuery: error }),
    }));
  }

  createAlgorithm() {
    if (this.state.project && isFormValid(this.state.formErrors)) {
      console.log(this.state);
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
        <div>
          <TensorFlowBackendConfiguration
            backendConfigurationChange={this.backendConfigurationChange}
          />
          <FeaturesTransformerConfiguration
            project={this.state.project}
            featuresTransformerChange={this.featuresTransformerChange}
          />
          <LabelsTransformerConfiguration
            project={this.state.project}
            labelsTransformerChange={this.labelsTransformerChange}
          />
        </div>
      );
    } else if (this.state.backend === 'TensorFlowRegressionBackend') {
      backendConfiguration = (
        <div>
          <TensorFlowBackendConfiguration
            backendConfigurationChange={this.backendConfigurationChange}
          />
          <FeaturesTransformerConfiguration
            project={this.state.project}
            featuresTransformerChange={this.featuresTransformerChange}
          />
        </div>
      );
    } else if (this.state.backend === 'RasaNluClassificationBackend') {
      backendConfiguration = (
        <div>
          <RasaNluBackendConfiguration
            backendConfigurationChange={this.backendConfigurationChange}
          />
          {this.state.project && (
            <RasaNluFeaturesTransformer
              features={this.state.project.configuration.features}
              handleFeatureQueryChange={this.handleFeatureQueryChange}
              handleJoinCharacterChange={this.handleJoinCharacterChange}
              accessToken={this.props.user.accessToken}
              invalidateToken={this.props.invalidateToken}
            />
          )}

          <LabelsTransformerConfiguration
            project={this.state.project}
            labelsTransformerChange={this.labelsTransformerChange}
          />
        </div>
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
        <div className="rightPanel">{backendConfiguration}</div>
      </div>
    );
  }
}

export default CreateAlgorithmPage;
