import React from 'react';
import {
  TagInput,
  Toaster,
  Callout,
  Text,
  RadioGroup,
  Radio,
  InputGroup,
  Button,
  H2,
  H4,
} from '@blueprintjs/core';
import './CreateLabelsPage.css';
import { AppToaster } from '../../utils/toaster';

import { createLabels } from '../../utils/Api';

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

class StaticLabel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: [],
    };
    this.handleOnChangeLabels = this.handleOnChangeLabels.bind(this);
    document.title = 'Create labels - Hyperplan';
  }

  handleOnChangeLabels(values) {
    const newValues = values;
    this.setState({ labels: newValues });
    this.props.handleOnChangeLabels(newValues);
  }

  render() {
    return (
      <div>
        <TagInput onChange={this.handleOnChangeLabels} values={this.state.labels} />
      </div>
    );
  }
}

class CreateLabelsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labelType: 'oneOf',
      oneOfLabels: [],
      formErrors: {
        id: 'The name cannot be empty',
        description: 'The description cannot be empty',
        labels: 'You need to have at least one label defined',
      },
    };

    this.handleCreateLabels = this.handleCreateLabels.bind(this);
    this.handleLabelTypeChange = this.handleLabelTypeChange.bind(this);
    this.handleOnLabelsNameChange = this.handleOnLabelsNameChange.bind(this);
    this.handleOnLabelsDescriptionChange = this.handleOnLabelsDescriptionChange.bind(this);
    this.handleOnChangeLabels = this.handleOnChangeLabels.bind(this);
  }

  handleLabelTypeChange(event) {
    const newType = event.target.value;

    this.setState(prevState => {
      let error = '';
      if (newType === 'oneOf' && prevState.oneOfLabels.length <= 0) {
        error = 'You need to have at least one label defined';
      }
      return {
        labelType: newType,
        name: prevState.name,
        formErrors: Object.assign(prevState.formErrors, { labels: error }),
      };
    });
  }

  handleOnChangeLabels(values) {
    const labels = values;
    const error = labels.length > 0 ? '' : 'You need to have at least one label defined';
    this.setState(prevState => ({
      oneOfLabels: labels,
      formErrors: Object.assign(prevState.formErrors, { labels: error }),
    }));
  }

  handleCreateLabels() {
    if (isFormValid(this.state.formErrors)) {
      const payload = {
        id: this.state.name,
        data: {
          description: this.state.description,
          type: this.state.labelType,
          oneOf: this.state.oneOfLabels,
        },
      };

      createLabels(payload, this.props.user.accessToken, this.props.invalidateToken)
        .then(_ => {
          this.props.history.push('/labels');
        })
        .catch(_ => {
          AppToaster.show({
            message: 'An error occurred while creating the labels. Verify the logs on the server',
          });
        });
    } else {
      toastErrors(Object.values(this.state.formErrors));
    }
  }

  handleOnLabelsNameChange(event) {
    const newValue = event.target.value;
    const error = newValue.length <= 0 && 'The name cannot be empty';
    this.setState(prevState => ({
      name: newValue,
      formErrors: Object.assign(prevState.formErrors, { id: error }),
    }));
  }
  handleOnLabelsDescriptionChange(event) {
    const newValue = event.target.value;
    const error = newValue.length <= 0 && 'Empty description is not allowed';
    this.setState(prevState => ({
      description: newValue,
      formErrors: Object.assign(prevState.formErrors, { description: error }),
    }));
  }

  toaster;
  refHandlers = {
    toaster: ref => (this.toaster = ref),
  };
  render() {
    return (
      <div>
        <Toaster {...this.state} ref={this.refHandlers.toaster} />
        <H2>Create new labels </H2>
        <Callout>
          <H4>Instructions</H4>
          <ul>
            <li>
              <Text> Labels can be either static or dynamic </Text>
            </li>
            <li>
              <Text> If you know exactly what your labels are, prefer the static </Text>
            </li>
            <li>
              <Text>
                {' '}
                If your labels vary a lot or if there are too many of them, prefer dynamic{' '}
              </Text>
            </li>
          </ul>
        </Callout>
        <br />
        <Button
          onClick={this.handleCreateLabels}
          className="rightButton"
          rightIcon="arrow-right"
          intent="success"
        >
          Create
        </Button>
        <br />
        <br />
        <br />
        <InputGroup onChange={this.handleOnLabelsNameChange} placeholder="Labels name (required)" />
        <br />
        <InputGroup
          onChange={this.handleOnLabelsDescriptionChange}
          placeholder="Labels description (required)"
        />
        <br />
        <RadioGroup
          label="Label Type"
          inline="true"
          onChange={this.handleLabelTypeChange}
          selectedValue={this.state.labelType}
        >
          <Radio label="Static" value="oneOf" />
          <Radio label="Dynamic" value="dynamic" />
        </RadioGroup>
        <br />
        {this.state.labelType === 'oneOf' && (
          <StaticLabel handleOnChangeLabels={this.handleOnChangeLabels} />
        )}
        <br />
      </div>
    );
  }
}

export default CreateLabelsPage;
