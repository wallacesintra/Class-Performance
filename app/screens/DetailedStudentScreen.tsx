import {ScrollView, StyleSheet, View, Text, Image} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import * as Progress from 'react-native-progress';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {DetailedStudent, getStudentDetails} from "@/redux/students/studentListSlice";
import {studentsRootState} from "@/redux/studentStore";
import {getColor} from "@/components/students/StudentCard";
import {RouteProp, useRoute} from "@react-navigation/core";


interface screenParams {
    studentId: String
}

// @ts-ignore
export function DetailedStudentScreen({route}) {
    const routes = useRoute<RouteProp<{ params: screenParams }, 'params'>>()
    const {studentId} = routes.params

    const dispatch = useDispatch();
    const studentState = useSelector((state: studentsRootState) => state.detailedStudentsList);
    const [selectedStudentId, setSelectedStudentId] = useState<string | null>(typeof studentId === 'string' ? studentId : null);
    const [selectedStudent, setSelectedStudent] = useState<DetailedStudent | null>(null);


    useEffect(() => {
        // @ts-ignore
        dispatch(getStudentDetails())
    }, [dispatch]);


    useEffect(() => {
        if (!studentState.students || studentState.loading) return;

        const filteredStudents = studentState.students.filter(
            (student: DetailedStudent) => student.id === selectedStudentId
        );
        setSelectedStudent(filteredStudents[0] || null);

    }, [selectedStudentId, studentState.students, studentState.loading]);




    const letterIdentificationColor: string = getColor(selectedStudent?.strands.letterIdentification.competence || 'BE');
    const letterNamingColor: string = getColor(selectedStudent?.strands.letterNaming.competence || 'BE');
    const letterFormationColor: string = getColor(selectedStudent?.strands.letterFormation.competence || 'BE');
    const phonemicAwarenessColor: string = getColor(selectedStudent?.strands.phonemicAwareness.competence || 'BE');

    useEffect(() => {
        if (studentState.loading) {
            console.log("Loading student details...");
        } else if (studentState.error) {
            console.error("Error fetching student details:", studentState.error);
        } else {
            console.log("Student details fetched successfully:");
        }
    }, [studentState]);


    // @ts-ignore
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Student Performance</Text>
                <Ionicons name="download-outline" size={24} color="#000" />
            </View>

            <View>
                {
                    studentState.loading ? (
                        <Text>Loading Student Details...</Text>
                    ): studentState.error ? (
                        <Text style={{color: 'red'}}> {studentState.error} </Text>
                    ): studentState.students.length === 0 ? (
                        <Text>No student found</Text>
                    ): selectedStudent ? (
                        <View>
                            {/* Avatar and Info */}
                            <View style={styles.avatarContainer}>
                                <Image
                                    source={{ uri: 'https://avatars.githubusercontent.com/u/583231?v=4' }}
                                    style={styles.avatar}
                                />
                                <Text style={styles.name}>{selectedStudent.name}</Text>
                            </View>

                            {/* Strand Details */}
                            <ScrollView>
                                <View style={styles.section}>
                                    <Text style={styles.sectionTitle}>Letter Identification</Text>
                                    <Text style={styles.label}>Work Progress</Text>
                                    <Progress.Bar
                                        // progress={0.8}
                                        progress={selectedStudent.strands.letterIdentification.progress / 100}
                                        width={null}
                                        color="black"
                                        unfilledColor="#E5E5E5"
                                        height={8}
                                        borderWidth={0}
                                    />
                                    <Text style={styles.percentage}>{`${selectedStudent.strands.letterIdentification.progress}%`}</Text>
                                    <Text style={[styles.competence, {color: letterIdentificationColor}]}>{`Competence Level: ${selectedStudent.strands.letterIdentification.competence}`}</Text>
                                </View>

                                <View style={styles.section}>
                                    <Text style={styles.sectionTitle}>Letter Naming</Text>
                                    <Text style={styles.label}>Work Progress</Text>
                                    <Progress.Bar
                                        progress={selectedStudent.strands.letterNaming.progress / 100}
                                        width={null}
                                        color="black"
                                        unfilledColor="#E5E5E5"
                                        height={8}
                                        borderWidth={0}
                                    />
                                    <Text style={styles.percentage}>{`${selectedStudent.strands.letterNaming.progress}%`}</Text>
                                    <Text style={[styles.competence, {color: letterNamingColor}]}>
                                        {`Competence Level: ${selectedStudent.strands.letterNaming.competence}`}
                                    </Text>
                                </View>

                                <View style={styles.section}>
                                    <Text style={styles.sectionTitle}>Letter Formation</Text>
                                    <Text style={styles.label}>Work Progress</Text>
                                    <Progress.Bar
                                        progress={selectedStudent.strands.letterFormation.progress / 100}
                                        width={null}
                                        color="black"
                                        unfilledColor="#E5E5E5"
                                        height={8}
                                        borderWidth={0}
                                    />
                                    <Text style={styles.percentage}>{`${selectedStudent.strands.letterFormation.progress}%`}</Text>
                                    <Text style={[styles.competence, {color: letterFormationColor}]}>
                                        {`Competence Level: ${selectedStudent.strands.letterFormation.competence}`}
                                    </Text>
                                </View>

                                <View style={styles.section}>
                                    <Text style={styles.sectionTitle}>Phonemic Awareness</Text>
                                    <Text style={styles.label}>Work Progress</Text>
                                    <Progress.Bar
                                        progress={selectedStudent.strands.phonemicAwareness.progress / 100}
                                        width={null}
                                        color="black"
                                        unfilledColor="#E5E5E5"
                                        height={8}
                                        borderWidth={0}
                                    />
                                    <Text style={styles.percentage}>{`${selectedStudent.strands.phonemicAwareness.progress}%`}</Text>
                                    <Text style={[styles.competence, {color: phonemicAwarenessColor}]}>
                                        {`Competence Level: ${selectedStudent.strands.phonemicAwareness.competence}`}
                                    </Text>
                                </View>
                            </ScrollView>
                        </View>
                    ) : (
                        <Text>No student found</Text>
                    )
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        paddingTop: 15,
        flexGrow: 1,
    },
    header: {
        marginVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    avatarContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#f0f0f0',
    },
    name: {
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 10,
    },

    section: {
        marginTop: 30,
    },
    sectionTitle: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    label: {
        marginTop: 10,
        fontSize: 14,
    },
    percentage: {
        marginTop: 5,
        fontSize: 12,
        color: 'gray',
    },
    competence: {
        marginTop: 5,
        fontSize: 14,
        fontWeight: '500',
    },
})