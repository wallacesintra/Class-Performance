import {ScrollView, StyleSheet, View, Text, Image} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import * as Progress from 'react-native-progress';

export function DetailedStudentScreen() {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Student Performance</Text>
                <Ionicons name="download-outline" size={24} color="#000" />
            </View>

            {/* Avatar and Info */}
            <View style={styles.avatarContainer}>
                <Image
                    source={{ uri: 'https://avatars.githubusercontent.com/u/583231?v=4' }}
                    style={styles.avatar}
                />
                <Text style={styles.name}>Liam Harper</Text>
            </View>


            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Letter Identification</Text>
                <Text style={styles.label}>Work Progress</Text>
                <Progress.Bar progress={0.8} width={null} color="black" unfilledColor="#E5E5E5" height={8} borderWidth={0} />
                <Text style={styles.percentage}>80%</Text>
                <Text style={[styles.competence, { color: 'limegreen' }]}>Competence Level: ME</Text>
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