import React, { Component,PropTypes, } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
  Platform
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from "redux"
import { ActionCreators } from "../redux/actions"
import Icon from 'react-native-vector-icons/MaterialIcons';
import Color from "../utils/colors"

const Button =  TouchableOpacity;

class MXheader extends Component {
  constructor(props){
    super(props)
    this._pressBack = this._pressBack.bind(this)
    this._pressMenu = this._pressMenu.bind(this)
    this._pressSearch = this._pressSearch.bind(this)
  }

 componentWillReceiveProps(props) {
    // Do something with props...
  }

_pressBack(){
  this.props.navigation.goBack(null)
}

_pressMenu(){
  this.props.drawer.openDrawer();
}

_pressSearch(){
    this.props.setCustomEvent({search:true});
    this.props.navigation.navigate("PostList",{color:this.props.color, strings:this.props.strings});
}

  render() {
    return (
      this.props.header.visible  ?
                <View style={[styles.header, {backgroundColor:this.props.color}]}>
                <View style={styles.left}>
                  {this.props.header.backVisible ? 
                    <Button style={styles.button} underlayColor={Color.BLUE[500]+'bb'}  onPress={this._pressBack}>
                        <Icon name="arrow-back" size={30} color={Color.WHITE} />
                    </Button>
                    :
                    <Button style={styles.button} underlayColor={Color.BLUE[500]+'bb'}  onPress={this._pressMenu}>
                        <Icon name="menu" size={30} color={Color.WHITE} />
                    </Button>
                }
                  </View>
                    <View style={styles.center}>
                    {this.props.children !=null ? this.props.children : 
                    <Text style={styles.title}>{this.props.header.title}</Text>}
                  </View>
                    
                    {this.props.children ==null ? 
                  <View style={styles.right}>
                    {this.props.header.searchVisible  ? 
                    <Button style={styles.button} underlayColor={Color.BLUE[500]+'bb'}  onPress={this._pressSearch}>
                        <Icon name="search" size={30} color={Color.WHITE} />
                    </Button>
                    :
                    null
                }
                  </View>

                  : <View style={{width:10,}} />
                    }
                  
                   
                </View>
                : null
      
    );
  }
}

const styles = StyleSheet.create({
  title: {
    color:Color.WHITE,
    fontSize:20,
    fontWeight:'bold',
    fontFamily: (Platform.OS === 'ios' ) ? 'HelveticaNeue' : 'Roboto',
  }, 
  left: {
    width:48,
    alignItems:'flex-start',
  }, 
   center: {
    flex:1,
    flexWrap:'wrap',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
  }, 
  button: {
    flex:1,
    padding:10,
    justifyContent:'center'
  }, 
  right: {
    width:48,
    alignItems:'flex-end',
  },
  header: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingTop:(Platform.OS == 'ios') ? 0: 0,
    height:(Platform.OS === 'ios' ) ? 55 : 55,
    backgroundColor:Color.BLUE[700],
    elevation:5,
    borderBottomWidth:Platform.OS=='ios' ? 1 : 0,
    borderColor: 'rgba(0,0,0,0.1)',
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.5,
  },
});
MXheader.defaultProps = {
  color: Color.BLUE[700]
};



function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MXheader)