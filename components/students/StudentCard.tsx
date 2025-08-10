import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Student } from "@/types/students/Students";


type studentCardProps = {
    studentId: string;
    studentName: string;
    competence: string;
    onPress: (studentId: string) => void;
}

export function getColor(code: string): string {
    switch (code) {
        case 'BE':
            return '#B22222';
        case 'AE':
            return '#BDB76B';
        case 'ME':
            return '#00FF00';
        case 'EE':
            return '#0000FF';
        default:
            return 'gray';
    }
}


const StudentCard = ({ studentId,studentName,competence ,onPress }: studentCardProps) => {
    // const { name, competence } = student;

    const competenceColor = getColor(competence);

    return (
        <TouchableOpacity onPress={() => onPress(studentId)} style={styles.container}>
            <Image
                source={require('../../assets/student_avatar.jpg')}
                style={styles.avatar}
            />
            <View style={styles.textContainer}>
                <Text style={styles.name}>{studentName}</Text>
                <Text style={[styles.competence, { color: competenceColor || 'gray' }]}>
                    {competence}
                </Text>
            </View>
            <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        gap: 12,
        borderBottomWidth: 0.5,
        borderColor: '#ccc',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    textContainer: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
    competence: {
        fontSize: 14,
        marginTop: 2,
    },
    arrow: {
        fontSize: 24,
        color: '#888',
    },
});


export default StudentCard;