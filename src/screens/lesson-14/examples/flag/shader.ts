const shader = {
  vertex: `
    uniform mat4 projectionMatrix;
    uniform mat4 viewMatrix;
    uniform mat4 modelMatrix;
    uniform vec2 uFrequency;
    uniform float uTime;

    attribute vec3 position;
    attribute vec2 uv;

    varying vec2 vUv;
    varying float vElevation;

    void main()
    {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);

        float elevation = sin(modelPosition.x * uFrequency.x - uTime) * 0.1;
        elevation += sin(modelPosition.y * uFrequency.y - uTime) * 0.1;

        modelPosition.z += elevation;

        vec4 viewPosition = viewMatrix * modelPosition;
        gl_Position = projectionMatrix * viewPosition;

        vUv = uv;
        vElevation = elevation;
    }
  `,
  fragment: `
    precision mediump float;

    uniform vec3 uColor;
    uniform sampler2D uTexture;

    varying vec2 vUv;
    varying float vElevation;

    void main()
    {
      vec4 textureColor = texture2D(uTexture, vUv);
      textureColor.rgb += vElevation * 2.0 - 0.2;
      gl_FragColor = textureColor;
    }
  `,
};

export default shader