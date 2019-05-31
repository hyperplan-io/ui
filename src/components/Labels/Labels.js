import React from 'react';
import { Card, H3, Callout, TagInput, Text } from "@blueprintjs/core";

import './Labels.css';


function Labels(props) {
	const oneOfLabels = (props.labels.data.type === 'oneOf' && <TagInput
		disabled={true}
    values={props.labels.data.oneOf}
/>)
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
			<br/>	
				{ oneOfLabels }
				
      </div>
    </Card>
  )
}

export default Labels;
