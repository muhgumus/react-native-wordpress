const React = require('react');
import {connect} from "react-redux"
const ReactNative = require('react-native');
import PropTypes from 'prop-types';
const {
  StyleSheet,
  Text,
  View,
  Animated,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
} = ReactNative;
import Icon from 'react-native-vector-icons/MaterialIcons';
import Color from "../utils/colors"

const Button = Platform.OS == 'android' ? TouchableOpacity : TouchableOpacity;

class IconTabBar extends React.Component {
  static propTypes = {
    goToPage: PropTypes.func,
    activeTab: PropTypes.number,
    tabs: PropTypes.array,
    backgroundColor: PropTypes.string,
    activeTextColor: PropTypes.string,
    inactiveTextColor: PropTypes.string,
    textStyle: Text.propTypes.style,
    tabStyle: View.propTypes.style,
    renderTab: PropTypes.func,
    underlineStyle: View.propTypes.style,
  };

  static defaultProps = {
    activeTextColor: Color.BLUE[700],
    inactiveTextColor: Color.GREY[700],
    activeIconSize: 30,
    inactiveIconSize: 28,
    activeTextSize: 14,
    inactiveTextSize: 12,
    backgroundColor: null,
  };

  shouldComponentUpdate(nextProps, nextState) {
      this.forceUpdate();
      return true;
  }

  renderTabOption = (name, page) => {

  };

  renderTab = (item, page, isTabActive, onPressHandler) => {
    const { activeTextColor, inactiveTextColor, textStyle,
       activeTextSize, inactiveTextSize, activeIconSize, inactiveIconSize } = this.props;
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const textSize = isTabActive ? activeTextSize : inactiveTextSize;
    const iconSize = isTabActive ? activeIconSize : inactiveIconSize;
    const fontWeight = isTabActive ? 'bold' : 'normal';
    
   

    return <Button
      style={{flex: 1, }}
      key={item.title}
      accessible={true}
      accessibilityLabel={item.icon}
      accessibilityTraits='button'
      onPress={() => { onPressHandler(page) }
    }
    >
      <View style={[styles.tab, this.props.tabStyle, ]}>
       <Icon name={item.icon} size={iconSize} color={textColor} /> 
       <Text style={{color:textColor, fontSize:textSize}}>{item.title}</Text>
      </View>
    </Button>;
  };

  render() {
    const containerWidth = this.props.containerWidth;
    const numberOfTabs = this.props.tabs.length;
    

    const left = this.props.scrollValue.interpolate({
      inputRange: [0, 1, ], outputRange: [0,  containerWidth / numberOfTabs, ],
    });
    return (
      <View  ref={(tabs) => { this._tabs = tabs; }} style={styles.tabs}>
        {this.props.tabs.map((name, page) => {
          const isTabActive = this.props.activeTab === page;
          const renderTab = this.props.renderTab || this.renderTab;
          return renderTab(name, page, isTabActive, this.props.goToPage);
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabs: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: Platform.OS=='ios' ? 1 : 0,
    borderColor: 'rgba(0,0,0,0.1)',
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.5,
    backgroundColor:'#FFF',
    elevation:5,
  },
});

function mapStateToProps(state) {
    return {
        header: state.header,
    }
}

export default connect(mapStateToProps)(IconTabBar)