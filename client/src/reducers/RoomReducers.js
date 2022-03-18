import {
  ADD_ROOM_DETAILS,
  EDIT_ROOM_DETAILS,
  GET_ROOMS,
  GET_ROOM_NUMBER,
  GET_SINGLE_ROOM,
  UPLOAD_ROOM_IMAGE,
} from '../actions/actionTypes';

const RoomReducers = (state, action) => {
  const { payload, type } = action;
  switch (type) {
    case GET_ROOM_NUMBER:
      return {
        ...state,
        totalRoom: payload,
        isLoading: false,
      };
    case GET_ROOMS:
      return {
        ...state,
        roomData: payload,
        singleRoomData: null,
        isLoading: false,
      };
    case GET_SINGLE_ROOM:
      return {
        ...state,
        singleRoomData: payload,
        isLoading: false,
      };

    case UPLOAD_ROOM_IMAGE:
      return {
        ...state,
        uploadRoomImgId: payload,
        isLoading: false,
      };

    case ADD_ROOM_DETAILS:
      localStorage.setItem('roomQty', payload.length);
      return {
        ...state,
        roomData: payload,
        uploadRoomImgId: null,
        isAuth: true,
        isLoading: false,
      };

    case EDIT_ROOM_DETAILS:
      return {
        ...state,
        roomData: payload,
        isAuth: true,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default RoomReducers;