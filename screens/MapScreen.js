import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';
import { Button, Input, Icon } from 'react-native-elements';
import * as actions from '../actions';

class MapScreen extends Component {
  static navigationOptions = {
    title: 'Map',
    tabBarIcon: ({ tintColor }) => {
        return <Icon name="my-location" size={30} color={tintColor}/>
      }
    }


  state = {
    mapLoaded: false,
    jobname: '',
    region: {
      longitude: -122,
      latitude: 37,
      longitudeDelta: 0.04,
      latitudeDelta: 0.09
    }
  }

  componentDidMount() {
    this.setState({ mapLoaded: true });
  }

  //onRegionChange = (region) => {
    //this.setState({ region });
  //  console.log(region)
//  }

  onRegionChangeComplete = (region) => {
    console.log(region)
    this.setState({ region });

  }

  onButtonPress = () => {
    this.props.fetchJobs(this.state.region, this.state.jobname, this.props.navigation.navigate('deck'));
  }

  render() {
    if (!this.state.mapLoaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      )
    }

    return (
      <View style={{ flex: 1 }}>
      <View style={{ marginTop: 30 }}>
        <Input
          style={styles.inputStyle}
          placeholder="Enter Job Title"
          value={this.state.jobname}
          onChangeText={jobname => this.setState({ jobname })}
        />
      </View>
        <MapView
          region={this.state.region}
          style={{ flex: 1 }}
    //      onRegionChange={this.onRegionChange}
          onRegionChangeComplete={this.onRegionChangeComplete}
        />
        <View style={styles.buttonContainer}>
          <Button
            large
            title="Search this Area"
            backgroundColor="#009688"
            icon={{ name: 'search' }}
            onPress={this.onButtonPress}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  inputStyle: {
    marginTop: 10,
    left: 0,
    right: 0
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0
  }
};

export default connect(null, actions)(MapScreen);
