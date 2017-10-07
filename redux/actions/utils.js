import * as types from './types'

export function setNetworkState(payload) {
  return (dispatch, getState) => {
    dispatch({
      type: types.NETWORK_STATE,
      payload,
    });
  }
}

export function navHelper(payload) {
  return (dispatch, getState) => {
    dispatch({
      type: types.NAV_HELPER,
      payload,
    });
  }
}

export function setHeader({ header }) {
  return {
    type: types.SET_HEADER,
    header,
  }
}

export function setCustomEvent(customEvent) {
  return {
    type: types.SET_CUSTOMEVENT,
    customEvent,
  }
}

export function setWpUrl(url) {
  return {
    type: types.SET_URL,
    url,
  }
}

export function setCurrentCategory(currentCategory) {
  return (dispatch, getState) => {
      dispatch({
        type: types.SET_CATEGORY_CURRENT,
        currentCategory,
      });
  }
}

export function setOnload(onLoad) {
  return (dispatch, getState) => {
      dispatch({
        type: types.SET_ONLOAD,
        onLoad,
      });
  }
}
