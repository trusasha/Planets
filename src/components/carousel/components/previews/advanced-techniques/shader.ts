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

        float distanceFromZAxis = abs(modelPosition.x);
        float deformation = pow(distanceFromZAxis, 1.2);

        modelPosition.y += (aRandom - 0.5) * deformation;

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
        float normalizedRandom = clamp(vRandom, 0.0, 1.0);
    
        vec3 redOrange = vec3(1.0, 0.27, 0.0); // More reddish-orange
        vec3 yellowOrange = vec3(1.0, 0.55, 0.0); // More yellowish-orange
        vec3 color = mix(redOrange, yellowOrange, normalizedRandom);
    
        gl_FragColor = vec4(color, 1.0);
    }
  `,
};

const bottomShader = {
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

        float distanceFromZAxis = abs(modelPosition.x);
        float deformation = pow(distanceFromZAxis, 1.2);

        modelPosition.y += (aRandom - 0.5) * deformation;

        vRandom = aRandom;

        vec4 viewPosition = viewMatrix * modelPosition;
        gl_Position = projectionMatrix * viewPosition;
    }
  `,
  fragment: `
    precision mediump float;

    uniform vec3 color;
    varying float vRandom;
    
    void main()
    {
      gl_FragColor = vec4(color, 1.0);
    }
  `,
};

export {shader, bottomShader}