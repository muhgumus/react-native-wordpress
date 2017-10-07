/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  WebView,
  View
} from 'react-native';
import Color from "../utils/colors"
import Icon from 'react-native-vector-icons/MaterialIcons';
import Progress from "./MXprogressLine"

export default class MXwebview extends Component {
       constructor(props) {
        super(props);
        this.state = {loading:true,}
    }
  render() {
    return (
      <View style={styles.container}>
       {this.state.loading ?  <Progress color={this.props.progressColor? this.props.progressColor : Color.GREY[500]} /> : null}
            <WebView
                    source={this.props.source}
                    onLoad={()=> {this.setState({loading:false})}}
                    startInLoadingState
         />
       </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
},
});
