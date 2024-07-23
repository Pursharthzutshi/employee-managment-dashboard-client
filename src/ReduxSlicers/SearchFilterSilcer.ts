import { createSlice } from "@reduxjs/toolkit"

type localStorageSlicerProps = {
    SearchFilter: string
}

const initialState: localStorageSlicerProps = {
    SearchFilter: "",
}

export const SearchFilterSilcer = createSlice({
    name: "SearchFilterSilcer",
    initialState,
    reducers: {
        setSearchFilter: (state, action) => {
            state.SearchFilter = action.payload;
        },

    }
})

export const { setSearchFilter } = SearchFilterSilcer.actions;

export default SearchFilterSilcer.reducer