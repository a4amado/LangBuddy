import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./reducers/chatReducer";

export const store = configureStore({
    reducer: chatReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from "./actions/chatActions";
export * from "./reducers/chatReducer";
