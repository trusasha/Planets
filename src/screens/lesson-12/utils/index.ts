import getRandomNumber from "../../../utils/get-random-number";

export interface ISphere {
  x: number;
  y: number;
  z: number;
  radius: number;
}

export interface IBox {
  x: number;
  y: number;
  z: number;
  width: number;
  height: number;
  depth: number;
}

class PhysicsUtils {
  public static getRandomObject() {
    if (getRandomNumber(1, 10) > 5) {
      return this.getRandomSphere();
    }
  
    return this.getRandomBox();
  }

  public static getRandomBox(): IBox {
    return {
      width: getRandomNumber(1, 10) * 0.2,
      height: getRandomNumber(1, 10) * 0.2,
      depth: getRandomNumber(1, 10) * 0.2,
      x: getRandomNumber(-5, 5),
      y: getRandomNumber(1, 10),
      z: getRandomNumber(-5, 5),
    }
  };

  public static getRandomSphere() {
    return {
      radius: getRandomNumber(1, 10) * 0.1,
      x: getRandomNumber(-5, 5),
      y: getRandomNumber(1, 10),
      z: getRandomNumber(-5, 5),
    }
  }
}

export default PhysicsUtils;