import React, { Component } from "react"
import ReactNative from "react-native"
import { connect } from "react-redux";
import { bindActionCreators } from "redux"
import { ActionCreators } from "../redux/actions"
import Loading from "../components/loading";
import Color from '../utils/colors';
import Input from "../components/MXinput"
import Card from "../components/MXcard"
import Warning from "../components/MXwarning"
import Header from "../components/MXheader"

var lunr = require("../utils/lunr");
const {
    ScrollView,
    View,
    TextInput,
    Text,
    Image,
    TouchableHighlight,
    TouchableNativeFeedback,
    StyleSheet,
    ActivityIndicator,
    Platform,
    RefreshControl,
    Alert,
} = ReactNative

import _WP from "react-wp-api";

const Button = Platform.OS == "android" ? TouchableNativeFeedback : TouchableHighlight
var timerId;
var usersInput = null;
const index = lunr(function () {
    this.field('title')
    this.ref('id')
})

var counter = 0;
const scrollingUpCount = 0;
const scrollingDownCount = 0;

class Page extends Component {    
    static navigationOptions = ({ navigation, screenProps }) => ({
    header: null
  });
    constructor(props) {
        super(props);
        this.state = {
            currentCategory: null,
            scrollPosition: 0,
            posts: [],
            medias: {},
            loadingMedias: {},
            loadedMedias: {},
            isConnected: true,
            loading: false,
            usersInput: '',
            events: [],
            card_type: "full",
            searchText:this.props.navigation.state.params && this.props.navigation.state.params.strings ? this.props.navigation.state.params.strings.searchText : props.strings.searchText
        }
        this._refreshEvents = this._refreshEvents.bind(this)
        this._handleScroll = this._handleScroll.bind(this)
        WP = new _WP(this.props.url);
    }

    componentWillMount() {

        if (this.props.currentCategory.id && this.props.currentCategory.id) {
            this.setState({ currentCategory: this.props.currentCategory })
        }

        if (this.props.customEvent && this.props.customEvent.search) {
            this.setState({ search: true })
        }

    }

    componentDidMount() {
        this._refreshEvents()

        this.props.setCurrentCategory({})
        this.props.setCustomEvent({})
        console.log(this.props.strings)
    }


    _refreshEvents() {
        console.log(this.props.currentCategory)
        //console.log(this.prop.category)

        if (this.state.search && (!this.usersInput || this.usersInput.length < 3)) {

        }
        else {
            this.setState({ loading: true });

                if (timerId)
                    clearTimeout(timerId)

                timerId = setTimeout(
                    () => {
                        //console.log("aramaya başlıyorum")
                        WP.Posts({
                            category: this.state.currentCategory ? this.state.currentCategory.id : this.props.category,
                            search: this.state.search ? this.usersInput : null
                        }).then((results) => {
                            console.log(results)
                            this.setState({ posts: results, loading:false });

                            results.forEach((item) => {
                                WP.Media({ id: item.featured_media }).then((result) => {
                                    let medias = this.state.medias;
                                    medias['' + result.id] = {
                                        thumbnail: result.media_details.sizes.thumbnail.source_url,
                                        medium:result.media_details.sizes.medium_large ? result.media_details.sizes.medium_large.source_url : result.media_details.sizes.full.source_url,
                                        fullImage: result.media_details.sizes.full.source_url
                                    }
                                    this.setState({ medias });
                                })
                            }, this);

                        })

                    },
                    this.state.search ? 500 : 0
                );

        }
    }


    _changeType() {
        if (this.state.type == 'list')
            this.setState({ type: 'card' })
        else
            this.setState({ type: 'list' })
    }


    shouldComponentUpdate(nextProps, nextState) {
        console.log(scrollingUpCount)
        if (this.state.scrollPosition + 30 < nextState.scrollPosition) {
            scrollingUpCount = scrollingUpCount + 1

            console.log(scrollingUpCount)
            if (scrollingUpCount > 1) {
                scrollingUpCount = 0;
                scrollingDownCount = 0;
                this.props.setHeader({ header: { visible: false, searchVisible: true, title: this.props.header.title } });
                return false
            }
        }
        else if (this.state.scrollPosition - 30 > nextState.scrollPosition) {
            scrollingDownCount = scrollingDownCount + 1
            if (scrollingDownCount > 1) {
                scrollingUpCount = 0;
                scrollingDownCount = 0;
                this.props.setHeader({ header: { visible: true, searchVisible: true, title: this.props.header.title } });
                return false
            }
        }

        return true
    }
    

    _handleScroll(event) {
        let scrollPosition = event.nativeEvent.contentOffset.y
        //console.log(scrollPosition)
        this.setState({ scrollPosition })
    }

    render() {
        return <View style={styles.scene}>
            {this.state.currentCategory || this.state.search ?
                <Header {...this.props} style={{ backgroundColor: '#FFF' }} header={{ visible: true, title: 'Detail', backVisible: true }} navigator={this.props.navigator} color={this.props.screenProps.color ? this.props.screenProps.color : this.props.color} >
                    {this.state.search ?
                        <View style={{ flexDirection: 'row' }}>
                            <Input placeholder={this.state.searchText} placeholderTextColor='#FFFFFFDD'
                                style={{ flex: 1, backgroundColor: this.props.color, borderWidth: 0, elevation: 0 }}
                                textStyle={{ color: '#FFF' }}
                                onChangeText={(usersInput) => { this.usersInput = usersInput; this._refreshEvents() }} />
                        </View> :
                        <ScrollView
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ justifyContent: 'flex-start', alignItems: 'flex-start', marginRight: 5, }}
                            horizontal={true}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ marginLeft: 10, fontSize: 16, fontWeight: 'bold', color: '#fff' }}>{this.state.currentCategory.name}</Text>
                            </View>
                        </ScrollView>
                    }
                </Header>
                : null
            }
    

            <ScrollView  
            keyboardShouldPersistTaps="always"
                onScroll={this._handleScroll}
                scrollEventThrottle={400}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.loading}
                        onRefresh={this._refreshEvents}
                    />
                }>

                {this.state.loading ? null
                    :
                    this.state.posts && this.state.posts.length > 0 ? this.state.posts.map((post) => {
                        return (<Card key={post.id} type={this.state.card_type} item={{
                            imageSource: post.featured_media == 0 ? null : this.state.medias[post.featured_media] ? {uri:this.state.medias[post.featured_media].medium} : require("../images/thumbnail.png"),
                            title: post.title.rendered,
                            description: post.excerpt.rendered
                        }}
                            onPress={() => { this.props.navHelper(()=>this.props.navigation.navigate("Detail",{item:post, color:this.props.color})) }} />
                        );
                    })
                        : this.state.search ? null : <Warning title="Post Not found" refreshPage={this._refreshEvents} />
                }

            </ScrollView>
        </View>
    }

}

Page.defaultProps = {
    strings:{searchText:"Write anything for search",}
  };

const styles = StyleSheet.create({
    scene: {
        flex: 1,
        backgroundColor: Color.GREY[200],
    },
    searchSection: {
        flexDirection: 'row',
    },
    scrollSection: {
        flex: 1
    },
    searchInput: {
        flex: 0.9,
    },
    searchButton: {
        flex: 0.3,
    },
    item: {
    },
    highight: {
    },
    nointernet: {
        backgroundColor: Color.RED[600],
        marginTop: 5,
        marginHorizontal: 10,
        padding: 10,
        borderRadius: 2,
        borderWidth: 0
    },
    title: {
        fontSize: 22,
        marginLeft: 10,

    },
    description: {

        margin: 10,
        fontSize: 14,

    },
    card: {
        backgroundColor: '#fff',
        flex: 1,
        borderRadius: 2,
    },
    card_inside: {
    },

});


function mapStateToProps(state) {
    return {
        url:state.wpUrl,
        header: state.header,
        currentCategory: state.currentCategory,
        customEvent: state.customEvent,
        fetchError: state.fetchError,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)