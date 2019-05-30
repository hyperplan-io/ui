import React from 'react';
import { Card, H3, Callout, Text } from "@blueprintjs/core";

import './Labels.css';


function Labels(props) {
  console.log(props)
  return (
    <Card>
      <div>
        <H3> Labels </H3>
        <Callout className="itemMargin" >
          <Text> {props.labels.data.type} </Text>
        </Callout>
        <Callout className="itemMargin">
          <Text> {props.labels.data.description} </Text>
        </Callout>
      </div>
    </Card>
  )
}

export default Labels;
