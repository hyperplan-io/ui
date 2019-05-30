import React from 'react';
import axios from 'axios';

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
    axios.get(`https://antoine.api.foundaml.org/labels/${labelsId}`, { headers: headers })
      .then(r => {
        this.setState( {
			    labels: r.data
		    });
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
