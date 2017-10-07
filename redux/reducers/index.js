import {combineReducers} from "redux"
import * as eventsReducer from "./events"
import * as utilsReducer from "./utils"

export default combineReducers(Object.assign(
    eventsReducer,
    utilsReducer
    ))