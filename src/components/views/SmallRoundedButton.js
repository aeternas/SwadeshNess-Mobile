import React from 'react';
import {TouchableOpactiry, StyleSheet, Text} from 'react-native';

class SmallRoundedButton extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.buttonContainer} onPress={this.signIn}>
        <Text style={styles.button}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}

SmallRoundedButton.defaultProps = {
  title: '',
};

const BORDER_RADIUS = 20;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: BORDER_RADIUS,
    height: 50,
    borderColor: 'black',
    borderRadius: 25,
    margin: 2,
    justifyContent: 'center',
    backgroundColor: 'coral',
  },
});

export {SmallRoundedButton};
