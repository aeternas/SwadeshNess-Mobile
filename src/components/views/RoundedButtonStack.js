import React from 'react';
import {View, Text} from 'react-native';
import {SmallRoundedButton} from './SmallRoundedButton.js';

class RoundedButtonStack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGroup: '',
    };
  }

  updateSelectedGroup(group) {
    this.setState({
      selectedGroup: group,
    });
  }

  render() {
    return this.props.groups.map((value, index, array) => {
      return <SmallRoundedButton key={index} title={value} />;
    });
  }
}

export {RoundedButtonStack};
