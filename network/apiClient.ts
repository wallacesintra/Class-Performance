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


export const fetchStudents = async (): Promise<NetworkResponse<DetailedStudent[]>> => {
    try {
        const response = await fetch(
            // `http://10.0.2.2:3000/students`,
            `http://192.168.0.44:3000/students`,
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
                body: json, // Use the response array directly instead of json.results
            };
        } else {
            console.error("API Error:", await response.text());
            return {
                kind: 'failure',
            };
        }
    } catch (error) {
        console.error("Network Error:", error);
        return {
            kind: 'failure',
        };
    }
};

export const fetchClassProfile = async (): Promise<NetworkResponse<FetchClassProgressResponse>> => {
    const response = await fetch(
        // `http://10.0.2.2:3000/class_profile`,
        `http://192.168.0.44:3000/class_profile`,
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
            body: json.strands ? json : { strands: json },
        };
    } else {
        console.log("API Error:", await response.text());
        return {
            kind: 'failure',
        };
    }
};
