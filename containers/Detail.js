import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    TouchableNativeFeedBack,
    Platform,
    Image,
    ActivityIndicator,
} from 'react-native';

import { connect } from "react-redux";
import { bindActionCreators } from "redux"
import { ActionCreators } from "../redux/actions"
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from "../components/MXheader"
import Color from '../utils/colors';
import Thumbnail from "../components/MXthumbnail"
import Progress from "../components/MXprogressLine"
import ProgressWebView from "../components/MXwebview"
import HTMLView from 'react-native-htmlview';

var loading = true;
class Page extends Component {    
    static navigationOptions = ({ navigation, screenProps }) => ({
    header: null
  });

    constructor(props) {
        super(props);
        this.state = {loading:true, type: 'card', event: null, }
    }

    render() {
        return (
            <View style={styles.container}>
                <Header header={{ visible: true, title: 'Detail', backVisible: true }} navigation={this.props.navigation} color={this.props.navigation.state.params.color} >
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ justifyContent: 'flex-start', alignItems: 'flex-start', marginRight: 5, }}
                        horizontal={true}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <HTMLView 
                        style={{ marginLeft: 10,}}
                        value={"<p1>"+this.props.navigation.state.params.item.title.rendered+"</p1>"}
                        stylesheet={htmlStyles}
                      />
                    </View>
                    </ScrollView>
                </Header>
                     <ProgressWebView
                            source={{ uri: this.props.navigation.state.params.item.link + "?mobil=1"}}  
                            progressColor={Color.GREY[700]}     
                         />
            </View>
        );
    }
}
const htmlStyles = StyleSheet.create({
    p1:{ fontSize:16, fontWeight:'bold', color:"#FFF"},
    p2:{fontSize:14, color:Color.GREY[700]},
    a: {
      fontWeight: '300',
      color: '#FF3366', // make links coloured pink
    },
  });

  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Color.WHITE,
    },
    card: {
        flex: 1,
    },
});

function mapStateToProps(state) {
    return {
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)