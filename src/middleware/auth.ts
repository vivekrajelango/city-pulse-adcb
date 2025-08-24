import { createListenerMiddleware } from '@reduxjs/toolkit';
import { getCurrentUser } from '../store/slices/authSlice';
import { auth } from '../utils/supabase';
import type { RootState, AppDispatch } from '../store';

export const authListenerMiddleware = createListenerMiddleware();

export const initializeAuthListener = (dispatch: AppDispatch) => {
  try {
    auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        dispatch(getCurrentUser());
      } else if (event === 'SIGNED_OUT') {
      }
    });
  } catch (error) {
    console.warn('Auth listener initialization failed:', error);
  }
};

export const isAuthenticated = (state: RootState): boolean => {
  return state.auth.isAuthenticated && !!state.auth.user;
};

export const getCurrentUserFromState = (state: RootState) => {
  return state.auth.user;
};

export const requireAuth = (state: RootState): boolean => {
  return isAuthenticated(state);
};