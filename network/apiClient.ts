import {DetailedStudent} from "@/redux/students/studentListSlice";
import {StrandDetail} from "@/types/class/Strands";

type ResponseKind = 'success' | 'failure';

type NetworkResponse<T> = {
    kind: ResponseKind;
    body?: T;
};


type FetchClassProgressResponse = {
    strands: StrandDetail[];
}


export const fetchStudents = async (
    page: number,
    count: number,
): Promise<NetworkResponse<DetailedStudent[]>> => {
    const response = await fetch(
        `http://localhost:3000/students`,
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        },
    );
    if (response.ok) {
        const json = await response.json();
        return {
            kind: 'success',
            body: json.results,
        };
    } else {
        return {
            kind: 'failure',
        };
    }
};

export const fetchClassProfile = async (): Promise<NetworkResponse<FetchClassProgressResponse>> => {
    console.log('Fetching class profile...');
    const response = await fetch(
        `http://10.0.2.2:3000/class_profile`,
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        },
    );



    if (response.ok) {
        const json = await response.json();
        console.log(json); // Log the actual response data
        return {
            kind: 'success',
            body: { strands: json.results }, // wrap results in an object
        };
    } else {
        console.log(await response.text()); // Log the error response text
        return {
            kind: 'failure',
        };
    }
};