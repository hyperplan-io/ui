import React from 'react';

import {Card, InputGroup, H5 } from "@blueprintjs/core";
class TensorFlowBackendConfiguration extends React.Component {

  constructor(props) {
    super(props);
    this.handleHostChange = this.handleHostChange.bind(this);
    this.handlePortChange = this.handlePortChange.bind(this);
    this.handleSignatureChange = this.handleSignatureChange.bind(this);
  }

  handleHostChange(event) {
    const host = event.target.value;
    this.props.backendConfigurationChange({key: 'host', value: host});
    this.setState(prevState => ({
      host: host,
    }));
  }

  handlePortChange(event) {
    const port = event.target.value;
    this.props.backendConfigurationChange({key: 'port', value: port});
    this.setState(prevState => ({
      port: port,
    }));
  }

  handleSignatureChange(event) {
    const signatureName = event.target.value;
    this.props.backendConfigurationChange({key: 'signatureName', value: signatureName});
    this.setState(prevState => ({
      signatureName: signatureName,
    }));
  }

  render() {
    return (
      <div>
        <Card>
          <H5>TensorFlow Configuration </H5> 
          <InputGroup onChange={this.handleHostChange} placeholder="Host (required)"/>
          <br/>
          <InputGroup onChange={this.handlePortChange} placeholder="Port (required)"/>
          <br/>
          <InputGroup onChange={this.handleSignatureChange} placeholder="Signature name(required)"/>
        </Card>
      </div>
    )
  }

}

export default TensorFlowBackendConfiguration;
