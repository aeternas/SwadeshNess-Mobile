import React from 'react';
import {View, Text} from 'react-native';
import {SmallRoundedButton} from './SmallRoundedButton.js';

class RoundedButtonStack extends React.Component {
  render() {
    return this.props.groups.map((value, index, array) => {
      <SmallRoundedButton key={index} title={value} />;
    });
  }
}

export {RoundedButtonStack};
