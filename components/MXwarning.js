import React, { Component } from 'react';
import { connect } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Color from "../utils/colors"


var warningColor = Color.BLUEGREY[400];
export default class Warning extends Component {
  constructor(props) {
    super(props)

    if (this.props.error)
      warningColor = Color.RED[600]
    else
      warningColor = Color.BLUEGREY[400];
  }


  render() {
    return (<View style={[styles.container, this.props.style]} >
      <View style={{
        backgroundColor: '#fff',
        width: 300,
        height: 360,
        borderRadius: 2,
        elevation: 1,
        marginVertical: 5,
        marginHorizontal: 10,
        borderWidth: 0,
        shadowColor: '#ccc',
        shadowOffset: { width: 2, height: 2, },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        paddingBottom: 10,
      }}>
        <View style={{
          flexDirection:'column',
          flex:1,
          justifyContent: 'center',
          alignItems: 'center',}}>
          <View style={{ flexDirection:'row', flex: 1, backgroundColor:Color.GREY[50], borderBottomColor:Color.GREY[200], borderBottomWidth:1, borderRadius:2, }}>
          <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Icon name="thumb-down" size={64} color={Color.AMBER[800]} />
            </View>
          </View>
          <View style={{ flex: 1, alignItems:'center', justifyContent:'center', paddingHorizontal:10 }}>
            {this.props.title ? <Text style={styles.event_title}>{this.props.title}</Text> : null}
            {this.props.description ? <Text style={styles.event_description}>{this.props.description}</Text> : null}
            <TouchableOpacity style={{
              backgroundColor: this.props.color ? this.props.color : Color.BLUE[700],
              height: 36,
              padding: 5,
              paddingHorizontal: 15,
              marginTop: 10,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 18,
              borderWidth: 0,
            }} onPress={this.props.refreshPage}>
              <Text style={{ color: '#fff' }}>{this.props.buttonText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 2,
    marginVertical: 5,
    marginHorizontal: 10,
    borderWidth: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  event_title: {
    margin: 10,
    fontSize: 22,
    color: Color.BLUEGREY[800],
  },
  event_description: {
    marginBottom: 10,
    color: Color.BLUEGREY[800],
    fontSize: 14,
  },
});
