import React from 'react';

import Labels from '../Labels/Labels';

class LabelPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {
    const labelsId = this.props.match.params.labelsId;
    const headers = {
      'Authorization': `Bearer ${this.props.user.accessToken}`
    };
    fetch(
      `/labels/${labelsId}`,
      {
        headers: headers,
        method: "GET",
      }
    ).then(res => {
      res.json().then(body => {
        this.setState( {
          labels: body
        })
      })
    });
  }

  render() {
    if(this.state.labels) {
      return (
        <Labels labels={this.state.labels} />
      )
    } else {
      return (
        <div>

        </div>
      )
    }
    
  }
}

export default LabelPage;
