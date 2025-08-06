export type StrandStudent = {
    studentId: string;
    name: string;
    competence: string;
};

export type StrandDetail = {
    strandId: string;
    strand: string;
    workCovered: number;
    students: StrandStudent[];
};