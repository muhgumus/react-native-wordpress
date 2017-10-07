/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import {Provider, connect} from "react-redux"
import thunk from "redux-thunk"
import logger from "redux-logger"
import reducer from "./redux/reducers"

import { StackNavigator } from 'react-navigation';
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';
import Main from './containers/Main';
import Detail from './containers/Detail';
import PostList from './containers/PostList';

console.disableYellowBox = true;


AppNavigator = StackNavigator({
  Main: { screen: Main},
  Detail: { screen: Detail},
  PostList: { screen: PostList},
}
, {
    transitionConfig: getSlideFromRightTransition
  } //Soldan Sağa kayma efekti için (android)*/ 
);


connect(AppNavigator)

const store = createStore(
  reducer,
  applyMiddleware(
    thunk,
    logger
  )  //once thunk sonra logger olmak zorunda yoksa undefined action fırlatır.
)

let strings_en={categories:"Categories", pages:"Pages", searchText:"Write anything for search", homepage:"Home", warningText:"Ops someting is wrong", nowordpressText:"Your address may not be a Wordpress site", noexternalUseText:"Your address is Wordpress site but not accepted external use", tryanother:"TRY ANOTHER"}

var App = (data) => {
  console.log("DATA",data);
   return data.strings ? 
   <Provider store={store}>
    <AppNavigator  screenProps={{onLoad:data.onLoad, color:data.color, url:data.url, strings:data.strings ? data.strings : strings_en  }} />
   </Provider>
   : null
}
 ;

module.exports = App
