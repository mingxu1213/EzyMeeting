import {combineReducers} from 'redux';

const meetingType = (state="", action) => {
  if(action.type === "setMeetingType"){
    return action.meetingType;
  }
  else{
    return state;
  }
}
const availableTimeSetting = (state="", action) => {
  if(action.type === "setAvailableTime"){
    return action.availableTime;
  }
  else{
    return state;
  }
}
const startID = (state="", action) => {
  if(action.type === "setStartID"){
    return action.id;
  }
  else{
    return state;
  }
}
const dragSelect = (state="", action) => {
  if(action.type === "setSelect"){
    return action.select;
  }
  else{
    return state;
  }
}
const lastID = (state="", action) => {
  if(action.type === "setLastID"){
    return action.lastLocation;
  }
  else{
    return state;
  }
}

const mouseMoveDirection = (state="", action) => {
  if (action.type === "setMouseMoveDirection"){
    return action.moveDirection;
  }
  else{
    return state;
  }
}
const purposeSetting = (state="", action) => {
  if (action.type === "setClickPurpose") {
    return action.clickPurpose;
  }
  else{
    return state;
  }
}


const reducers = combineReducers({
  getMeetingType: meetingType,
  getAvailableTime: availableTimeSetting,
  getSelect: dragSelect,
  getLastID: lastID,
  getMouseMoveDirection: mouseMoveDirection,
  getStartID: startID,
  getClickPurpose: purposeSetting
});
export default reducers;