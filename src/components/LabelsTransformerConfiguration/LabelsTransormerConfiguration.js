import React from 'react';
import { Card, HTMLSelect, H5 } from '@blueprintjs/core';
const labelsTransformationFunctions = ['identity'];

class LabelsTransformerConfiguration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labelsTransformationFunction: 'identity',
    };
    const labelsConfiguration = this.props.project.configuration.labels.data;
    if (labelsConfiguration.type === 'dynamic') {
      this.props.labelsTransformerChange({ fields: {} });
    } else if (labelsConfiguration.type === 'oneOf') {
      this.props.labelsTransformerChange({
        fields: Object.assign(...labelsConfiguration.oneOf.map(label => ({ [label]: label }))),
      });
    }
  }

  render() {
    return (
      <div>
        <Card>
          <H5> Labels transformation </H5>
          <HTMLSelect
            options={labelsTransformationFunctions}
            onChange={this.handleFunctionChange}
            value={this.state.labelsTransformationFunction}
          ></HTMLSelect>
        </Card>
      </div>
    );
  }
}

export default LabelsTransformerConfiguration;
