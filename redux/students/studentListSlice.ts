import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as apiClient from "@/network/apiClient";

export type Strand = {
    competence: string;
    progress: number;
};

export type DetailedStudent = {
    id: string;
    name: string;
    strands: {
        letterIdentification: Strand;
        letterNaming: Strand;
        letterFormation: Strand;
        phonemicAwareness: Strand;
    };
};

export type DetailedStudentList = {
    students: DetailedStudent[];
    loading: boolean;
    error: string | null;
}

const initialState: DetailedStudentList = {
    students: [],
    loading: false,
    error: null,
}

export const getStudentDetails = createAsyncThunk<
  { students: DetailedStudent[] },
  void
>(
  "fetchDetailedStudents",
  async () => {
    const response = await apiClient.fetchStudents();
    if (response.kind === "success" && response.body) {
      return { students: response.body };
    } else {
      throw new Error("Error fetching students");
    }
  }
);

const detailedStudentsSlice = createSlice({
    name: 'detailedStudentsList',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getStudentDetails.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getStudentDetails.fulfilled, (state, action) => {
          state.students = action.payload.students;
          state.loading = false;
        })
        .addCase(getStudentDetails.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || "Failed to fetch students";
        });
    },
})

export default detailedStudentsSlice.reducer;
