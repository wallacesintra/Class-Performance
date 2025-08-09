
import { Platform, StyleSheet } from 'react-native';
import {Provider as ReduxProvider} from 'react-redux';
import studentStore from "@/redux/studentStore";
import NavHost from "@/app/NavHost";

export default function HomeScreen() {
  return (

      <ReduxProvider store={studentStore}>
        {/*<ClassProfileScreen/>*/}
        <NavHost/>
      </ReduxProvider>
      // <NavHost/>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
