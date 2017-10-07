import createReducer from "../createReducer"
import * as types from "../actions/types"

export const archiveEvents = createReducer({}, {
    [types.SET_FETCHED_ARCHIVE_EVENTS_SUCCESS](state, action){
        let newState = Object.assign(action.events);
        
        return newState;
    }

});

export const liveEvents = createReducer({}, {
    [types.SET_FETCHED_LIVE_EVENTS_SUCCESS](state, action){
        let newState = Object.assign(action.events);
        
        return newState;
    }, 
});

export const fetchError = createReducer({}, {
    [types.SET_FETCHED_LIVE_EVENTS_SUCCESS](state, action){
        let newState = null
        return newState;
    },
    [types.SET_FETCHED_LIVE_EVENTS_FAILED](state, action){
        let newState = Object.assign({error:action.payload,page:'canli'})
        return newState;
    },
    [types.SET_FETCHED_FUTURE_EVENTS_SUCCESS](state, action){
        let newState = null
        return newState;
    },
    [types.SET_FETCHED_FUTURE_EVENTS_FAILED](state, action){
        let newState = Object.assign({error:action.payload,page:'gelecek'})
        return newState;
    },
    [types.SET_FETCHED_ARCHIVE_EVENTS_SUCCESS](state, action){
        let newState = null
        return newState;
    },
    [types.SET_FETCHED_ARCHIVE_EVENTS_FAILED](state, action){
        let newState = Object.assign({error:action.payload,page:'arsiv'})
        return newState;
    }
});

   

export const futureEvents = createReducer({}, {
    [types.SET_FETCHED_FUTURE_EVENTS_SUCCESS](state, action){
        let newState = Object.assign(action.events);

        return newState;
    }

});



export const eventDetail = createReducer({},{
    [types.GET_EVENT_DETAIL](state, action){
        return action.event;
    },
});

export const playObj = createReducer({},{
    [types.SET_PLAY_EVENT](state, action){
        return action.playObj;
    },
});

export const eventCount = createReducer(0,{
    [types.SET_FETCHED_ARCHIVE_EVENTS_SUCCESS](state, action){
        return action.events.length;
    },
});