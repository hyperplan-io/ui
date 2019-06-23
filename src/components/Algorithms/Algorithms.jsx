import React from 'react';

import { Callout, Card, Divider, H5, Text } from '@blueprintjs/core';

import './Algorithms.css';
function Algorithm(props) {
  return (
    <div>
      <Card>
        <H5> {props.algorithm.id} </H5>

        <div className="inlineDiv">
          <Text>Backend</Text>
          <Divider />
          <Callout>
            <Text>{props.algorithm.backend.class} </Text>
          </Callout>
        </div>
        <br />
        <br />

        <div className="inlineDiv">
          <Text>Host</Text>
          <Divider />
          <Callout>
            <Text>{props.algorithm.backend.host} </Text>
          </Callout>
        </div>

        <br />
        <br />

        <div className="inlineDiv">
          <Text>Port</Text>
          <Divider />
          <Callout>
            <Text>{props.algorithm.backend.port} </Text>
          </Callout>
        </div>
      </Card>
    </div>
  );
}

function Algorithms(props) {
  return (
    <div>
      {' '}
      {props.algorithms.map(algorithm => (
        <Algorithm algorithm={algorithm} />
      ))}{' '}
    </div>
  );
}

export default Algorithms;
