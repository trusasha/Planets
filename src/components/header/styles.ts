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
  back: {
    position: 'absolute',
    left: 0,
    justifyContent: 'center',
    alignSelf: 'center',
    width: 40,
    height: 40,
    backgroundColor: colors.white,
    borderRadius: 40,
  },
  icon: {
    left: 6,
  },
  title: {
    alignSelf: 'center',
  },
})

export default styles