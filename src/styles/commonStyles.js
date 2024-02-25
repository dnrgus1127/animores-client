import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  commonRowContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  headerTitleWrap: { 
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#fff",
    height: 60,
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    color: '#2D2D2D',
    fontSize: 18,
  },
  basicCheckbox: {
    borderColor: '#DBDBDB',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    width: 20,
    height: 20,
    marginRight: 5,
    alignItems: 'center',
  },
  checked: {
    borderColor: '#FB3F7E',
    backgroundColor: '#FB3F7E',
  },
  disabled: {
    backgroundColor: '#DBDBDB',
  },
  checkboxIcon: {
    width: 14,
    height: 10,
    marginTop: 1,
    marginLeft: 6,
  },
  separator: {
    flex: 1, 
    height: 1, 
    backgroundColor: '#AEAEAE',
  },
  verticalBar: {
    borderLeftWidth: 1, 
    borderLeftColor: '#AEAEAE', 
    height: 15, 
    marginLeft: 8, 
    marginRight: 8,
  },
})