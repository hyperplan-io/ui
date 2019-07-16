import React from 'react';

import { Card, InputGroup, H5 } from '@blueprintjs/core';
class RasaNluBackendConfiguration extends React.Component {
  constructor(props) {
    super(props);
    this.handleHostChange = this.handleHostChange.bind(this);
    this.handlePortChange = this.handlePortChange.bind(this);
    this.handleJoinCharacter = this.handleJoinCharacter.bind(this);
    this.handleFeatureQuery = this.handleFeatureQuery.bind(this);
  }

  handleHostChange(event) {
    const host = event.target.value;
    this.props.backendConfigurationChange({ key: 'host', value: host });
    this.setState(_ => ({
      host: host,
    }));
  }

  handlePortChange(event) {
    const port = event.target.value;
    this.props.backendConfigurationChange({ key: 'port', value: port });
    this.setState(_ => ({
      port: port,
    }));
  }

  handleJoinCharacter(event) {
    const character = event.target.value;
    this.props.backendConfigurationChange({ key: 'joinCharacter', value: character });
    this.setState(_ => ({
      joinCharacter: character,
    }));
  }

  handleFeatureQuery(event) {
    const featureQuery = event.target.value;
    this.props.backendConfigurationChange({ key: 'featureQuery', value: featureQuery });
    this.setState(_ => ({
      featureQuery: featureQuery,
    }));
  }

  render() {
    return (
      <div>
        <Card>
          <H5>TensorFlow Configuration </H5>
          <InputGroup onChange={this.handleHostChange} placeholder="Host (required)" />
          <br />
          <InputGroup onChange={this.handlePortChange} placeholder="Port (required)" />
          <br />
          <InputGroup onChange={this.handleJoinCharacter} placeholder="Join character (required)" />
          <br />
          <InputGroup onChange={this.handleFeatureQuery} placeholder="Feature to use (required)" />
          <br />
        </Card>
      </div>
    );
  }
}

export default RasaNluBackendConfiguration;
