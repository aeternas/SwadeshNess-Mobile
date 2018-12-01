// Ivan Golikov

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, TextInput, Button, ScrollView, Text} from 'react-native';
import {TranslationService} from '../services/TranslationService.js';
import {TranslationTableView} from '../components/views/TranslationTableView.js';
import {RoundedButtonStack} from '../components/views/RoundedButtonStack.js';

class TranslationScene extends React.Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      textToTranslate: '',
      translationResult: [],
      groups: [],
      selectedGroup: '',
    };
    this.service = new TranslationService();
  }

  componentDidMount() {
    this.getGroups();
  }

  getGroups() {
    this.service.getGroups(groupsResponse => {
      this.setState({
        isLoading: false,
        groups: groupsResponse.map(group => {
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

  renderGroups() {
    if (this.state.isLoading) {
      return <View />;
    } else {
      return (
        <RoundedButtonStack style={{flex: 1}} groups={this.state.groups} />
      );
    }
  }

  render() {
    return (
      <ScrollView scrollEnabled={false}>
        {this.renderGroups()}
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
      </ScrollView>
    );
  }
}

export {TranslationScene};
