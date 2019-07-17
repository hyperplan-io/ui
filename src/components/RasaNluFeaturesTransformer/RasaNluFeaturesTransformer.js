import React from 'react';

import { Card, HTMLSelect, InputGroup, H5 } from '@blueprintjs/core';

import { getFeaturesById } from '../../utils/Api';

class RasaNluFeaturesTransformer extends React.Component {
  constructor(props) {
    super(props);
    this.handleJoinCharacterChange = this.handleJoinCharacterChange.bind(this);
    this.handleFeatureQueryChange = this.handleFeatureQueryChange.bind(this);
    this.fetchFeaturesRecursively = this.fetchFeaturesRecursively.bind(this);

    this.state = {
      featureQuery: this.props.features[0],
    };

    console.log(this.props.features);
    this.state = {
      featureNames: new Set([]),
    };
  }

  fetchFeaturesRecursively(prefix, id) {
    console.log(`prefix is ${prefix}`);
    console.log(`id is ${id}`);
    getFeaturesById(id, this.props.accessToken, this.props.invalidateToken).then(features => {
      features.data.forEach(feature => {
        if (feature.type !== 'String' && feature.type !== 'Float' && feature.type !== 'Int') {
          console.log(`re fetching because type is ${feature.type}`);
          this.fetchFeaturesRecursively(feature.name, feature.type);
        } else {
          const featureName = `${prefix}.${feature.name}`;
          console.log(featureName);
          this.setState(prevState => ({
            featureNames: new Set(prevState.featureNames).add(featureName),
            featureQuery: featureName,
          }));
          this.props.handleFeatureQueryChange(featureName);
        }
      });
    });
  }

  componentDidMount() {
    this.props.features.data.forEach(feature => {
      if (feature.type !== 'String' && feature.type !== 'Float' && feature.type !== 'Int') {
        const featureName = feature.name;
        const featureType = feature.type;
        this.fetchFeaturesRecursively(featureName, featureType);
      } else {
        // primitive
        const featureName = feature.name;
        console.log(featureName);
        this.setState(prevState => ({
          featureNames: new Set(prevState.featureNames).add(featureName),
          featureQuery: featureName,
        }));
        this.props.handleFeatureQueryChange(featureName);
      }
    });
  }

  handleJoinCharacterChange(event) {
    this.props.handleJoinCharacterChange(event.target.value);
    const joinCharacter = event.target.value;
    this.setState(_ => ({
      joinCharacter: joinCharacter,
    }));
  }

  handleFeatureQueryChange(event) {
    this.props.handleFeatureQueryChange(event.target.value);
    const featureQuery = event.target.value;
    this.setState(_ => ({
      featureQuery: featureQuery,
    }));
  }

  render() {
    const values = [...this.state.featureNames];
    return (
      <div>
        <Card>
          <H5> Features transformer </H5>
          <InputGroup
            onChange={this.handleJoinCharacterChange}
            placeholder="Join character (required)"
          />
          <br />
          <HTMLSelect
            options={values}
            onChange={this.handleFeatureQueryChange}
            value={this.state.featureQuery}
          ></HTMLSelect>
          <br />
        </Card>
      </div>
    );
  }
}

export default RasaNluFeaturesTransformer;
