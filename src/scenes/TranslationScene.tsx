// Ivan Golikov

import React, {Component} from 'react';
import {
  View,
  ActivityIndicator,
  TextInput,
  Button,
  ScrollView,
  Text,
  Switch,
  StyleSheet,
} from 'react-native';
import {
  TranslationRequest,
  TranslationResult,
  LanguageTranslationResult,
} from '../interfaces/models/TranslationTypes';
import {TranslationService} from '../services/TranslationService';
import {TranslationTableView} from '../components/views/TranslationTableView';

interface Props {
  navigator: any;
}

interface Tran4ddslationResult {
  name: string;
  translation: string;
}

interface State {
  isLoadingTranslation: Boolean;
  isLoadingGroups: Boolean;
  textToTranslate: string;
  translationResult: any[];
  groups: string[];
  selectedGroups: string[];
}

class TranslationScene extends React.Component<Props, State> {
  service: TranslationService;

  constructor(props: Props) {
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

  async getGroups() {
    const groups = await this.service.getGroups();
    this.setState({
      isLoadingGroups: false,
      groups: groups.map(group => {
        return group.name;
      }),
    });
  }

  async translate(parameters: TranslationRequest) {
    let translationResults = await this.service.translate(parameters);
    this.setState({
      isLoadingTranslation: false,
      translationResult: translationResults.results.map(
        (value: TranslationResult) => {
          return {
            title: value.name,
            data: value.results.map((result: LanguageTranslationResult) => {
              return result.name + ' - ' + result.translation;
            }),
          };
        },
      ),
    });
  }

  getTranslationRequest(): TranslationRequest {
    this.setState({isLoadingTranslation: true});
    var request = {
      word: this.state.textToTranslate,
      groups: this.state.selectedGroups,
    };
    return request;
  }

  _renderGroupSwitches = () => {
    return this.state.groups.map((languageGroup, index) => {
      return (
        <Switch
          style={styles.switch}
          key={languageGroup}
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
          <Text style={styles.switchText}>{languageGroup}</Text>
        </Switch>
      );
    });
  };

  _renderGroups = () => {
    if (this.state.isLoadingGroups) {
      return <ActivityIndicator />;
    } else {
      return this._renderGroupSwitches();
    }
  };

  _renderTranslation = () => {
    if (this.state.isLoadingTranslation) {
      return <ActivityIndicator />;
    } else if (this.state.translationResult.length == 0) {
      return <View />;
    } else {
      return (
        <TranslationTableView
          translationSections={this.state.translationResult}
        />
      );
    }
  };

  _selectDeselectGroups = () => {
    return this.state.selectedGroups.length > 0 ? [] : this.state.groups;
  };

  _renderEnvLabel = () => {
    let branchEnv = `${process.env['CUSTOM_PUSH_BRANCH']}`;
    let envText = branchEnv == 'master' ? '' : branchEnv;
    return (
      <View style={styles.envLabel}>
        <Text>{envText}</Text>
      </View>
    );
  };

  render() {
    return (
      <ScrollView>
        {this._renderEnvLabel()}
        <TextInput
          style={styles.textInput}
          placeholder="Type here to translate!"
          onChangeText={text => this.setState({textToTranslate: text})}
        />
        <Button
          disabled={this.state.selectedGroups.length == 0} //buttonStyle={{marginTop: 20}}
          title="Translate!"
          onPress={() => this.translate(this.getTranslationRequest())}
        />
        {this._renderTranslation()}
        {this._renderGroups()}
        <Button
          title="Select/Deselect all"
          onPress={() =>
            this.setState({selectedGroups: this._selectDeselectGroups()})
          }
        />
        <View style={{height: 50}} />
      </ScrollView>
    );
  }
}

export {TranslationScene};

const styles = StyleSheet.create({
  switch: {
    flexDirection: 'row',
    flex: 1,
    marginLeft: 15,
    height: 40,
    width: 100,
  },
  switchText: {
    left: 70,
    top: 5,
  },
  textInput: {
    marginTop: 20,
    height: 40,
    textAlign: 'center',
  },
  envLabel: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginTop: 8,
    marginRight: 8,
  },
});
