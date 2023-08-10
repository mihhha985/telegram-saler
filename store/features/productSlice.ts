import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {IProduct} from "@/types/productType";

type initialType = {
	products:IProduct[]
}

const initialState:initialType = {
	products:[]
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
		create: (state, action:PayloadAction<IProduct>) => {
			state.products.push(action.payload);
		}
	}
});

export const { create } = productSlice.actions;
export default productSlice.reducer;