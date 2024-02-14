import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 20,
  },
  commonRowContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  commonTextInput: {
    marginTop: 8,
    width: 370,
    height: 58,
    padding: 10,
    backgroundColor: '#F4F4F4',
    borderRadius: 15,
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