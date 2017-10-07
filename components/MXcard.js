import React, { Component } from 'react';
import { connect } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableNativeFeedback,
  TouchableHighlight,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Color from "../utils/colors"
import Thumbnail from "./MXthumbnail"
import HTMLView from 'react-native-htmlview';

const Button = Platform.OS == "android" ? TouchableNativeFeedback : TouchableHighlight

export default class MXcard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      events: [],
      startLoadPrefetched: false,
      mountTime: new Date(),}
  }


  render() {
    return (<View style={[styles.container,this.props.style]} >
      {this.props.children ? this.props.children :
      <Button underlayColor={Color.GREY[100] + 'cc'} onPress={this.props.onPress}>
        <View style={{paddingBottom:5}}>
        {this.props.item.imageSource ? 
            <Image style={{ resizeMode: 'cover', width:null, height: 200, }}
            source={this.props.item.imageSource}
             /> : <View style={{height:10,}}/> 
            }
            <View style={{marginHorizontal:10,marginTop:5,}}>
            <HTMLView 
            value={"<p1>"+this.props.item.title+"</p1>"}
            stylesheet={htmlStyles}
          />
          {this.props.item.description ?  
            <HTMLView   
            style={{marginTop:5,}}
            value={"<p2>"+this.props.item.description.replace(/(\r\n|\n|\r)/gm,"")+"</p2>"}
            stylesheet={htmlStyles}
          /> : null }
          
          </View>
        </View>
      </Button>
      }
    </View>
    );
  }
}

const htmlStyles = StyleSheet.create({
  p1:{ fontSize:22, color:Color.GREY[800]},
  p2:{fontSize:14, color:Color.GREY[700]},
  a: {
    fontWeight: '300',
    color: '#FF3366', // make links coloured pink
  },
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    borderRadius: 2,
    elevation: 2,
    marginVertical: 5,
    marginHorizontal: 10,
    borderWidth: 0,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 1,
    shadowRadius: 3,
    paddingBottom:10,
  },
  event_header:{
    flexDirection:'row',
    alignItems:'center',
    marginHorizontal:10,
    marginTop:5,
  },
   event_title:{
    fontSize:22,
  },
  event_description:{
    marginTop:5,
      marginBottom:10,
      fontSize:14,
  },
});
