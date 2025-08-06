import {StrandDetail} from "@/types/class/Strands";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import * as apiClient from "@/network/apiClient";

export type ClassProfile = {
    strands: StrandDetail[];
    loading: boolean;
    error: string | null;
}

const initialState: ClassProfile = {
    strands: [],
    loading: false,
    error: null,
}

export const getClassProfile = createAsyncThunk<{profile: StrandDetail[]},void>(
    'fetchClassProfile',
    async () => {
        const response = await apiClient.fetchClassProfile();
        if (response.kind === 'success' && response.body) {
            return {
                profile: response.body.strands ?? [],
            };
        } else {
            throw 'Error fetching users';
        }
    },
);


const classProfileSlice = createSlice({
    name: 'classProfile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getClassProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getClassProfile.fulfilled, (state, action) => {
                state.strands = action.payload.profile;
                state.loading = false;
            })
            .addCase(getClassProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch class profile';
            });
    },
});

export default classProfileSlice.reducer;