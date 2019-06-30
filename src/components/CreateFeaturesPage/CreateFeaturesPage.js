import React from 'react';
import {
  Intent,
  Toaster,
  Callout,
  Text,
  RadioGroup,
  Radio,
  InputGroup,
  FormGroup,
  Button,
  Card,
  H2,
  H4,
  HTMLSelect,
} from '@blueprintjs/core';
import './CreateFeaturesPage.css';
import { AppToaster } from '../../utils/toaster';

import { getFeatures, createFeatures } from '../../utils/Api';

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

const computeFeaturesError = newFeatures => {
  const error = Object.values(newFeatures)
    .map(feature => {
      console.log(JSON.stringify(feature));
      if (feature.name.length > 0 && feature.description.length > 0) {
        return '';
      } else if (feature.name.length <= 0 && feature.description.length > 0) {
        return 'Each feature name needs to be defined';
      } else if (feature.description.length <= 0 && feature.name.length > 0) {
        return 'Each feature description needs to be defined';
      } else {
        return 'Each feature name and description need to be defined';
      }
    })
    .join(',');
  return error;
};

class CreateSingleFeature extends React.Component {
  constructor(props) {
    super(props);
    this.handleDataTypeChange = this.handleDataTypeChange.bind(this);
    this.handleDimensionChange = this.handleDimensionChange.bind(this);
    this.handleFeatureNameChange = this.handleFeatureNameChange.bind(this);
    this.handleFeatureDescriptionChange = this.handleFeatureDescriptionChange.bind(this);
    this.handleReferenceFeatureChange = this.handleReferenceFeatureChange.bind(this);
    this.state = {
      currentType: 'String',
      currentDimension: 'One',
      referenceValue: '',
    };
    document.title = 'Create Features - Hyperplan';
  }

  handleFeatureNameChange(event) {
    this.props.handleFeatureNameChange(this.props.id, event);
  }

  handleFeatureDescriptionChange(event) {
    this.props.handleFeatureDescriptionChange(this.props.id, event);
  }

  handleDataTypeChange(event) {
    const newValue = event.target.value;
    this.props.handleDataTypeChange(this.props.id, newValue);
    this.setState(prevState => ({
      currentType: newValue,
      currentDimension: prevState.currentDimension,
    }));
  }

  handleDimensionChange(event) {
    const newValue = event.target.value;
    this.props.handleDimensionChange(this.props.id, newValue);
    this.setState(prevState => ({
      currentType: prevState.currentType,
      currentDimension: newValue,
    }));
  }

  handleReferenceFeatureChange(event) {
    const referenceValue = event.target.value;
    this.setState({
      referenceValue: referenceValue,
      currentDimension: 'One',
    });
    this.props.handleDataTypeChange(this.props.id, referenceValue);
  }

  render() {
    let dimensionComponents;
    if (this.state.currentType === 'Reference') {
      const features = this.props.otherFeatures.map(feature => feature.id);
      dimensionComponents = (
        <HTMLSelect
          options={features}
          onChange={this.handleReferenceFeatureChange}
          value={this.state.referenceValue}
        ></HTMLSelect>
      );
    } else {
      dimensionComponents = (
        <RadioGroup
          label="Dimension"
          inline="true"
          onChange={this.handleDimensionChange}
          selectedValue={this.state.currentDimension}
        >
          <Radio label="One" value="One" />
          <Radio label="Vector" value="Vector" />
          <Radio label="Matrix" value="Matrix" />
        </RadioGroup>
      );
    }
    return (
      <div className="createFeatureDiv">
        <Card>
          <FormGroup>
            <InputGroup
              onChange={this.handleFeatureNameChange}
              id="text-input"
              placeholder="Feature name (required)"
            />
            <br />
            <InputGroup
              onChange={this.handleFeatureDescriptionChange}
              id="text-input"
              placeholder="Description"
            />
            <br />
            <RadioGroup
              tring
              inline="true"
              onChange={this.handleDataTypeChange}
              selectedValue={this.state.currentType}
            >
              <Radio label="String" value="String" />
              <Radio label="Integer" value="Integer" />
              <Radio label="Float" value="Float" />
              <Radio label="Reference" value="Reference" />
            </RadioGroup>
            {dimensionComponents}
          </FormGroup>
        </Card>
      </div>
    );
  }
}
const defaultState = {
  description: '',
  name: '',
  dataType: 'String',
  dimension: 'One',
};

function randomString() {
  return Math.random()
    .toString(36)
    .slice(-5);
}

class CreateFeaturesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nextId: randomString(),
      features: {
        '0': defaultState,
      },
      formErrors: {
        name: 'The name cannot be empty',
        features: 'Each feature needs to have a name and a description',
      },
    };
    this.handleCreateFeatures = this.handleCreateFeatures.bind(this);
    this.handleNewFeature = this.handleNewFeature.bind(this);
    this.handleFeatureNameChange = this.handleFeatureNameChange.bind(this);
    this.handleFeatureDescriptionChange = this.handleFeatureDescriptionChange.bind(this);
    this.handleDataTypeChange = this.handleDataTypeChange.bind(this);
    this.handleDimensionChange = this.handleDimensionChange.bind(this);
    this.handleOnFeaturesNameChange = this.handleOnFeaturesNameChange.bind(this);
  }

  componentDidMount() {
    getFeatures(this.props.user.accessToken, this.props.invalidateToken).then(features => {
      this.setState({
        otherFeatures: features,
      });
    });
  }

  handleNewFeature() {
    this.setState(prevState => {
      let newFeatures = prevState.features;
      newFeatures[prevState.nextId] = defaultState;
      const error = computeFeaturesError(newFeatures);
      return {
        nextId: randomString(),
        features: newFeatures,
        formErrors: Object.assign(prevState.formErrors, { features: error }),
      };
    });
  }

  handleDataTypeChange(id, newType) {
    this.setState(prevState => {
      let newFeature = prevState.features;
      newFeature[id].dataType = newType;
      return {
        nextId: prevState.nextId,
        features: newFeature,
      };
    });
  }

  handleDimensionChange(id, newDimension) {
    this.setState(prevState => {
      const newFeature = {
        ...prevState.features[id],
        ...{ dimension: newDimension },
      };
      const newFeatures = { ...prevState.features, ...{ [id]: newFeature } };
      return {
        nextId: prevState.nextId,
        features: newFeatures,
      };
    });
  }

  handleFeatureNameChange(id, event) {
    const newName = event.target.value;
    this.setState(prevState => {
      const newFeature = { ...prevState.features[id], ...{ name: newName } };
      const newFeatures = { ...prevState.features, ...{ [id]: newFeature } };
      const error = computeFeaturesError(newFeatures);
      return {
        nextId: prevState.nextId,
        features: newFeatures,
        formErrors: Object.assign(prevState.formErrors, { features: error }),
      };
    });
  }

  handleFeatureDescriptionChange(id, event) {
    const newDescription = event.target.value;
    this.setState(prevState => {
      const newFeature = {
        ...prevState.features[id],
        ...{ description: newDescription },
      };
      const newFeatures = { ...prevState.features, ...{ [id]: newFeature } };
      const error = computeFeaturesError(newFeatures);
      return {
        nextId: prevState.nextId,
        features: newFeatures,
        formErrors: Object.assign(prevState.formErrors, { features: error }),
      };
    });
  }

  showToast(message) {
    const toast = {
      action: {
        onClick: () => this.addToast(this.TOAST_BUILDERS[2]),
        text: 'Retry',
      },
      button: 'Delete root',
      icon: 'warning-sign',
      intent: Intent.DANGER,
      message: message,
    };
    toast.timeout = 5000;
    this.toaster.show(toast);
  }

  handleCreateFeatures() {
    if (isFormValid(this.state.formErrors)) {
      const featuresList = Object.keys(this.state.features).map(id => this.state.features[id]);
      const payload = {
        id: this.state.id,
        data: featuresList.map(feature => ({
          name: feature.name,
          type: feature.dataType,
          dimension: feature.dimension,
          description: feature.description,
        })),
      };
      createFeatures(payload, this.props.user.accessToken, this.props.invalidateToken)
        .then(res => {
          this.props.history.push('/features');
        })
        .catch(err => {
          console.log(err);
          this.showToast('An error occurred while creating the features. Verify');
        });
    } else {
      toastErrors(Object.values(this.state.formErrors));
    }
  }

  handleOnFeaturesNameChange(event) {
    const newValue = event.target.value;
    this.setState(prevState => ({
      id: newValue,
      nextId: prevState.nextId,
      features: prevState.features,
      formErrors: Object.assign(prevState.formErrors, { name: '' }),
    }));
  }

  toaster;
  refHandlers = {
    toaster: ref => (this.toaster = ref),
  };
  render() {
    const createComponents =
      this.state.otherFeatures &&
      Object.keys(this.state.features).map(id => {
        const feature = this.state.features[id];
        return (
          <CreateSingleFeature
            id={id}
            handleFeatureNameChange={this.handleFeatureNameChange}
            handleFeatureDescriptionChange={this.handleFeatureDescriptionChange}
            handleDataTypeChange={this.handleDataTypeChange}
            handleDimensionChange={this.handleDimensionChange}
            feature={feature}
            otherFeatures={this.state.otherFeatures}
          />
        );
      });
    return (
      <div>
        <Toaster {...this.state} ref={this.refHandlers.toaster} />
        <H2>Create new features </H2>
        <Callout>
          <H4>Instructions</H4>
          <ul>
            <li>
              <Text> Names need to be unique and must contain alpha numerical characters</Text>
            </li>
          </ul>
        </Callout>
        <br />
        <InputGroup
          onChange={this.handleOnFeaturesNameChange}
          placeholder="Features Name (required)"
        />
        <br />
        <Button
          onClick={this.handleCreateFeatures}
          className="rightButton"
          rightIcon="arrow-right"
          intent="success"
        >
          Create
        </Button>
        <br />
        <br />
        {createComponents}
        <br />
        <Button className="rightButton" onClick={this.handleNewFeature} text="Add" />
      </div>
    );
  }
}

export default CreateFeaturesPage;
