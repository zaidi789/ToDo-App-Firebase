import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    isLoggedIn: false,
  },
  reducers: {
    setUser(state, action) {
      state.username = action.payload;
      state.isLoggedIn = true;
    },
    clearUser(state) {
      state.username = '';
      state.isLoggedIn = false;
    },
  },
});

export const {setUser, clearUser} = userSlice.actions;
export default userSlice.reducer;
