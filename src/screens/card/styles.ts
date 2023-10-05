import colors from "@constants/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: 18,
  },
  item: {
    backgroundColor: `${colors.white}09`,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: `${colors.white}50`,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
  },
  itemDisabled: {
    opacity: 0.5,
  },
  mb16: {
    marginBottom: 16,
  },
  mb6: {
    marginBottom: 6,
  },
})

export default styles