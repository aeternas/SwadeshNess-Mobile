//  Ivan Golikov 2018

import React, {Component} from 'react';
import {Alert, StyleSheet, Button, View} from 'react-native';

export default class App extends Component {
	_onPressButton() {
		Alert.alert("Should navigate to next screen")
	}

	render() {
		return (
			<View style={styles.container}>
			  <View style={styles.buttonContainer}>
			    <Button
			      onPress={this._onPressButton}
			      title="Proceed to translation screen"
			    />
			  </View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
  },
  buttonContainer: {
    margin: 20
  },
});	

