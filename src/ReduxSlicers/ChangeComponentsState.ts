import { createSlice } from "@reduxjs/toolkit"

type initialStateProps = {
    changeComponent: boolean,
}

const initialState: initialStateProps = {
    changeComponent: true,

}

export const ChangeComponentsState = createSlice({
    name: "ChangeComponentsState",
    initialState,
    reducers: {
        setChangeComponent: (state, action) => {
            state.changeComponent = action.payload;
        },

    }
})

export const { setChangeComponent } = ChangeComponentsState.actions;

export default ChangeComponentsState.reducer