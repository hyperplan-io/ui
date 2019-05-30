import React from 'react';

import { H5 } from "@blueprintjs/core";

function Algorithm(props) {
  return (
    <div>
      <H5> hello there </H5>
      <H5> {props.id} </H5>
    </div>
  )
}

function Algorithms(props) {
  console.log("hello")
  return (
    <div> {props.algorithms.map(algorithm => <Algorithm algorithm={algorithm} />)} </div>
  )
}

export default Algorithms;
