import { createReducer } from "@reduxjs/toolkit";

import { setFoo } from "./actions";

export interface GlobalState {
  foo: string;
}

export const initialState: GlobalState = {
  foo: "bar",
};

export default createReducer(initialState, (builder) =>
  builder.addCase(setFoo, (state, { payload: { foo } }) => {
    state.foo = foo;
  }),
);
