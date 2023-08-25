/**
 * Brings the value to 0 after a specified step
 */
const animatePositionToInitial = (value: number, step: number) => {
  if (value > 0) {
    return Math.max(value - step, 0);
  } else if (value < 0) {
    return Math.min(value + step, 0);
  }

  return value;
}

export default animatePositionToInitial;