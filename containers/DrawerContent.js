import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableHighlight,
  ScrollView,
  Platform,
} from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux"
import { ActionCreators } from "../redux/actions"
import Color from "../utils/colors"
import Thumbnail from "../components/MXthumbnail"
import Icon from 'react-native-vector-icons/MaterialIcons';

const Button = TouchableOpacity

class Page extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: true }
    this._openPage = this._openPage.bind(this)
    this._openCategory = this._openCategory.bind(this)
    this._closeMenu = this._closeMenu.bind(this)
  }

  componentDidMount() {

  }

  _openPage(page) {
    this.props.navHelper(()=>this.props.navigation.navigate("Detail",{item:page, color:this.props.color}));
  }

    _openCategory(category) {
    this.props.setCurrentCategory(category);
    this.props.navHelper(()=>this.props.navigation.navigate("PostList",{color:this.props.color}));
  }

    _closeMenu() {
      this.props.setCustomEvent({closeDrawer:true})
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.profile,{backgroundColor:this.props.color}]} >
          <View style={styles.menuItem} >
            <View style={{ flex: 1, flexDirection: 'row', justifyContent:'space-between', alignItems:'flex-end', }}>
              <View style={{flexDirection:'row'}}>
              <Icon name="view-quilt" size={30} color={Color.WHITE} />
              <Text style={{ color: Color.WHITE, fontSize: 22, }} > {this.props.strings.categories} </Text>
            </View>
             <Button style={styles.button}  onPress={this._closeMenu}>
                        <Icon name="close" size={30} color={Color.WHITE} />
                    </Button>
            </View>
          </View>
        </View>
        <ScrollView>
        <View style={styles.menu}>
          <View style={styles.section}>
            {this.props.categories && this.props.categories.length > 0 ? this.props.categories.map((category,i) => {
              return<Button key={i} style={styles.menuItem} underlayColor={Color.GREY[300] + 'cc'} onPress={() => this._openCategory(category)}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: Color.GREY[800], fontSize: 16, }} > {category.name} </Text>
                </View>
              </Button>
            }) : null}
          </View>

          <View style={styles.section}>
            <View style={styles.section_title}>
            <Icon name="view-carousel" size={26} color={Color.GREY[800]} />
              <Text style={{ color: Color.GREY[800], fontSize: 20, }} > {this.props.strings.pages} </Text>
            </View>
            {this.props.pages && this.props.pages.length > 0 ? this.props.pages.map((page,i) => {
              return<Button key={i} style={styles.menuItem} underlayColor={Color.GREY[300] + 'cc'} onPress={() => this._openPage(page)}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: Color.GREY[800], fontSize: 16, }} > {page.title.rendered} </Text>
                </View>
              </Button>
            }) : null}
          </View>

        </View>
        </ScrollView>
      </View>
    );
  }
}

Page.defaultProps = {
  color: Color.BLUE[700],
  strings:{categories:"Categories", pages:"Pages"}
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Color.GREY[200],
  },
  avatar: {
    marginLeft: 10
  },
  title: {
    margin: 5,
    color: Color.WHITE,
  },

  section: {
    flexDirection: 'column',
    width:300,
    marginBottom:5,
  },

  section_title: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:10,
    paddingVertical:10,
    paddingHorizontal:10,
    borderBottomColor:Color.GREY[300],
    borderBottomWidth:0.5,
  },

  profile: {
    height: 55,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    shadowColor: Color.GREY[50],
  },
  menu: {
    flex: 1,
    paddingTop:10,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  menuItem: {
    flexDirection: 'row',
    borderBottomColor:Color.GREY[300],
    borderBottomWidth:0.5,
    padding: 10,
  },

  button: {
    padding:5,
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