import React, { Component } from 'react';
import {
  WebView,
  View,
} from 'react-native';
import HTML from "./progress.html"
import Color from "../../utils/colors"

var injectedCode="";
class MXprogressLine extends Component {

  componentWillMount(){
    injectedCode = ` 
var line = new ProgressBar.Line('#progress', {
        color: '`+this.props.color+`',
        duration: 3000,
        easing: 'easeInOut'
    });

    line.animate(1);
        `;

  }

  render() {
    return (<View style={{height:3,}}>
    <WebView 
    injectedJavaScript={injectedCode}
    baseURL="/"  source={HTML} />
            </View>
    );
  }
}

MXprogressLine.defaultProps = {
  color: Color.BLUE[700]
};

export default MXprogressLine
