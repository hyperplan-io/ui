import React from 'react';

import { Card, InputGroup, H5 } from '@blueprintjs/core';
class RasaNluBackendConfiguration extends React.Component {
  constructor(props) {
    super(props);
    this.handleRootPathChange = this.handleRootPathChange.bind(this);
    this.handleRasaProjectChange = this.handleRasaProjectChange.bind(this);
    this.handleRasaModelChange = this.handleRasaModelChange.bind(this);
  }

  handleRootPathChange(event) {
    const rootPath = event.target.value;
    this.props.backendConfigurationChange({ key: 'rootPath', value: rootPath });
    this.setState(_ => ({
      rootPath: rootPath,
    }));
  }

  handleRasaProjectChange(event) {
    const project = event.target.value;
    this.props.backendConfigurationChange({ key: 'project', value: project });
    this.setState(_ => ({
      project: project,
    }));
  }

  handleRasaModelChange(event) {
    const model = event.target.value;
    this.props.backendConfigurationChange({ key: 'model', value: model });
    this.setState(_ => ({
      model: model,
    }));
  }

  render() {
    return (
      <div>
        <Card>
          <H5>TensorFlow Configuration </H5>
          <InputGroup onChange={this.handleRootPathChange} placeholder="Root path (required)" />
          <br />
          <InputGroup onChange={this.handleRasaProjectChange} placeholder="Project (required)" />
          <br />
          <InputGroup onChange={this.handleRasaModelChange} placeholder="Model (required)" />
          <br />
        </Card>
      </div>
    );
  }
}

export default RasaNluBackendConfiguration;
