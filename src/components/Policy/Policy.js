import React from 'react';

import { Button, H3, HTMLSelect, NumericInput, Text } from "@blueprintjs/core";
import './Policy.css';

import { patchProject } from '../../utils/Api';

const policyOptions = [
  'DefaultAlgorithm',
  'WeightedAlgorithm'
]

class DefaultAlgorithm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      algorithmId: props.previousPolicy ? props.previousPolicy.algorithmId : props.algorithmIds[0]
    }
    this.updatePolicy = this.updatePolicy.bind(this);
  }

  updatePolicy(event) {
    const algorithmId = event.target.value;
    this.setState( {
      algorithmId: algorithmId
    })
    const policy = {
      class: 'DefaultAlgorithm',
      algorithmId: algorithmId
    }
    this.props.updatePolicy(policy)
  }

  render() {
    return (
      <div>
        <HTMLSelect
          options={this.props.algorithmIds}
          onChange={this.updatePolicy}
          value={this.state.algorithmId} >
        </HTMLSelect>
      </div>
    )
  }
}

class SingleAlgorithmWeight extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      weight: props.weight
    }
    this.weightChange = this.weightChange.bind(this)
  }
  weightChange(event) {
    const weight = event;
    this.props.weightChange(this.props.algorithmId, weight)
    this.setState( {
      weight: weight 
    })
  }
  render() {
    return (
      <div className="algorithmWeightField">
        <Text> {this.props.algorithmId} </Text>
        <NumericInput 
          placeholder={"probability"}
          onValueChange={this.weightChange}
          value={this.state.weight}
        />
      </div>
    )
  }
  
}

class WeightedAlgorithm extends React.Component {
  constructor(props) {
    super(props);
    if(props.previousPolicy && props.previousPolicy.class === 'WeightedAlgorithm') {
      this.state = {
        weights: Object.assign({}, ...props.previousPolicy.weights.map(weight => ({ [weight.algorithmId]: weight.weight})))
        
      }
    } else {
      this.state = {
        weights:  Object.assign({}, ...props.algorithms.map(algorithm => ({ [algorithm.id]: 0 })))
      }
    }
    
    this.weightChange = this.weightChange.bind(this)
  }

  weightChange(algorithmId, weight) {
    const weights = { ...this.state.weights, ...{ [algorithmId]: weight }}
    this.setState( {
      weights: weights 
    })
    const policy = 
      {
        class: 'WeightedAlgorithm',
        weights: Object.keys(weights).map(key => ({ algorithmId: key, weight: weights[key]}))
      }
    this.props.updatePolicy(policy);
  }

  render() {
    const algorithmComponents = this.props.algorithms.map(algorithm => {
      return <div>
        <SingleAlgorithmWeight 
          algorithmId={algorithm.id} 
          weightChange={this.weightChange}
          weight={this.state.weights[algorithm.id]}
        /> 
        <br/> 
      </div>
    }
    )

          return (
      <div>
      { algorithmComponents }
      </div>
    )
  }
}

class Policy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      policy: props.policy,
      policyClass: props.policy.class,
    }
    this.algorithmIds = this.props.algorithms.map(algorithm => algorithm.id);
    this.handlePolicyTypeChange = this.handlePolicyTypeChange.bind(this);
    this.updatePolicy = this.updatePolicy.bind(this);
    this.submitUpdatePolicy = this.submitUpdatePolicy.bind(this)
  }

  handlePolicyTypeChange(event) {
    const newPolicyClass = event.target.value;
    this.setState( {
      policyClass: newPolicyClass,
      newPolicy: null
    })

  }

  updatePolicy(policy) {
    this.setState( {
      newPolicy: policy
    })
  }

  submitUpdatePolicy() {
    const payload = {
      policy: this.state.newPolicy
    }
    this.setState(prevState => ( {
      policy: prevState.newPolicy
    }));
    patchProject(
      this.props.projectId, 
      payload, 
      this.props.user.accessToken, 
      this.props.invalidateToken
    ).then(res => {
      this.props.history.push(`/Projects/${this.props.projectId}`)
    })
  }
  render() {
    if(this.props.algorithms.length) {
      return (
        <div>
          <div className="policyType">
            <H3>Policy</H3>
            <HTMLSelect
              options={policyOptions}
              onChange={this.handlePolicyTypeChange}
              value={this.state.policyClass} >
            </HTMLSelect>

            </div>
          <div className="policySettings">
            { (this.state.policyClass === 'NoAlgorithm' &&
              <Text> This project does not have any algorithms </Text>)}
            { (this.state.policyClass === 'DefaultAlgorithm' &&
              <DefaultAlgorithm updatePolicy={this.updatePolicy} previousPolicy={this.props.policy} algorithmIds={this.algorithmIds} /> )}
            { (this.state.policyClass === 'WeightedAlgorithm' &&
              <WeightedAlgorithm 
                algorithms={this.props.algorithms} 
                updatePolicy={this.updatePolicy}
                previousPolicy={this.state.policy}
              />)}
          </div>
          <div className="policyUpdate">
            <Button onClick={this.submitUpdatePolicy} text="Update" />
          </div>
        </div>
    )
    } else {
      return (
        <div>
          <H3>Policy</H3>
          <Text> This project does not have any algorithms </Text>
        </div>
      )
    }
    
  }
  
}
export default Policy;
