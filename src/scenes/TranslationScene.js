// Ivan Golikov

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, TextInput, Button, ScrollView, Text, Switch} from 'react-native';
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
      selectedGroups: [],
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

  getTranslationRequest() {
    var request = {
      word: this.state.textToTranslate,
      groups: this.state.selectedGroups,
    };
    return request;
  }

  renderGroups() {
    if (this.state.isLoading) {
      return <View />;
    } else {
      return this.state.groups.map((languageGroup, index, array) => {
        return (
          <Switch
            style={({flexDirection: 'row'}, {flex: 1}, {height: 50})}
            key={index}
            onValueChange={value => {
              var array = this.state.selectedGroups;
              array.splice(index, 0, languageGroup);
              this.setState({selectedGroups: array});
            }}
            value={languageGroup == this.state.selectedGroup}>
            <Text style={{left: 70}}>{languageGroup}</Text>
          </Switch>
        );
      });
    }
  }

  render() {
    return (
      <ScrollView>
        <View style={{height: 16}} />
        <TextInput
          style={{height: 40}}
          textAlign="center"
          placeholder="Type here to translate!"
          onChangeText={text => this.setState({textToTranslate: text})}
        />
        <Button
          title="Translate!"
          onPress={() => this.translate(this.getTranslationRequest())}
        />
        <TranslationTableView
          translationSections={this.state.translationResult}
        />
        {this.renderGroups()}
      </ScrollView>
    );
  }
}

export {TranslationScene};
