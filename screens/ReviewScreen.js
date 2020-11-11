import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, ScrollView, Linking } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
class ReviewScreen extends Component {

  static navigationOptions = ({navigation}) => {
    return {
      title: 'Review Jobs',
      //headerLeft:<View style={{padding: 2}}></View>,
      headerRight: (
        <Button
        title="Settings"
        onPress={() => navigation.navigate('settings')}
        buttonStyle= {{  backgroundColor: "rgba(0,0,0,0)" }}
        titleStyle= {{ color: "rgba(0, 122, 255, 1)" }}
        />
      )
    }
  }

  renderLikedJobs() {
    return this.props.likedJobs.map(job => {
      const {
        company, formattedRelativeTime, url,
        longitude, latitude,longitudeDelta,latitudeDelta, jobtitle, jobkey
      } = job;
      const initialRegion = {
        longitude,
        latitude,
        latitudeDelta: 0.045,
        longitudeDelta: 0.02
      };

      return (
        <Card title= {jobtitle} key={jobkey}>
          <View style={{ height: 200 }}>
            <MapView
              style={{ flex: 1 }}
              scrollEnabled={false}
              cacheEnabled={Platform.OS === 'android' ? true: false }
              initialRegion={initialRegion}
            />
            <View style={styles.detailWrapper}>
              <Text style={styles.italics}>{company}</Text>
              <Text style={styles.italics}>{formattedRelativeTime}</Text>
            </View>
            <Button
              title="Apply Now!"
              backgroundColor="#03A9F4"
              onPress={() => Linking.openURL(url)}
              />
          </View>
        </Card>
      );
    });
  }

  render() {
    return (
      <ScrollView>
        {this.renderLikedJobs()}
      </ScrollView>
    );
  }
}

const styles = {
  italics: {
    fontStyle: 'italic'
  },
  detailWrapper: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
}

function mapStateToProps(state) {
  return { likedJobs: state.likedJobs };
}

export default connect(mapStateToProps)(ReviewScreen);
