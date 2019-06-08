import React from 'react';

import { Button, HTMLSelect, RadioGroup, Radio, InputGroup, Card } from "@blueprintjs/core";

import TensorFlowBackendConfiguration from '../TensorFlowBackendConfiguration/TensorFlowBackendConfiguration';
import FeaturesTransformerConfiguration from '../FeaturesTransformerConfiguration/FeaturesTransformerConfiguration';
import LabelsTransformerConfiguration from '../LabelsTransformerConfiguration/LabelsTransormerConfiguration';

const classificationBackends = [
  'TensorFlowClassificationBackend',
]
const regressionBackends = [
  'TensorFlowRegressionBackend'
]

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
      problemType: 'Classification',
      backend: 'TensorFlowClassificationBackend',
      backendConfiguration: {
        
      }
    }
  }

  featuresTransformerChange(featuresTransformer) {
    this.setState(prevState => ({
      featuresTransformer: featuresTransformer
    }));
  }

  labelsTransformerChange(labelsTransformer) {
    this.setState(prevState => ({
      labelsTransformer: labelsTransformer
    }));
  }

  handleAlgorithmIdChange(event) {
    const algorithmId = event.target.value;
    this.setState(prevState => ({
      algorithmId: algorithmId
    }));
  }

  handleBackendChange(event) {
    const backend = event.target.value;
    this.setState(prevState => ({
      backend: backend
    }));
  }

  handleProblemTypeChange(event) {
    const problemType = event.target.value;
    this.setState(prevState => ( {
      problemType: problemType
    }));
  }
  backendConfigurationChange(backendConfiguration) {
    this.setState(prevState => {{
      let prevBackendConfiguration = prevState.backendConfiguration;
      prevBackendConfiguration[backendConfiguration.key] = backendConfiguration.value;
      return {
        backendConfiguration: prevBackendConfiguration 
      }
    }});
  }

  createAlgorithm() {
    const headers = {
      'Authorization': `Bearer ${this.props.user.accessToken}`
    };
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
            value: 'myToken'
          }
        ]
	    }
    }

    fetch(
      "/algorithms",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload)
      }
    ).then(res => {
      res.json.then(body => {
        console.log(body)
        this.props.history.push(`/projects/${this.state.projectId}`)
      })
    }).catch( (err) => {
      console.log(err);
    })
  }

  componentDidMount() {
    const headers = {
      'Authorization': `Bearer ${this.props.user.accessToken}`
    };
    fetch(
      `/projects/${this.state.projectId}`,
      {
        method: "GET",
        headers: headers
      }
    ).then(res => {
      res.json().then(body => {
        this.setState( {
			    project: body
		    });
      });
    });
  }
  
  render() {
    let options;
    if(this.state.problemType === 'Classification') {
      options = classificationBackends;
    } else if(this.state.problemType === 'Regression') {
      options = regressionBackends;
    }

    let backendConfiguration;
    if(this.state.backend === 'TensorFlowClassificationBackend') {
      backendConfiguration = (
        <TensorFlowBackendConfiguration backendConfigurationChange={this.backendConfigurationChange} />
      )
    } else if(this.state.backend === 'TensorFlowRegressionBackend') {
      backendConfiguration = (
        <TensorFlowBackendConfiguration backendConfigurationChange={this.backendConfigurationChange}/>
      )
    }
        
    return (
      <div>
        <div className="leftPanel">
        <InputGroup onChange={this.handleAlgorithmIdChange} type="text" placeholder="Algorithm id (required)" />         
      <br/>
      <br/>
      <Card>
      <RadioGroup
			  label="Problem"
        inline='true'
				onChange={this.handleProblemTypeChange}
				selectedValue={this.state.problemType}>
          <Radio label="Classification" value="Classification" />
					<Radio label="Regression" value="Regression" />
			</RadioGroup>
      <HTMLSelect
          options={options}
          onChange={this.handleBackendChange}
          value={this.state.backend} >
      </HTMLSelect>
      </Card>
      <br/>  
      <br/>  
        
      <Button onClick={this.createAlgorithm} className="rightButton" rightIcon="arrow-right" intent="success">Create</Button>
      </div>
      <div className="rightPanel">
        { backendConfiguration }         
        <br/>
          { 
            this.state.project && 
          <div><FeaturesTransformerConfiguration project={this.state.project} featuresTransformerChange={this.featuresTransformerChange}/>
          <br/>
        <LabelsTransformerConfiguration project={this.state.project} labelsTransformerChange={this.labelsTransformerChange}/></div>
          }
      </div>
      </div>
    )
  }

}

export default CreateAlgorithmPage;
