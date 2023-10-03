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
  title: {
    fontSize: 28,
    color: colors.white,
    fontWeight: '700',
    marginBottom: 16,
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
  itemText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 6,
  },
  itemDescription: {
    color: colors.white,
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
})

export default styles