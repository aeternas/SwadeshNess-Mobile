import React, {Component} from 'react';
import {AppRegistry, SectionList, StyleSheet, Text, View} from 'react-native';

class TranslationTableView extends Component {
  constructor(props) {
    super(props);
    this.state = {sections: []};
  }
  render() {
    return (
      <View style={styles.container}>
        <SectionList
          sections={this.state.sections}
          renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
          renderSectionHeader={({section}) => (
            <Text style={styles.sectionHeader}>{section.title}</Text>
          )}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export {TranslationTableView};
