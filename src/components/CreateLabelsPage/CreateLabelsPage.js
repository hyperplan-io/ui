import React from 'react'; 
import { Intent, TagInput, Toaster, Callout, Text, RadioGroup, Radio, InputGroup, FormGroup, Button, Card, Classes, H2, H4, H5 } from "@blueprintjs/core";
import './CreateLabelsPage.css';

import axios from 'axios';

class StaticLabel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: []
    }
    this.handleOnChangeLabels = this.handleOnChangeLabels.bind(this); 
  }

  handleOnChangeLabels(values) {
    const newValues = values;
    this.setState({ labels: newValues })
    this.props.handleOnChangeLabels(newValues);
  }

  render() {
    return (
      <div>
      <TagInput
        onChange={this.handleOnChangeLabels}
        values={this.state.labels}
      />
      </div>
    )
  }
}


class CreateLabelsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labelType: 'oneOf',
      oneOfLabels: []
    }
   
    this.handleCreateLabels = this.handleCreateLabels.bind(this);
    this.handleLabelTypeChange = this.handleLabelTypeChange.bind(this);
    this.handleOnLabelsNameChange = this.handleOnLabelsNameChange.bind(this);
    this.handleOnLabelsDescriptionChange = this.handleOnLabelsDescriptionChange.bind(this);
    this.handleOnChangeLabels = this.handleOnChangeLabels.bind(this);
  }

	handleLabelTypeChange(event) {
    const newType = event.target.value;
    this.setState(prevState => {
      return {
        labelType: newType,
        name: prevState.name,
        description: prevState.description,
        oneOfLabels: prevState.labels
      }
    });
  }

  handleOnChangeLabels(values) {
    this.setState(prevState => ( {
      labelType: prevState.labelType,
      name: prevState.name,
      description: prevState.description,
      oneOfLabels: values
    }));
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
		//toast.className = this.props.data.themeName;
		toast.timeout = 5000;
		this.toaster.show(toast);
	}

  handleCreateLabels() {
    const payload = {
      id: this.state.name,
      data: {
        description: this.state.description,
        type: this.state.labelType,
        oneOf: this.state.oneOfLabels
      }
      
    }
    const headers = {
      'Authorization': `Bearer ${this.props.user.accessToken}`
    };

    axios.post('https://antoine.api.foundaml.org/labels', payload, { headers:headers })
      .then(r => {
        this.props.history.push('/labels')
      }).catch( (err) => {
					this.showToast("An error occurred while creating the labels. Verify");
      })
  }

  handleOnLabelsNameChange(event) {
    const newValue = event.target.value;
    this.setState( prevState => ({
      labelType: prevState.labelType,
      name: newValue,
      description: prevState.description,
      oneOfLabels: prevState.labels
    }));
  }
  handleOnLabelsDescriptionChange(event) {
    const newValue = event.target.value;
    this.setState( prevState => ({
      labelType: prevState.labelType,
      name: prevState.name,
      description: newValue,
      oneOfLabels: prevState.oneOfLabels
    }));
  }

	toaster;
  refHandlers = {
  	toaster: (ref) => (this.toaster = ref),
  };
  render() {
    return (
      <div>
				<Toaster {...this.state} ref={this.refHandlers.toaster} />
        <H2>Create new labels </H2>
        <Callout >
          <H4>Instructions</H4>
          <ul>
            <li><Text> Labels can be either static or dynamic </Text></li>
            <li><Text> If you know exactly what your labels are, prefer the static </Text></li>
            <li><Text> If your labels vary a lot or if there a too many of them, prefer dynamic </Text></li>
          </ul>
        </Callout>
				<br/>
      <Button onClick={this.handleCreateLabels} className="rightButton" rightIcon="arrow-right" intent="success">Create</Button>
				<br/>
				<br/>
				<br/>
        <InputGroup onChange={this.handleOnLabelsNameChange} placeholder="Labels name (required)"/>
      <br/>
        <InputGroup onChange={this.handleOnLabelsDescriptionChange} placeholder="Labels description (required)"/>
				<br/>
        <RadioGroup
						label="Label Type"
            inline='true'
						onChange={this.handleLabelTypeChange}
						selectedValue={this.state.labelType}
						>
							<Radio label="Static" value="oneOf" />
							<Radio label="Dynamic" value="dynamic" />
				</RadioGroup>
				<br/>
        { this.state.labelType == 'oneOf' && <StaticLabel handleOnChangeLabels={this.handleOnChangeLabels}/>}
        <br/>
        
      </div>
    )
  }

}

export default CreateLabelsPage;
