import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: 'rgb(0,106,231)'
    },
    taskW: {
        flex: 2,
        height: '120%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 30,
        justifyContent: "space-between"
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
        alignItems: 'center',
    },
    checkbox: {
        alignSelf: "center",
    },
})

export default styles