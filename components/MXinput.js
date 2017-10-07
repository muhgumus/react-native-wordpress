/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  Platform,
  View
} from 'react-native';
import Color from "../utils/colors"
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class MyInput extends Component {
  render() {
      var iconColor=this.props.iconColor ? this.props.iconColor : Color.BLUEGREY[800];
    return (
      <View style={[styles.container,this.props.style]}>
      {this.props.icon ?
      <Icon name={this.props.icon} color={iconColor} size={28}  />
      : null
  }
      <TextInput style={[styles.text,this.props.textStyle]} 
      placeholder={this.props.placeholder} 
      placeholderTextColor={this.props.placeholderTextColor ? this.props.placeholderTextColor : Color.BLUEGREY[900]+"bb"}
      onChangeText={this.props.onChangeText}
      onEndEditing={this.props.onEndEditing}
      underlineColorAndroid="transparent"
      />
       </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height:42,
    flexDirection:'row',
    alignItems:'center',
    backgroundColor: '#fff',
    borderRadius:2,
    elevation:2,
    borderWidth:Platform.OS=='ios' ? 1 : 0,
    borderColor:'#ccc',
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0,
    shadowRadius: 3,
    paddingLeft:5,
},
text:{
    flex:1, 
    marginLeft:5,
    fontSize:16,
    color:Color.BLUEGREY[900],
},
});
