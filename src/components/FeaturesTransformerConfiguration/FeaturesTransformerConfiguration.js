import React from 'react';
import { Card, HTMLSelect, H5 } from '@blueprintjs/core';
const featureTransformationFunctions = ['identity'];

class FeaturesTransformerConfiguration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      featureTransformationFunction: 'identity',
    };
    const featureTransformer = {
      signatureName: '',
      mapping: Object.assign(
        ...this.props.project.configuration.features.data.map(feature => ({
          [feature.name]: feature.name,
        })),
      ),
    };
    this.props.featuresTransformerChange(featureTransformer);
  }

  render() {
    return (
      <div>
        <Card>
          <H5> Features transformation </H5>
          <HTMLSelect
            options={featureTransformationFunctions}
            onChange={this.handleFunctionChange}
            value={this.state.featureTransformationFunction}
          ></HTMLSelect>
        </Card>
      </div>
    );
  }
}

export default FeaturesTransformerConfiguration;
