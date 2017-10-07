import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  ScrollView,
  WebView,
  Platform,
  RefreshControl,
  ActivityIndicator,
  Navigator,
  BackAndroid,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux"
import { ActionCreators } from "../redux/actions"
import Icon from 'react-native-vector-icons/MaterialIcons';
import Color from "../utils/colors"
import Header from "../components/MXheader"
import IconTabBar from "../components/IconTabBar"
import MXtabBar from "../components/MXtabBar"
import ScrollableTabView, { ScrollableTabBar, } from "react-native-scrollable-tab-view"
import PostList from "./PostList"
import DrawerLayout from "react-native-drawer-layout"
import DrawerContent from "./DrawerContent"
import _WP from "react-wp-api";
import MXwarning from "../components/MXwarning"


var drawer;
class Main extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    header: null
  });

  constructor(props) {
    super(props)
    this.state = {
      headerWidth: 60, tabLocked: true,
      categories: [],
      strings:this.props.screenProps.strings,
    }
    this._tabLocked = this._tabLocked.bind(this)
    WP = new _WP(this.props.screenProps.url);
  }


  componentWillMount() {
    this.props.setWpUrl("" + this.props.screenProps.url)
    this.props.setHeader({ header: { visible: true, searchVisible: true, title: this.state.strings.homepage } });
  }

  componentDidMount() {
    this.setState({ loading: true });
    WP.Categories().then((results) => {
      if (results.code && results.code == "rest_no_route") {
        this.setState({ error: true, noExternal:true, loading: false });
      }
      else {
        this.props.screenProps.onLoad(true);
        this.setState({ categories: results, loading: false });
      }
    }).catch((err) => {
      this.setState({ error: true, loading: false });
    })

    WP.Pages().then((results) => {
      this.setState({ pages: results });
    })
  }

  updateTitle(tab) {
    //console.log(tab)
    this.props.setHeader({ header: { visible: true, searchVisible: true, title: tab.ref.props.tabLabel.title } });
  }

  _tabLocked(val) {
    this.setState({ tabLocked: val })
  }


  render() {
    { this.drawer && this.props.customEvent.closeDrawer ? this.drawer.closeDrawer() : null }  // Drawer kapatma mesajı geldiyse kapat
    return (
      this.state.error ? <MXwarning color={this.props.screenProps.color}
        refreshPage={() => { this.props.screenProps.onLoad("warning"); }}
        title={this.state.strings.warningText} 
        buttonText={this.state.strings.tryanother}
        description={this.state.noExternal ? this.state.strings.noexternalUseText : this.state.strings.nowordpressText} /> :
        this.state.loading ?
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF' }}>
            <ScrollView style={{ width: 100, height: Platform.OS == "ios" ? 50 : 70 }}
              refreshControl={<RefreshControl refreshing={true} />} />
          </View> :
          <DrawerLayout
            drawerWidth={300}
            ref={(drawer) => { this.drawer = drawer }}
            renderNavigationView={() => <DrawerContent strings={this.state.strings} pages={this.state.pages} categories={this.state.categories} navigation={this.props.navigation} url={this.props.screenProps.url} color={this.props.screenProps.color} />}>
            <View style={styles.container}>
              <Header strings={this.state.strings} navigation={this.props.navigation} header={this.props.header} drawer={this.drawer} style={{ height: this.state.headerWidth, backgroundColor: this.props.screenProps.color }} color={this.props.screenProps.color} />
              <ScrollableTabView
                onChangeTab={(tab) => { this.updateTitle(tab) }}
                locked={this.state.tabLocked}
                renderTabBar={() => <MXtabBar />}
                tabBarPosition="top"
                tabBarActiveTextColor={this.props.screenProps.color}
              >
                {this.state.categories && this.state.categories.length > 0 ?
                  <View tabLabel={{ title: 'Anasayfa', icon: 'home', noLabel: true }} style={styles.tabView}>
                    <PostList strings={this.state.strings} color={this.props.screenProps.color} hideSearch={true} {...this.props} />
                  </View> : null}

                {this.state.categories && this.state.categories.length > 0 ? this.state.categories.map((category) => {
                  let item = { icon: null, noLabel: false }
                  try {
                    item = JSON.parse(category.description)
                  } catch (e) {
                    console.log(e)
                  }
                  return (
                    <View key={category.id} tabLabel={{ title: category.name, icon: item.icon, noLabel: item.noLabel }} style={styles.tabView}>
                      <PostList strings={this.state.strings} category={category.id} color={this.props.screenProps.color} hideSearch={true} {...this.props} />
                    </View>
                  );
                })
                  : <View tabLabel={{ title: 'Yükleniyor...', icon: 'home', noLabel: false }} style={styles.tabView}>
                    <PostList strings={this.state.strings} hideSearch={true} color={this.props.screenProps.color} {...this.props} />
                  </View>
                }
              </ScrollableTabView>

            </View>
          </DrawerLayout>
    )
  }
}


Main.defaultProps = {
  url: "http://muhammedgumus.com",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  tabView: {
    flex: 1,
    backgroundColor: Color.GREY[200],
  },
  card: {
    backgroundColor: '#fff',
    flex: 1,
    margin: 5,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
});

function mapStateToProps(state) {
  return {
    header: state.header,
    customEvent: state.customEvent,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)