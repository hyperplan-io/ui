import React from 'react';

import Labels from '../Labels/Labels';

import { getLabelsById } from '../../utils/Api';

class LabelPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    document.title = 'Labels - Hyperplan';
    const labelsId = this.props.match.params.labelsId;
    getLabelsById(labelsId, this.props.user.accessToken, this.props.invalidateToken).then(label => {
      this.setState({
        labels: label,
      });
    });
  }

  render() {
    if (this.state.labels) {
      return <Labels labels={this.state.labels} />;
    } else {
      return <div></div>;
    }
  }
}

export default LabelPage;
