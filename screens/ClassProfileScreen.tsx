import {
    View,
    StyleSheet,
    Text,
    TextInput,
    ScrollView,
    Pressable,
    FlatList,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import {useEffect, useState} from "react";
import {AppTab} from "@/components/AppTab";
import StudentCard from "@/components/students/StudentCard";
import {useDispatch, useSelector} from "react-redux";
import {studentsRootState} from "@/redux/students/studentStore";
import {getClassProfile} from "@/redux/class/classProfileSlice";


const students = [
    { studentId: 'student1', name: 'John Doe', competence: 'ME' },
    { studentId: 'student2', name: 'Sophia Bennett', competence: 'AE' },
    { studentId: 'student3', name: 'Olivia Foster', competence: 'EE' },
    // Add more students here
];

export function ClassProfileScreen() {
    const dispatch = useDispatch();

    const classProfileState = useSelector((state: studentsRootState) => state.classProfile);

    useEffect(() => {
        dispatch(getClassProfile());
    }, []);

    const [search, setSearch] = useState('');
    const [selectedTab, setSelectedTab] = useState('Letter Identification');
      return(
          <View style={styles.container}>
                <View>
                    <Text style={styles.title}>Class Profile</Text>
                </View>
              <View style={{height: 20}}></View>
              <View style={styles.searchContainer}>
                  <Ionicons name="search" size={18} color="#61758A" />
                  <TextInput
                      placeholder="Search students"
                      style={styles.input}
                      value={search}
                      onChangeText={setSearch}
                      placeholderTextColor="#61758A"
                  />
                  <Ionicons name="options-outline" size={18} color="#000" />
              </View>

              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabScroll}>
                  {['Letter Identification', 'Letter Naming', 'Letter Formation', 'Phonemic Awareness'].map((tab, index) => (
                      <AppTab
                          key = {tab}
                          tab={tab}
                          index={index}
                          isSelected={selectedTab == tab}
                          onPress={ () => setSelectedTab(tab)}
                          // style= {index === 0 ? {marginLeft: 20} : {}}
                      />
                  ))}
              </ScrollView>

              <View>
                  <FlatList
                      data={students}
                      keyExtractor={(item) => item.studentId}
                      renderItem={({ item }) => (
                          <StudentCard student={item} onPress={() => console.log(item.name)} />
                      )}
                  />
              </View>

              <View>
                  <Text>{classProfileState.strands.length}</Text>
                  <Text>{classProfileState.error}</Text>
                  <Text>{classProfileState.loading}</Text>
              </View>
          </View>
      )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        gap: 10,
        backgroundColor: '#FFFFFF',
        paddingTop: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
        borderWidth: 1,
        backgroundColor: '#F0F2F5',
        borderColor: '#F0F2F5',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 8,
        margin: 20

    },
    input: {
        flex: 1,
        marginLeft: 10,
    },
    tabScroll: {
        flexDirection: 'row',
        // gap: 20,
        marginHorizontal: 20,
        maxHeight: 60
        // marginBottom: 10,
    },
})