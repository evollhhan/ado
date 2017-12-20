const { THREE } = window;

const vertexShader = `
  attribute vec3 displacement;
  varying vec3 vPosition;

  void main() {
    vPosition = position + displacement;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(vPosition, 1.0);
  }
`;

const fragmentShader = `
  varying vec3 vPosition;
  const float PI = 3.1415927;

  void main() {
    float r = vPosition.y / 255.0;
    gl_FragColor = vec4(r, 0.0, 0.0, 1.0);
  }
`;

export default new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  side: THREE.DoubleSide,
  transparent: true
});
