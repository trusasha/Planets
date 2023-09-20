const shader = {
  vertex: `
    attribute vec3 position;
    attribute vec2 uv; // Добавляем атрибут для текстурных координат
    varying vec2 vUv;
    uniform mat4 projectionMatrix;
    uniform mat4 modelViewMatrix;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragment: `
    precision highp float;
    varying vec2 vUv;
    uniform float time;

    void main() {
      vec2 p = vUv;
      float colorIntensity = 1.0 + 0.2 * sin(time * 2.0 + length(p - vec2(0.5)) * 10.0);
      vec3 baseColor = vec3(0.5, 0.0, 0.5); // Основной цвет (фиолетовый)
      vec3 waveColor = vec3(1.0, 0.5, 1.0); // Цвет волнообразного эффекта (розовый)

      // Применяем волнообразное усиление цвета
      vec3 finalColor = mix(baseColor, waveColor, colorIntensity);

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
}

export default shader