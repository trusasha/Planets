import colors from "@constants/colors";
import { Dimensions, StyleSheet } from "react-native";

const {width} = Dimensions.get('screen')

export const FULL_SIZE = width - 18 * 2;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    backgroundColor: colors.lighterBlack,
    height: 500,
    borderRadius: 12,
    marginRight: 9,
    width: FULL_SIZE,
    overflow: 'hidden',
  },
  preview: {
    ...StyleSheet.absoluteFillObject,
    height: 200,
  },
  content: {
    marginTop: 150,
    paddingTop: 24,
    paddingHorizontal: 18,
    flex: 1,
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
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: 50,
    zIndex: 1,
  },
  closeIcon: {
    position: 'absolute',
    padding: 10,
    zIndex: 1,
    top: 16,
    left: 16,
  },
  mb16: {
    marginBottom: 16,
  },
  mb6: {
    marginBottom: 6,
  },
})

export default styles