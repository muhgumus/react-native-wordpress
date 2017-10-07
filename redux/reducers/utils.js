import createReducer from "../createReducer"
import * as types from "../actions/types"

export const networkConnected = createReducer(true, {
    [types.NETWORK_STATE](state, action) {
        let newState = action.payload;
        return newState;
    },
});


var lastAction = null;
export const navHelperResult = createReducer(true, {
    [types.NAV_HELPER](state, action) {
        if(lastAction != action.payload.toString()){  // Navigasyon butonu 1.2 saniye içerisindeki çoklu tıklamalara cevap vermez
            action.payload();
           lastAction = action.payload.toString();
        }

        setTimeout(function() {
            lastAction = null;
        }, 1200);
        return true;
    }
});

export const header = createReducer({}, {
    [types.SET_HEADER](state, action){
        console.log(action);
        return action.header;
    }

});


export const customEvent = createReducer({}, {
    [types.SET_CUSTOMEVENT](state, action){
        console.log(action);
        return action.customEvent;
    }

});

export const wpUrl = createReducer("", {
    [types.SET_URL](state, action){
        console.log(action);
        return action.url;
    }

});

export const currentCategory = createReducer({},{
    [types.SET_CATEGORY_CURRENT](state, action){
        return Object.assign(action.currentCategory);
    },
  });
  

export const onLoad = createReducer({},{
    [types.SET_ONLOAD](state, action){
        return Object.assign(action.onLoad);
    },
  });
  