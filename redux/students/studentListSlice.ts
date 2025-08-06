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

export const fetchDetailedStudents = createAsyncThunk<
  { students: DetailedStudent[] },
  { page: number; count: number }
>(
  "fetchDetailedStudents",
  async ({ page, count }) => {
    const response = await apiClient.fetchStudents(page, count);
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
        .addCase(fetchDetailedStudents.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchDetailedStudents.fulfilled, (state, action) => {
          state.students = action.payload.students;
          state.loading = false;
        })
        .addCase(fetchDetailedStudents.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || "Failed to fetch students";
        });
    },
})

export default detailedStudentsSlice.reducer;
