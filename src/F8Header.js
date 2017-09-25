/**
 * Copyright 2016 Facebook, Inc.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE
 *
 * @providesModule F8Header
 * @flow
 */

'use strict';

var F8Colors = require('F8Colors');
var React = require('React');
var Platform = require('Platform');
var StyleSheet = require('StyleSheet');
var TouchableOpacity = require('TouchableOpacity');
var View = require('View');
var Image = require('Image');
var ToolbarAndroid = require('ToolbarAndroid');

export type Layout =
    'default'      // Use platform defaults (icon on Android, text on iOS)
  | 'icon'         // Always use icon
  | 'title';       // Always use title

export type Foreground = 'light' | 'dark';

export type Item = {
  title?: string;
  icon?: number;
  layout?: Layout;
  onPress?: () => void;
};

export type Props = {
  title?: string;
  leftItem?: Item;
  rightItem?: Item;

  extraItems?: Array<Item>;
  foreground?: Foreground;
  style?: any;
  children?: any;
};

class F8HeaderAndroid extends React.Component {
  static height: number;
  props: Props;

  render() {
    const {leftItem, rightItem, extraItems} = this.props;
    let actions = [];
    if (rightItem) {
      const {title, icon, layout} = rightItem;
      actions.push({
        icon: layout !== 'title' ? icon : undefined,
        title: title,
        show: 'always',
      });
    }
    if (extraItems) {
      actions = actions.concat(extraItems.map((item) => ({
        title: item.title,
        show: 'never',
      })));
    }

    const textColor = this.props.foreground === 'dark'
      ? F8Colors.darkText
      : 'white';

    let content;
    if (React.Children.count(this.props.children) > 0) {
      content = (
        <View collapsable={false} style={{flex: 1}}>
          {this.props.children}
        </View>
      );
    }

    return (
      <View style={[styles.toolbarContainer, this.props.style]}>
        <ToolbarAndroid
          navIcon={leftItem && leftItem.icon}
          onIconClicked={leftItem && leftItem.onPress}
          title={this.props.title}
          titleColor={textColor}
          subtitleColor={textColor}
          actions={actions}
          onActionSelected={this.handleActionSelected.bind(this)}
          style={styles.toolbar}>
          {content}
        </ToolbarAndroid>
      </View>
    );
  }

  handleActionSelected(position: number) {
    let items = this.props.extraItems || [];
    if (this.props.rightItem) {
      items = [this.props.rightItem, ...items];
    }
    const item = items[position];
    item && item.onPress && item.onPress();
  }
}


class F8HeaderIOS extends React.Component {
  static height: number;
  props: Props;

  constructor(props){
    super(props);
    this.onPressHomeIcon = this.onPressHomeIcon.bind(this);
    this.state = {
      isOpenSearchBox : false
    }
  }

  onFocus(){
    this.setState({
      isOpenSearchBox : true
    });
  }

  onSearch = (content)=>{
    this.props.onSearch(content);
  }

  _renderSearchBox(){
    return(
      <View style = {styles.rightItem2}>
      </View>
    );
  }

  onPressHomeIcon(){
    this.props.onPressHome();
  }

  onPressGlobeIcon(){
    this.props.onPressGlobeIcon();
  }

  _renderHomeIcon(){
    if(this.props.homeIcon){
      return(
      <TouchableOpacity onPress={() => this.onPressHomeIcon()}>

      </TouchableOpacity>
    );
    } else {
      return(
        <View>
        </View>
      );
    }

  }

  _renderGlobeIcon(){
    if(this.props.globeIcon){
      return(
      <TouchableOpacity onPress={() => this.onPressGlobeIcon()}>

      </TouchableOpacity>
    );
    } else {
      return(
        <View>
        </View>
      );
    }

  }

  render() {
    const {leftItem, title, rightItem, foreground} = this.props;
    const titleColor = foreground === 'dark' ? F8Colors.darkText : 'white';
    const itemsColor = foreground === 'dark' ? F8Colors.lightText : 'white';

    const content = React.Children.count(this.props.children) === 0
      ? <Text style={[styles.titleText, {color: titleColor}]}>
          {title}
        </Text>
      : this.props.children;
    var visibleIcon = 'white';


    return (
      <View style={[styles.header, this.props.style]}>
        <View style={styles.leftItem}>
          <ItemWrapperIOS color={itemsColor} item={leftItem} />
        </View>
        <View
          accessible={true}
          accessibilityLabel={title}
          accessibilityTraits="header"
          style={(!this.props.enableSearchBox) ? styles.centerItem : styles.centerItem2}>
          {content}
        </View>

        <View style={styles.rightItem}>
          <ItemWrapperIOS color={itemsColor} item={rightItem} />
        </View>
      </View>
    );
  }

}

F8HeaderIOS.propTypes={
   onSearch : React.PropTypes.func,
   enableSearchBox : React.PropTypes.any,
   notificationIcon : React.PropTypes.any,
   onPressNotification : React.PropTypes.func,
   homeIcon : React.PropTypes.any,
   onPressHome: React.PropTypes.func
}



class ItemWrapperIOS extends React.Component {


  render() {
    const {item, color} = this.props;
    if (!item) {
      return null;
    }

    let content;
    const {title, icon, layout, onPress} = item;

    if (layout !== 'icon' && title) {
      content = (
        <Text style={[styles.itemText, {color}]}>
          {title}
        </Text>
      );
    } else if (icon) {
      content = <Image source={icon} />;
    }

    return (
      <TouchableOpacity
        accessibilityLabel={title}
        accessibilityTraits="button"
        onPress={onPress}
        style={styles.itemWrapper}>
        {content}
      </TouchableOpacity>
    );
  }
}


var STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : 25;
var HEADER_HEIGHT = Platform.OS === 'ios' ? 60 + STATUS_BAR_HEIGHT : 80 + STATUS_BAR_HEIGHT;

var styles = StyleSheet.create({
  toolbarContainer: {
    paddingTop: STATUS_BAR_HEIGHT,
  },
  toolbar: {
    height: HEADER_HEIGHT - STATUS_BAR_HEIGHT,
  },
  header: {
    backgroundColor: 'transparent',
    paddingTop: STATUS_BAR_HEIGHT,
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    color: 'white',
    fontSize: 15,
  },
  leftItem: {
    paddingLeft:10,
    flex: 1,
    alignItems: 'flex-start',
  },
  centerItem2: {
    flex: 8,
    alignItems: 'center',
    position : 'absolute',
    paddingLeft : 370,
  },
  centerItem: {
    flex: 8,
    alignItems: 'center',
  },
  centerItemDefault: {
    flex: 4,
    alignItems: 'center',
  },
  rightItem: {
    flex: 1,
    alignItems: 'flex-end',
  },
  rightItem2: {
    flex: 5,
    paddingLeft : 600,
  },
  itemWrapper: {
    padding: 2,
  },
  itemText: {
    letterSpacing: 1,
    paddingRight:10,
    fontWeight:'bold',
    fontSize: 20,
    color: 'white',
  },
  icon: {
    paddingLeft : 10
  }
});

const Header = Platform.OS === 'ios' ? F8HeaderIOS : F8HeaderAndroid;
Header.height = HEADER_HEIGHT;
// $FlowFixMe
Header.__cards__ = (define) => {
  const menuItem = {
    title: 'Menu',
    icon: require('./assets/img/hamburger.png'),
    onPress: () => alert('Menu button pressed!'),
  };
  const filterItem = {
    title: 'Filter',
    icon: require('./assets/img/filter.png'),
    onPress: () => alert('Filter button pressed!'),
  };

  define('Simple', () => <Header title="Hello, world" />);
  define('With items', () => (
    <Header
      title="Default"
      leftItem={menuItem}
      rightItem={filterItem}
    />
  ));
  define('Forcing icons', () => (
    <Header
      title="Forcing icons"
      leftItem={{...menuItem, layout: 'icon'}}
      rightItem={{...filterItem, layout: 'icon'}}
    />
  ));
  define('Forcing title', () => (
    <Header
      title="Forcing title"
      leftItem={{...menuItem, layout: 'title'}}
      rightItem={{...filterItem, layout: 'title'}}
    />
  ));
  define('With content', () => (
    <Header leftItem={menuItem}>
      <View style={{backgroundColor: '#224488'}}>
        <Text style={{color: 'yellow'}}>
          Yellow text as title
        </Text>
      </View>
    </Header>
  ));
  define('With Background', () => (
    <Header
      title="With Background"
      leftItem={{...menuItem, layout: 'title'}}
      rightItem={{...filterItem, layout: 'title'}}
      style={{backgroundColor: '#224488'}}
    />
  ));
  define('With light background', () => (
    <Header
      title="Light Background"
      leftItem={{...menuItem, layout: 'title'}}
      rightItem={{...filterItem, layout: 'title'}}
      style={{backgroundColor: 'white'}}
      foreground="dark"
    />
  ));
};

module.exports = Header;
