import React from 'react'; 
import { Intent, Toaster, Callout, Text, RadioGroup, Radio, InputGroup, FormGroup, Button, Card, H2, H4 } from "@blueprintjs/core";
import './CreateFeaturesPage.css';

import axios from 'axios';

class CreateSingleFeature extends React.Component {
  constructor(props) {
    super(props);
		this.handleDataTypeChange = this.handleDataTypeChange.bind(this);
		this.handleDimensionChange = this.handleDimensionChange.bind(this);
		this.handleFeatureNameChange = this.handleFeatureNameChange.bind(this);
		this.handleFeatureDescriptionChange = this.handleFeatureDescriptionChange.bind(this);
    this.state = {
      currentType: "String",
      currentDimension: "One"
    }
  }

  handleFeatureNameChange(event) {
    console.log(`my id is ${this.props.id}`)
    this.props.handleFeatureNameChange(
      this.props.id,
      event
    )
  }

  handleFeatureDescriptionChange(event) {
    console.log(`my id is ${this.props.id}`)
    this.props.handleFeatureDescriptionChange(
      this.props.id,
      event
    )
  }

	handleDataTypeChange(event) {
    const newValue = event.target.value;
    this.props.handleDataTypeChange(
      this.props.id,
      event
    )
    this.setState(prevState => (
      {
        currentType: newValue,
        currentDimension: prevState.currentDimension 
      }
    ));
	}

  handleDimensionChange(event) {
    const newValue = event.target.value;
    this.props.handleDimensionChange(
      this.props.id,
      event
    )
    this.setState(prevState => (
      {
        currentType: prevState.currentType,
        currentDimension: newValue
      }
    ));
  }

  render() {
    return (
      <div className="createFeatureDiv">
        <Card>
        <FormGroup>
          <InputGroup onChange={this.handleFeatureNameChange}id="text-input" placeholder="Feature name (required)" />
          <br/>
          <InputGroup onChange={this.handleFeatureDescriptionChange} id="text-input" placeholder="Description" />
          <br/>
					<RadioGroup
						label="Type"
            inline='true'
						onChange={this.handleDataTypeChange}
						selectedValue={this.state.currentType}
						>
							<Radio label="String" value="String" />
							<Radio label="Integer" value="Integer" />
							<Radio label="Float" value="Float" />
					</RadioGroup>
          <RadioGroup
						label="Dimension"
            inline='true'
						onChange={this.handleDimensionChange}
						selectedValue={this.state.currentDimension}
						>
							<Radio label="One" value="One" />
							<Radio label="Vector" value="Vector" />
							<Radio label="Matrix" value="Matrix" />
					</RadioGroup>
        </FormGroup>
      </Card>
      </div>
    )
  }
}
const defaultState = {
  description: '',
  dataType: 'String',
  dimension: 'One'
}

function randomString() {
  return Math.random().toString(36).slice(-5)
}

function computeType(dataType, dimension) {
    if(dimension === 'One') {
      return dataType;
    } else if(dimension === 'Vector') {
      return `${dataType}Vector`
    } else if(dimension === 'Float') {
      return `${dataType}Vector2d`
    }
}
class CreateFeaturesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nextId: randomString(),
      features: {
        '0': defaultState
      }
    }
    this.handleCreateFeatures= this.handleCreateFeatures.bind(this);
    this.handleNewFeature = this.handleNewFeature.bind(this);
    this.handleFeatureNameChange = this.handleFeatureNameChange.bind(this);
    this.handleFeatureDescriptionChange = this.handleFeatureDescriptionChange.bind(this);
    this.handleDataTypeChange = this.handleDataTypeChange.bind(this);
    this.handleDimensionChange = this.handleDimensionChange.bind(this);
    this.handleOnFeaturesNameChange = this.handleOnFeaturesNameChange.bind(this);
  }

	handleNewFeature() {
    this.setState(prevState => {
      let newFeatures = prevState.features; 
      newFeatures[prevState.nextId] = defaultState;
      console.log(`newFeatures: ${JSON.stringify(newFeatures)}`)
      return {
        nextId: randomString(),
        features: newFeatures
      }
    })
	}	

  handleDataTypeChange(id, event) {
    const newType = event.target.value;
    this.setState(prevState => {
      let newFeature = prevState.features;
      newFeature[id].dataType = newType;
      return {
        nextId: prevState.nextId,
        features: newFeature 
      }
    });
  }

  handleDimensionChange(id, event) {
    const newDimension = event.target.value;
    this.setState(prevState => {
      const newFeature = { ...prevState.features[id], ...{ dimension : newDimension}}
      const newFeatures = {...prevState.features, ...{ [id]: newFeature}}
      return {
        nextId: prevState.nextId,
        features: newFeatures
      }
    });
  }

  handleFeatureNameChange(id, event) {
    const newName = event.target.value;
    this.setState(prevState => {
      const newFeature = { ...prevState.features[id], ...{ name: newName}}
      const newFeatures = {...prevState.features, ...{ [id]: newFeature}}
      return {
        nextId: prevState.nextId,
        features: newFeatures
      }
    });
  }

  handleFeatureDescriptionChange(id, event) {
    const newDescription = event.target.value;
    this.setState(prevState => {
      const newFeature = { ...prevState.features[id], ...{ description: newDescription}}
      const newFeatures = {...prevState.features, ...{ [id]: newFeature}}
      return {
        nextId: prevState.nextId,
        features: newFeatures
      }
    });
  }

 
	showToast(message) {
		const toast = {
			action: {
				onClick: () => this.addToast(this.TOAST_BUILDERS[2]),
				text: "Retry",
			},
			button: "Delete root",
			icon: "warning-sign",
			intent: Intent.DANGER,
			message: message
		}
		toast.timeout = 5000;
		this.toaster.show(toast);
	}

  handleCreateFeatures() {
    const featuresList = Object.keys(this.state.features).map(id => this.state.features[id])
    const payload = {
      id: this.state.id,
      data: featuresList.map(feature => ({
        name: feature.name, 
        type: computeType(feature.dataType, feature.dimension),
        description: feature.description
      }))
    }
    const headers = {
      'Authorization': `Bearer ${this.props.user.accessToken}`
    };
    axios.post('https://antoine.api.foundaml.org/features', payload, { headers:headers })
      .then(r => {
        this.props.history.push('/features')
      }).catch( (err) => {
					this.showToast("An error occurred while creating the features. Verify");
      })
  }

  handleOnFeaturesNameChange(event) {
    const newValue = event.target.value;
    this.setState( prevState => ({
      id: newValue, 
      nextId: prevState.nextId,
      features: prevState.features
    }));
  }

	toaster;
  refHandlers = {
  	toaster: (ref) => (this.toaster = ref),
  };
  render() {
    console.log(this.state)
    const createComponents = Object.keys(this.state.features).map(id => {
      const feature = this.state.features[id];
      return <CreateSingleFeature 
        id={id} 
        handleFeatureNameChange={this.handleFeatureNameChange} 
        handleFeatureDescriptionChange={this.handleFeatureDescriptionChange} 
        handleDataTypeChange={this.handleDataTypeChange} 
        handleDimensionChange={this.handleDimensionChange} 
        feature={feature}
      />  
    })
    return (
      <div>
				<Toaster {...this.state} ref={this.refHandlers.toaster} />
        <H2>Create new features </H2>
        <Callout >
          <H4>Instructions</H4>
          <ul>
            <li><Text> Names need to be unique and must contain alpha numerical characters</Text></li>
          </ul>
        </Callout>
				<br/>
        <InputGroup onChange={this.handleOnFeaturesNameChange} placeholder="Features Name (required)"/>
				<br/>
      <Button onClick={this.handleCreateFeatures} className="rightButton" rightIcon="arrow-right" intent="success">Create</Button>
				<br/>
				<br/>
			  {createComponents}
        <br/>
				<Button className="rightButton" onClick={this.handleNewFeature} text="Add"/>
        
      </div>
    )
  }

}

export default CreateFeaturesPage;
