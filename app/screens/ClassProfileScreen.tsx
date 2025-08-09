import {
    View,
    StyleSheet,
    Text,
    TextInput,
    ScrollView,
    Pressable,
    FlatList,
    Modal
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import {useEffect, useState} from "react";
import {AppTab} from "@/components/AppTab";
import StudentCard from "@/components/students/StudentCard";
import {useDispatch, useSelector} from "react-redux";
import {studentsRootState} from "@/redux/studentStore";
import {getClassProfile} from "@/redux/class/classProfileSlice";
import * as Progress from 'react-native-progress';
import {StrandDetail} from "@/types/class/Strands";
import {useNavigation} from "@react-navigation/native";


export function ClassProfileScreen() {
    const dispatch = useDispatch();
    const navigation = useNavigation()

    const classProfileState = useSelector((state: studentsRootState) => state.classProfile);
    const [selectedTab, setSelectedTab] = useState('Letter Identification');
    const [currentStrand, setCurrentStrand] = useState<StrandDetail | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    console.log(classProfileState);

    useEffect(() => {
        // @ts-ignore
        dispatch(getClassProfile());
    }, [dispatch]);


    useEffect(() => {
        if (!classProfileState.strands || classProfileState.loading) return;

        const filteredStrands = classProfileState.strands.filter(
            (strand) => strand.strand === selectedTab
        );

        setCurrentStrand(filteredStrands[0]);
    }, [selectedTab, classProfileState.strands, classProfileState.loading]);



    console.log(classProfileState);

    const [search, setSearch] = useState('');
    // @ts-ignore
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

                  <Modal
                      visible={modalVisible}
                      onRequestClose={() => setModalVisible(false)}
                  >
                      <Text>Performance Keys</Text>
                      <View style={styles.popContainer}>

                          <View>
                              <Text></Text>
                          </View>
                      </View>


                  </Modal>
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


              <View style={styles.strandContainer}>
                  {classProfileState.loading ? (
                      <Text>Loading strands...</Text>
                  ) : classProfileState.error ? (
                      <Text style={{color: 'red'}}>Error: {classProfileState.error}</Text>
                  ) : classProfileState.strands.length === 0 ? (
                      <Text>No strands available</Text>
                  ) : currentStrand ? (
                      <View>
                          <View style={styles.strandProgressContainer}>
                              <Text style = {styles.workCovered}>Work Covered</Text>
                              <Progress.Bar
                                  progress={currentStrand.workCovered / 100}
                                  width={null}
                                  color="black"
                                  unfilledColor="#E5E5E5"
                                  height={8}
                                  borderWidth={0}
                              />
                              <Text style={styles.percentage}> {`${currentStrand.workCovered} %`}</Text>
                          </View>

                          <FlatList
                              data={currentStrand.students}
                              keyExtractor={(student) => student.studentId}
                              renderItem={({item: student}) => (
                                  <StudentCard
                                      studentId={student.studentId}
                                      studentName={student.name}
                                      competence={student.competence}
                                      onPress={(studentId) =>
                                          // console.log(`student id : ${studentId}`)
                                          navigation.navigate('StudentScreen', { studentId: studentId })
                                      }
                                  />
                              )}
                          />
                      </View>
                  ) : (
                      <Text>Select a strand to view details</Text>
                  )}
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
    popContainer: {
        // flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        width: '40%',
        alignSelf: 'flex-end',
        padding: 20,
        paddingTop: 15,
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
    strandContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },

    strandProgressContainer: {
        flexDirection: 'column',
        gap: 10,
        marginVertical: 10,
        marginBottom: 15,
    },
    workCovered: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    percentage: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});