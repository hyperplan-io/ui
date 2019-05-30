import React from 'react';
import './FeaturesPage.css';
import Features from '../Features/Features';

import { Card, H3, H5, Callout, Text, Collapse } from "@blueprintjs/core";
import axios from 'axios';

function Feature(props) {
  return (
    <Card>
      <div>
        <H5>
          <a href={`/features/${props.features.id}`}> { props.features.id}</a>
        </H5>
      </div>
    </Card>
  )
}

class FeaturesPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  componentDidMount() {
    const headers = {
      'Authorization': `Bearer ${this.props.user.accessToken}`
    };
    axios.get(`https://antoine.api.foundaml.org/features`, { headers: headers })
      .then(r => {
        this.setState( {
			    features: r
        });
      });
  }

  render() {
    if(this.state.features) {
      console.log(this.state);
      const featuresComponents = this.state.features.data.map(feature => 
        <Feature features={feature}/>
      )
      this.state.features.data.forEach(f => console.log(f))
      return (
        <div>
          <h1> Features </h1>
          { featuresComponents}
        </div>
      )
    } else {
      return <div> </div>
    }
    
  }
	
}

export default FeaturesPage;
