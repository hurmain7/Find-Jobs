import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Icon from 'react-native-vector-icons/FontAwesome';

class SettingsScreen extends Component {

  static navigationOptions = ({navigation}) => {
    return {
      headerLeft: (
        <Button
          title="Review Jobs"
          large
          type="clear"
          onPress={() => navigation.navigate('review')}
          icon={
            <Icon
            name="arrow-left"
            size={15}
            color="#008CBA"
            />
          }
      />
      )
    }
  }

  render() {
    return (
      <View>
        <Button
          title="Reset liked Jobs"
          large
          onPress={this.props.clearLikedJobs}
          icon= {{ name: 'delete-forever' }}
          buttonStyle={styles.button}
      />
      </View>
    );
  }
}

const styles = {
  button: {
    backgroundColor: "#F44336"
  }
}

export default connect(null, actions)(SettingsScreen);
