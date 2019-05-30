import React from 'react';
import axios from 'axios';

import Features from '../Features/Features';

class FeaturePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {
    const featuresId = this.props.match.params.featuresId;
    const headers = {
      'Authorization': `Bearer ${this.props.user.accessToken}`
    };
    axios.get(`https://antoine.api.foundaml.org/features/${featuresId}`, { headers: headers })
      .then(r => {
        this.setState( {
			    features: r.data
		    });
      });
  }

  render() {
    if(this.state.features) {
      return (
        <Features features={this.state.features} />
      )
    } else {
      return (
        <div>

        </div>
      )
    }
    
  }
}

export default FeaturePage;
