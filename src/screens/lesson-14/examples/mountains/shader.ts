const shader = {
  vertex: `
    uniform mat4 projectionMatrix;
    uniform mat4 viewMatrix;
    uniform mat4 modelMatrix;
    attribute float aRandom;
    varying float vRandom;

    attribute vec3 position;

    void main()
    {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);

        modelPosition.z += aRandom * 0.04;

        vRandom = aRandom;

        vec4 viewPosition = viewMatrix * modelPosition;
        gl_Position = projectionMatrix * viewPosition;
    }
  `,
  fragment: `
    precision mediump float;

    varying float vRandom;

    void main()
    {
      gl_FragColor = vec4(0.5, vRandom, 1.0, 1.0);
    }
  `,
};

export default shader