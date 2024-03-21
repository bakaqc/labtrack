import { configureStore } from '@reduxjs/toolkit';
import newProductReducer from './slides/newProductSlide';
import updateableProductReducer from './slides/updatableProductSlide';

export const store = configureStore({
	reducer: {
		newProduct: newProductReducer,
		updateableProduct: updateableProductReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
