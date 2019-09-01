//  Ivan Golikov 2018

import React, {Component} from 'react';
import {Alert, StyleSheet, Button, View, NavigatorIOS} from 'react-native';
import {TranslationScene} from './TranslationScene';

interface Props {
  route: {title: string};
  navigator: NavigatorIOS;
}

export class LaunchScene extends React.Component<Props> {
  constructor(props: Props, context: any) {
    super(props, context);
    this._onPressTranslationButton = this._onPressTranslationButton.bind(this);
  }

  _onPressTranslationButton(): void {
    this.props.navigator.push({
      component: TranslationScene,
      title: 'Translation',
    });
  }

  _renderButton = (title: string, handler: () => void): React.ReactElement => {
    return (
      <Button onPress={handler} title={title} />
    );
  };

  _renderTranslationButton = (): React.ReactElement => {
    return this._renderButton("Proceed to translation", this._onPressTranslationButton);
  };

  _renderAddCachedWord = (): React.ReactElement => {
    return this._renderButton("Add word to cache", () => {});
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          {this._renderTranslationButton()}
          {this._renderAddCachedWord()}
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
