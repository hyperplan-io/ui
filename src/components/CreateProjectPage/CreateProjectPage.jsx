import React from 'react';

import { Button, InputGroup, HTMLSelect, H2, H5, RadioGroup, Radio, Card } from '@blueprintjs/core';

import { createProject, getFeatures, getLabels } from '../../utils/Api';

class CreateProjectPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      problemType: 'classification',
    };
    this.handleProblemTypeChange = this.handleProblemTypeChange.bind(this);
    this.handleIdChange = this.handleIdChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCreateProject = this.handleCreateProject.bind(this);
    this.handleFeaturesChange = this.handleFeaturesChange.bind(this);
    this.handleLabelsChange = this.handleLabelsChange.bind(this);
  }

  componentDidMount() {
    getFeatures(this.props.user.accessToken, this.props.invalidateToken).then(features => {
      this.setState({
        features: features,
        featuresId: features.length ? features[0].id : '',
      });
    });

    getLabels(this.props.user.accessToken, this.props.invalidateToken).then(labels => {
      this.setState({
        labels: labels,
        labelsId: labels.length ? labels[0].id : '',
      });
    });
  }

  handleProblemTypeChange(event) {
    const newProblemType = event.target.value;
    this.setState({
      problemType: newProblemType,
    });
  }

  handleIdChange(event) {
    const id = event.target.value;
    this.setState({
      id: id,
    });
  }

  handleNameChange(event) {
    const name = event.target.value;
    this.setState({
      name: name,
    });
  }

  handleFeaturesChange(event) {
    const featuresId = event.target.value;
    console.log(featuresId);
    this.setState({
      featuresId: featuresId,
    });
  }

  handleLabelsChange(event) {
    const labelsId = event.target.value;
    console.log(labelsId);
    this.setState({
      labelsId: labelsId,
    });
  }

  handleCreateProject() {
    let payload = {
      id: this.state.id,
      name: this.state.name,
      problem: this.state.problemType,
      featuresId: this.state.featuresId,
    };
    if (this.state.problemType === 'classification') {
      payload.labelsId = this.state.labelsId;
    }
    createProject(payload, this.props.user.accessToken, this.props.invalidateToken).then(
      project => {
        this.props.history.push(`/Projects/${payload.id}`);
      },
    );
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
        <Card>
          <H5>Additional settings</H5>
        </Card>
      </div>
    );
  }
}

export default CreateProjectPage;
