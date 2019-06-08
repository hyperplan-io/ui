import React from 'react';

import './CurlExample.css';
import { H3 } from "@blueprintjs/core";
import {Callout} from '@blueprintjs/core';

function generateFeatures(project) {
  const data = project.configuration.features.data.map(feature => {
    if(feature.dimension === 'One') {
      if(feature.type === 'Float') {
        return { [feature.name]: Math.random() }
      } else if(feature.type === 'Int') {
        return { [feature.name]: Math.random() }
      } else if(feature.type === 'String') {
        return { [feature.name]: 'random string' }
      } else {
        return { [feature.name]: {} }
      }
    } else if(feature.dimension === 'Vector') {
      if(feature.type === 'Float') {
        return { [feature.name]: [Math.random()] }
      } else if(feature.type === 'Int') {
        return { [feature.name]: [Math.random()] }
      } else if(feature.type === 'String') {
        return { [feature.name]: ['random string'] }
      } else {
        return { [feature.name]: [{}] }
      }
    } else if(feature.dimension === 'Matrix') {
      if(feature.type === 'Float') {
        return { [feature.name]: [[Math.random()]] }
      } else if(feature.type === 'Int') {
        return { [feature.name]: [[Math.random()]] }
      } else if(feature.type === 'String') {
        return { [feature.name]: [[Math.random()]] }
      } else {
        return { [feature.name]: [[{}]] }
      }
    }
    return {};
  })
  return Object.assign(...data)
}

function CurlExample(props) {
  const project = props.project;
  const host = 'http://127.0.0.1:8080'
  const features = generateFeatures(project)
  const data = {
    projectId: project.id,
    features: features
  }
  const code = ` curl -X POST ${host}/predictions -H 'Content-Type: application/json' -H 'cache-control: no-cache' -H 'Authorization: Bearer ${props.user.accessToken}' -d '${JSON.stringify(data, null, 2)}'
  `
  return (
    <div>
    <H3>Code sample</H3>
    <Callout>
    <code>
      ${code}
    </code>
    </Callout>
    </div>
  )
}

export default CurlExample;
