import React from 'react';
import './FeaturesPage.css';
import { Button, Card, H5 } from "@blueprintjs/core";
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
    this.handleCreateFeatures = this.handleCreateFeatures.bind(this);
  }

  handleCreateFeatures() {
    this.props.history.push('createFeatures');
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
    let mainContent;
    if(this.state.features) {
      const featuresComponents = this.state.features.data.map(feature => 
        <Feature features={feature}/>
      )
      mainContent = (
        <div>
          <h1> Features </h1>
          { featuresComponents}
        </div>
      )
    } else {
      mainContent = <div> </div>
    }

    return (
      <div>
      <Button onClick={this.handleCreateFeatures} className="rightButton" rightIcon="arrow-right" intent="success">Create</Button>
      { mainContent }
      </div>
    )
    
    
  }
	
}

export default FeaturesPage;
