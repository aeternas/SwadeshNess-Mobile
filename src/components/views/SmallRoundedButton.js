import React, {Component} from 'react';
import {TouchableOpactiry, StyleSheet} from 'react-native';

class SmallRoundedButton {
  render() {
    return (
      <TouchableOpacity style={styles.buttonContainer} onPress={this.signIn}>
        <Text style={styles.button}>Sign in</Text>
      </TouchableOpacity>
    );
  }
}

const BORDER_RADIUS = 20;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: BORDER_RADIUS,
    height: 50,
    borderColor: black,
    borderRadius: 25,
    margin: 2,
    justifyContent: 'center',
    backgroundColor: coral,
  },
});

export {SmallRoundedButton};
