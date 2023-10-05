import colors from "@constants/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    minHeight: 40,
    flex: 1,
    marginBottom: 18,
    zIndex: 10,
    justifyContent: 'center',
  },
  containerAbsolute: {
    position: 'absolute',
    left: 18,
    right: 18,
  },
  backIcon: {
    position: 'absolute',
    left: 0,
    alignSelf: 'center',
    width: 40,
    height: 40,
    backgroundColor: colors.white,
    borderRadius: 40,
  },
  title: {
    alignSelf: 'center',
  },
})

export default styles