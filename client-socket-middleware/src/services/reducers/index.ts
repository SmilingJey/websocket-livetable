import { combineReducers } from "redux";
import { liveTableReducer } from "./live-table/reducer";

const reducer = combineReducers({
    liveTable: liveTableReducer
})

export default reducer;