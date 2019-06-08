import React from 'react';

import Features from '../Features/Features';
import { getFeaturesById }  from '../../utils/Api';

class FeaturePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {
    const featuresId = this.props.match.params.featuresId;
    getFeaturesById(
      featuresId, 
      this.props.user.accessToken, 
      this.props.invalidateToken
    ).then(features => {
      this.setState( {
        features: features 
      })
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
