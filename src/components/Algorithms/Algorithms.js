import React from 'react';

import { Callout, Card, H5 , Text } from "@blueprintjs/core";

function Algorithm(props) {
  return (
    <div>
      <Card>
        <H5> {props.algorithm.id} </H5>
        <Callout><Text> {props.algorithm.backend.class} </Text></Callout>
      </Card>
    </div>
  )
}

function Algorithms(props) {
  return (
    <div> {props.algorithms.map(algorithm => <Algorithm algorithm={algorithm} />)} </div>
  )
}

export default Algorithms;
