import React from 'react';

import { Card, HTMLSelect, InputGroup, H5 } from '@blueprintjs/core';
class RasaNluBackendConfiguration extends React.Component {
  constructor(props) {
    super(props);
    this.handleHostChange = this.handleHostChange.bind(this);
    this.handlePortChange = this.handlePortChange.bind(this);
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

  render() {
    return (
      <div>
        <Card>
          <H5>TensorFlow Configuration </H5>
          <InputGroup onChange={this.handleHostChange} placeholder="Host (required)" />
          <br />
          <InputGroup onChange={this.handlePortChange} placeholder="Port (required)" />
          <br />
          <br />
        </Card>
      </div>
    );
  }
}

export default RasaNluBackendConfiguration;
