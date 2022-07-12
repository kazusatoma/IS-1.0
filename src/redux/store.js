import { configureStore } from '@reduxjs/toolkit';
import {isloadingReducer} from './reducers/isloadingReducer'

export const store = configureStore({
    reducer: {
      isloading: isloadingReducer,
    },
  })


export default store;