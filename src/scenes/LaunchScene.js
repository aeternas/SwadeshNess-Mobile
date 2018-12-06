//  Ivan Golikov 2018

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Alert, StyleSheet, Button, View} from 'react-native';
import {TranslationScene} from '../scenes/TranslationScene.js';

export class LaunchScene extends React.Component {
  static propTypes = {
    route: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }),
    navigator: PropTypes.object.isRequired,
  };
  constructor(props, context) {
    super(props, context);
    this._onPressButton = this._onPressButton.bind(this);
  }

  _onPressButton() {
    this.props.navigator.push({
      component: TranslationScene,
      title: 'Translation',
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button
            onPress={this._onPressButton}
            title="Proceed to translation"
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    margin: 20,
  },
});
