import * as types from './types'
import Api from '../api/events'

export function fetchEvents(tur) {
  return (dispatch, getState) => {
    return Api.getEvents(tur).then(resp => {
      dispatch(setFetchedEvents(tur,{events: resp}));
    }).catch( (ex) => {
      dispatch(setFetchedError(tur,{err: ex}));
    });
  }
}



export function getEventDetail(event) {
  return (dispatch, getState) => {
      dispatch({
        type: types.GET_EVENT_DETAIL,
        event,
      });
  }
}

export function setPlayEvent(playObj) {
  return (dispatch, getState) => {
      dispatch({
        type: types.SET_PLAY_EVENT,
        playObj,
      });
  }
}

export function setFetchedEvents(tur,{ events }) {
  let value;
  if(tur=="arsiv")
  value = types.SET_FETCHED_ARCHIVE_EVENTS_SUCCESS
  else if(tur=="canli")
  value = types.SET_FETCHED_LIVE_EVENTS_SUCCESS
  else if(tur=="gelecek")
  value = types.SET_FETCHED_FUTURE_EVENTS_SUCCESS

  return {
    type: value,
    events,
  }
}

export function setFetchedError(tur,{ err }) {
  let value;
  if(tur=="arsiv")
  value = types.SET_FETCHED_ARCHIVE_EVENTS_FAILED
  else if(tur=="canli")
  value = types.SET_FETCHED_LIVE_EVENTS_FAILED
  else if(tur=="gelecek")
  value = types.SET_FETCHED_FUTURE_EVENTS_FAILED

  return {
    type: value,
    payload: err, 
    error: true,
  }
}


