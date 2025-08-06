import { combineReducers,configureStore } from '@reduxjs/toolkit'
import classProfileSlice from '@/redux/class/classProfileSlice';
import detailedStudentsReducer from '@/redux/students/studentListSlice';

const studentRootReducer = combineReducers({
    classProfile: classProfileSlice,
    detailedStudentsList: detailedStudentsReducer
})

export type studentsRootState = ReturnType<typeof studentRootReducer>;

const studentsStore = configureStore({
    reducer: studentRootReducer,
})

export default studentsStore;