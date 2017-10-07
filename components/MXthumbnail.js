import React, { Component } from 'react';
import {
  Image,
} from 'react-native';
import Color from "../utils/colors"

export default class Page extends Component {
  render() {
    return (
        <Image {...this.props} style={{width:this.props.size, height:this.props.size, borderRadius:this.props.size/2}} />
    );
  }
}
