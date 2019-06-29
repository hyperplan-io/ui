import React from 'react';

import { Button, InputGroup, HTMLSelect, H2, H5, RadioGroup, Radio, Card } from '@blueprintjs/core';

import { createProject, getFeatures, getLabels } from '../../utils/Api';

class CreateProjectPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      problemType: 'classification',
      formErrors: {
        problemType: '',
        id: '',
        name: '',
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
    this.setState(_ => {
      let newState = {
        id: id,
        valid: false,
      };
      newState.valid = this.validateState(newState);
      return newState;
    });
  }

  handleNameChange(event) {
    const name = event.target.value;
    this.setState(_ => {
      let newState = {
        name: name,
        valid: false,
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
    if (this.state.valid) {
    }
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
