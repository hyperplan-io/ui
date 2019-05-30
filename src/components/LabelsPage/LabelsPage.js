import React from 'react';
import './LabelsPage.css';
import Labels from '../Labels/Labels';

import { Button, Card, H3, H5, Callout, Text, Collapse } from "@blueprintjs/core";
import axios from 'axios';

function Label(props) {
  return (
    <Card>
      <div>
        <H5>
          <a href={`/labels/${props.labels.id}`}> { props.labels.id}</a>
        </H5>
      </div>
    </Card>
  )
}

class LabelsPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  componentDidMount() {
    const headers = {
      'Authorization': `Bearer ${this.props.user.accessToken}`
    };
    axios.get(`https://antoine.api.foundaml.org/labels`, { headers: headers })
      .then(r => {
        this.setState( {
			    labels: r
        });
      });
  }

  render() {
    let mainContent;
    if(this.state.labels) {
      console.log(this.state);
      const labelsComponents = this.state.labels.data.map(label=> 
        <Label labels={label}/>
      )
      mainContent = (
        <div>
          <h1> Labels </h1>
          { labelsComponents }
        </div>
      )
    } else {
      mainContent = <div> </div>
    }

    return (
      <div>
        <Button className="rightButton" rightIcon="arrow-right" intent="success">Create</Button>
        { mainContent }
      </div>
    )
  }
	
}

export default LabelsPage;
