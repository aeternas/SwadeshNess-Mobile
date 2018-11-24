// Ivan Golikov

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, TextInput, Button, ScrollView} from 'react-native';
import {TranslationService} from '../services/TranslationService.js';

export class TranslationScene extends React.Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {translationResult: ''};
    this.service = new TranslationService();
  }

  translate = () => {
    this.service.translate('smth');
  };

  render() {
    return (
      <ScrollView scrollEnabled={false}>
        <View style={{padding: 10}}>
          <TextInput
            style={{height: 40}}
            textAlign="center"
            placeholder="Type here to translate!"
          />
          <Button title="Translate!" onPress={this.translate} />
        </View>
      </ScrollView>
    );
  }
}
