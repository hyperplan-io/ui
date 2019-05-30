import React from 'react';
import { Card, H3, H5, Callout, Text, Collapse } from "@blueprintjs/core";

import './Labels.css';

function Label(props) {
  return (
    <Card>
      <div>
        <H5> { props.label.name }</H5>
          <Callout className="itemMargin">
            <Text> { props.label.description} </Text> 
          </Callout>
          <Callout className="itemMargin">
            <Text> { props.label.type } </Text>
          </Callout>
      </div>
    </Card>
  )
}

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
