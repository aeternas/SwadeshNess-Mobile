// Ivan Golikov

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, TextInput, Button, ScrollView, Text} from 'react-native';
import {TranslationService} from '../services/TranslationService.js';
import {TranslationTableView} from '../components/views/TranslationTableView.js';

export class TranslationScene extends React.Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      textToTranslate: '',
      translationResult: [],
    };
    this.service = new TranslationService();
  }

  translate(parameters) {
    this.service.translate(parameters, cb => {
      console.error(cb);
    });
  }

  render() {
    return (
      <ScrollView scrollEnabled={false}>
        <View style={{padding: 10}}>
          <TextInput
            style={{height: 40}}
            textAlign="center"
            placeholder="Type here to translate!"
            onChangeText={text => this.setState({textToTranslate: text})}
          />
          <Button
            title="Translate!"
            onPress={() => this.translate(this.state.textToTranslate)}
          />
        </View>
        <TranslationTableView />
        <View>
          <Text>{this.state.translationResult}</Text>
        </View>
      </ScrollView>
    );
  }
}
