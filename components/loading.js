import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  WebView
} from 'react-native';
import * as svg from '../utils/svgutil'


export default class Loading extends Component {
  render() {
    return (
      <View style={styles.loading}>
      <WebView scalesPageToFit={true} style={styles.loadingIcon}
          source={{html: svg.spin}}
          scalesPageToFit={true}
        />
        </View>
    );
  }
}

const styles = StyleSheet.create({ 
  loading:{
    flex:1,
       flexDirection:'column', 
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingIcon:{
        width:110,
        height:110,
    },
});
