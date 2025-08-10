import {
    View,
    StyleSheet,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
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
                <View style={styles.header}>
                    <Text style={styles.title}>Class Profile</Text>

                    <Pressable
                        style={styles.infoButton}
                        onPress={() => setModalVisible(true)}>
                        <Ionicons name="help-outline" size={28} color="black" />
                    </Pressable>
                </View>


              {/* Modal Popup */}
              <Modal
                  animationType="fade"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => setModalVisible(false)}
              >
                  <View style={styles.overlay}>
                      <View style={styles.modalContent}>
                          <View style={styles.modalTitleContainer}>
                              <Text style={styles.modalTitle}>Performance Keys</Text>
                              <Ionicons
                                  name={'close-circle-outline'}
                                  size={24}
                                  color={'black'}
                                  onPress={() => setModalVisible(false)}
                              />
                          </View>

                          <View style={styles.keyContainer}>
                              <Text style={[styles.keyText, { color: "#B22222" }]}>
                                  BE - Below Expectation
                              </Text>
                              <Text style={{ color: "#CD5C5C" }}>
                                  Need significant support
                              </Text>
                          </View>

                          <View style={styles.keyContainer}>
                              <Text style={[styles.keyText, { color: "#BDB76B" }]}>
                                  AE - Approaching Expectation
                              </Text>
                              <Text style={{ color: "#BDB76B" }}>
                                  Developing with some support needed
                              </Text>
                          </View>

                          <View style={styles.keyContainer}>
                              <Text style={[styles.keyText, { color: "#00FF00" }]}>
                                  ME - Meeting Expectation
                              </Text>
                              <Text style={{ color: "#90EE90" }}>
                                  Consistently meets standards
                              </Text>
                          </View>

                          <View style={styles.keyContainer}>
                              <Text style={[styles.keyText, { color: "#0000FF" }]}>
                                  EE - Exceeding Expectation
                              </Text>
                              <Text style={{ color: "#4169E1" }}>
                                  Advanced mastery achieved
                              </Text>
                          </View>

                      </View>
                  </View>
              </Modal>

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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    infoButton: {
        position: 'absolute',
        right: 20,
        top: 10,
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
        marginBottom: 40,
    },
    workCovered: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    percentage: {
        fontSize: 16,
        fontWeight: 'bold',
    },

    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 15,
        width: "85%",
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitleContainer: {
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "left",
    },
    keyContainer: {
        marginBottom: 12,
    },
    keyText: {
        fontWeight: "bold",
    },
    closeButton: {
        marginTop: 10,
        backgroundColor: "#333",
        paddingVertical: 8,
        borderRadius: 8,
        alignItems: "center",
    },
});