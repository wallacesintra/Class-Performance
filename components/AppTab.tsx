import {
    Pressable,
    Text,
    StyleSheet
} from "react-native";

type TabProps = {
    tab: string;
    isSelected: boolean;
    onPress: (tab: string) => void;
    index?: number; // Optional, if you need it
}

export function AppTab({ tab, isSelected, onPress, index }: TabProps) {
    return (
        <Pressable
            onPress={() => onPress(tab)}
            style={[styles.tab, isSelected && styles.activeTab]}
        >
            <Text style={[styles.tabText, isSelected && styles.activeTabText]}>{tab}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    tab: {
        backgroundColor: '#D2E0ED',
        borderRadius: 20,
        paddingVertical: 6,
        paddingHorizontal: 12,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    activeTab: {
        backgroundColor: '#0057ff',
    },
    tabText: {
        color: '#61758A',
    },
    activeTabText: {
        color: '#fff',
    },
});