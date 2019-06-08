import React from 'react';
import './LabelsPage.css';
import { Button, Card, H5 } from "@blueprintjs/core";

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
    this.handleCreateLabels = this.handleCreateLabels.bind(this);
  }

  componentDidMount() {
    const headers = {
      'Authorization': `Bearer ${this.props.user.accessToken}`
    };
    fetch(
      "/labels",
      {
        headers: headers,
        method: "GET",
      }
    ).then(res => {
      res.json().then(body => {
        console.log(body)
        this.setState( {
          labels: body
        })
      })
    });
  }

  handleCreateLabels() {
    this.props.history.push('createLabels');
  }

  render() {
    let mainContent;
    if(this.state.labels) {
      const labelsComponents = this.state.labels.map(label=> 
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
        <Button onClick={this.handleCreateLabels} className="rightButton" rightIcon="arrow-right" intent="success">Create</Button>
        { mainContent }
      </div>
    )
  }
	
}

export default LabelsPage;
