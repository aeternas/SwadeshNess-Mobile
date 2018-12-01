// Ivan Golikov

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, TextInput, Button, ScrollView, Text} from 'react-native';
import {TranslationService} from '../services/TranslationService.js';
import {TranslationTableView} from '../components/views/TranslationTableView.js';
import {RoundedButtonStack} from '../components/views/RoundedButtonStack.js';

export class TranslationScene extends React.Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      textToTranslate: '',
      translationResult: [],
      groups: [],
    };
    this.service = new TranslationService();
  }

  componentDidMount() {
    this.getGroups();
  }

  getGroups() {
    this.service.getGroups(groupsResponse => {
      this.setState({
        groups: groupsResonse.map(group => {
          return group.name;
        }),
      });
    });
  }

  translate(parameters) {
    this.service.translate(parameters, cb => {
      this.setState({
        translationResult: cb.map((value, index, array) => {
          return {
            title: value.name,
            data: value.results.map(result => {
              return result.name + ' - ' + result.translation;
            }),
          };
        }),
      });
    });
  }

  render() {
    return (
      <ScrollView scrollEnabled={false}>
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
        <TranslationTableView
          translationSections={this.state.translationResult}
        />
        <RoundedButtonStack groups={this.state.groups} />
      </ScrollView>
    );
  }
}
