import React from 'react';

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
    fetch(
      `/features/${featuresId}`,
      {
        headers: headers,
        method: "GET",
      }
    ).then(res => {
      res.json().then(body => {
        this.setState( {
          features: body
        })
      })
    }).catch((err) => {
        if(err.response) {
          if(err.response.status === 401) {
            localStorage.setItem('isAuthenticated', false);
          }
        } else if(err.request) {

        } else {

        }
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
