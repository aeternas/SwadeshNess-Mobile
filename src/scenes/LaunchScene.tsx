//  Ivan Golikov 2018

import React, {Component} from 'react';
import {Alert, StyleSheet, Button, View, NavigatorIOS} from 'react-native';
import {TranslationScene} from './TranslationScene';

interface Props {
  route: {title: string}
  navigator: NavigatorIOS
}

export class LaunchScene extends React.Component<Props> {
  constructor(props: Props, context: any) {
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
