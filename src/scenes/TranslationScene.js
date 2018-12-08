// Ivan Golikov

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ActivityIndicator,
  TextInput,
  Button,
  ScrollView,
  Text,
  Switch,
} from 'react-native';
import {TranslationService} from '../services/TranslationService.js';
import {TranslationTableView} from '../components/views/TranslationTableView.js';

class TranslationScene extends React.Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoadingTranslation: false,
      isLoadingGroups: true,
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
        isLoadingGroups: false,
        groups: groupsResponse.map(group => {
          return group.name;
        }),
      });
    });
  }

  translate(parameters) {
    this.service.translate(parameters, cb => {
      this.setState({
        isLoadingTranslation: false,
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
    this.setState({isLoadingTranslation: true});
    var request = {
      word: this.state.textToTranslate,
      groups: this.state.selectedGroups,
    };
    return request;
  }

  renderGroups() {
    if (this.state.isLoadingGroups) {
      return <ActivityIndicator />;
    } else {
      return this.state.groups.map((languageGroup, index, array) => {
        return (
          <Switch
            style={({flexDirection: 'row'}, {flex: 1}, {height: 50})}
            key={index}
            onValueChange={value => {
              var array = this.state.selectedGroups;
              if (value == false) {
                array = array.filter(el => el != languageGroup);
              } else {
                array.splice(index, 0, languageGroup);
              }
              this.setState({selectedGroups: array});
            }}
            value={this.state.selectedGroups.includes(languageGroup)}>
            <Text style={{left: 70}}>{languageGroup}</Text>
          </Switch>
        );
      });
    }
  }

  renderTranslation() {
    if (this.state.isLoadingTranslation) {
      return <ActivityIndicator />;
    } else if (this.state.translationResult.length == false) {
      return <View />;
    } else {
      return (
        <TranslationTableView
          style={{keyboardDismissMode: 'on-drag'}}
          translationSections={this.state.translationResult}
        />
      );
    }
  }

  render() {
    return (
      <ScrollView style={{keyboardDismissMode: 'on-drag'}}>
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
        {this.renderTranslation()}
        {this.renderGroups()}
      </ScrollView>
    );
  }
}

export {TranslationScene};
