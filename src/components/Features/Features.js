import React from 'react';
import { Card, H3, H5, Callout, Text, Collapse } from "@blueprintjs/core";

import './Features.css';

function Feature(props) {
  return (
    <Card>
      <div>
        <H5> { props.feature.name }</H5>
          <Callout className="itemMargin">
            <Text> { props.feature.description} </Text> 
          </Callout>
          <Callout className="itemMargin">
            <Text> { props.feature.type } </Text>
          </Callout>
      </div>
    </Card>
  )
}

function Features(props) {
  console.log(props)
  const featuresComponents = props.features.data.map(feature =>
    <Feature key={feature.name} feature={feature} />
  );
  return (
    <div>
      <H3> Features </H3>

      <Collapse isOpen={true}>
        { featuresComponents }
      </Collapse>
    </div>
  )
}

export default Features;
