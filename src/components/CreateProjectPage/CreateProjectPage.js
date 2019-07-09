import React from 'react';

import { Button, InputGroup, HTMLSelect, H2, H5, RadioGroup, Radio, Card } from '@blueprintjs/core';

import { createProject, getFeatures, getLabels } from '../../utils/Api';
import { AppToaster } from '../../utils/toaster';

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

class CreateProjectPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      problemType: 'classification',
      formErrors: {
        problemType: '',
        id: 'Project id is required',
        name: 'Project name is required',
        features: '',
        labels: '',
      },
    };
    this.handleProblemTypeChange = this.handleProblemTypeChange.bind(this);
    this.handleIdChange = this.handleIdChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCreateProject = this.handleCreateProject.bind(this);
    this.handleFeaturesChange = this.handleFeaturesChange.bind(this);
    this.handleLabelsChange = this.handleLabelsChange.bind(this);
    this.handleTopicChange = this.handleTopicChange.bind(this);
    this.isStateValid = this.validateState.bind(this);
    document.title = 'Create project - Hyperplan';
  }

  componentDidMount() {
    getFeatures(this.props.user.accessToken, this.props.invalidateToken).then(features => {
      this.setState(_ => {
        let newState = {
          features: features,
          featuresId: features.length ? features[0].id : '',
        };
        newState.valid = this.validateState(newState);
        return newState;
      });
    });

    getLabels(this.props.user.accessToken, this.props.invalidateToken).then(labels => {
      this.setState(_ => {
        let newState = {
          labels: labels,
          labelsId: labels.length ? labels[0].id : '',
        };
        newState.valid = this.validateState(newState);
        return newState;
      });
    });
  }

  handleProblemTypeChange(event) {
    const newProblemType = event.target.value;
    this.setState(_ => {
      let newState = {
        problemType: newProblemType,
      };
      newState.valid = this.validateState(newState);
      return newState;
    });
  }

  handleIdChange(event) {
    const id = event.target.value;
    const error = id.length > 0 ? '' : 'Project id is required';
    this.setState(prevState => {
      let newState = {
        id: id,
        valid: false,
        formErrors: Object.assign(prevState.formErrors, { id: error }),
      };
      newState.valid = this.validateState(newState);
      return newState;
    });
  }

  handleNameChange(event) {
    const name = event.target.value;
    const error = name.length > 0 ? '' : 'Project name is required';
    this.setState(prevState => {
      let newState = {
        name: name,
        valid: false,
        formErrors: Object.assign(prevState.formErrors, { name: error }),
      };
      newState.valid = this.validateState(newState);
      return newState;
    });
  }

  handleFeaturesChange(event) {
    const featuresId = event.target.value;
    console.log(featuresId);
    this.setState(_ => {
      let newState = {
        featuresId: featuresId,
        valid: false,
      };
      newState.valid = this.validateState(newState);
      return newState;
    });
  }

  handleLabelsChange(event) {
    const labelsId = event.target.value;
    console.log(labelsId);
    this.setState(_ => {
      let newState = {
        labelsId: labelsId,
        valid: false,
      };
      newState.valid = this.validateState(newState);
      return newState;
    });
  }

  handleTopicChange(event) {
    const topic = event.target.value;
    this.setState(_ => {
      let newState = {
        topic: topic,
        valid: false,
      };
      newState.valid = this.validateState(newState);
      return newState;
    });
  }

  handleCreateProject() {
    if (isFormValid(this.state.formErrors)) {
      let payload = {
        id: this.state.id,
        name: this.state.name,
        problem: this.state.problemType,
        featuresId: this.state.featuresId,
      };
      if (this.state.problemType === 'classification') {
        payload.labelsId = this.state.labelsId;
      }
      if (this.state.topic) {
        payload.topic = this.state.topic;
      }
      createProject(payload, this.props.user.accessToken, this.props.invalidateToken).then(
        project => {
          this.props.history.push(`/Projects/${payload.id}`);
        },
      );
    } else {
      toastErrors(Object.values(this.state.formErrors));
    }
  }

  validateState(state) {
    return false;
  }

  render() {
    const featuresComponent = this.state.features && (
      <div>
        <H5> Features </H5>
        <HTMLSelect
          options={this.state.features.map(f => f.id)}
          onChange={this.handleFeaturesChange}
          value={this.state.featuresId}
        ></HTMLSelect>
      </div>
    );
    const labelsComponent = this.state.problemType === 'classification' && this.state.labels && (
      <div>
        <H5> Labels </H5>
        <HTMLSelect
          options={this.state.labels.map(f => f.id)}
          onChange={this.handleLabelsChange}
          value={this.state.labelsId}
        ></HTMLSelect>
      </div>
    );
    return (
      <div>
        <H2>Create a new project </H2>
        <br />

        <Button
          onClick={this.handleCreateProject}
          className="rightButton"
          rightIcon="arrow-right"
          intent="success"
        >
          Create
        </Button>
        <br />
        <br />
        <br />
        <Card>
          <InputGroup
            onChange={this.handleIdChange}
            type="text"
            placeholder="Project id (required)"
          />
          <br />
          <InputGroup
            onChange={this.handleNameChange}
            type="text"
            placeholder="Project name (required)"
          />
        </Card>
        <br />
        <Card>
          <RadioGroup
            label="Problem"
            inline="true"
            onChange={this.handleProblemTypeChange}
            selectedValue={this.state.problemType}
          >
            <Radio label="Classification" value="classification" />
            <Radio label="Regression" value="regression" />
          </RadioGroup>
        </Card>
        <br />
        <Card>
          {featuresComponent}
          <br />
          {labelsComponent}
        </Card>
        <br />
        <Card>
          <H5>Additional settings</H5>
          <InputGroup
            onChange={this.handleTopicChange}
            type="text"
            placeholder="topic (Kafka, Kinesis, PubSub)"
          />
        </Card>
      </div>
    );
  }
}

export default CreateProjectPage;
