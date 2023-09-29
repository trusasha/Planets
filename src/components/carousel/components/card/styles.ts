import colors from "@constants/colors";
import { Dimensions, StyleSheet } from "react-native";

const {width} = Dimensions.get('screen')

export const FULL_SIZE = width - 18 * 2;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lighterBlack,
    height: 500,
    borderRadius: 12,
    marginRight: 9,
    width: FULL_SIZE,
    overflow: 'hidden',
  },
})

export default styles