import { configureStore } from '@reduxjs/toolkit'
import pocFlowReducer from './slices/pocFlowSlice'

export const store = configureStore({
  reducer: {
    pocFlow: pocFlowReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
})

export default store
