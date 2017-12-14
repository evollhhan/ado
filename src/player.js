import '@libs/orbit-control';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// shader
const vertexShader = `
  attribute float displacement;
  varying vec3 vPosition;

  void main() {
    const vec3 normal = vec3(0.0, 0.0, -1.0);
    vec3 origin = position + normal * displacement;
    float z = origin.z;
    vPosition = vec3(origin.xy, z);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(vPosition, 1.0);
  }
`;

const fragmentShader = `
  void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
`;

// music
const listener = new THREE.AudioListener();
camera.add(listener);
const sound = new THREE.Audio(listener);
const loader = new THREE.AudioLoader();
loader.load('music.mp3', buffer => {
  sound.setBuffer(buffer);
  sound.setLoop(true);
  sound.play();
})

const anaylser = new THREE.AudioAnalyser(sound);

const len = anaylser.frequencyBinCount;
const buf = new Uint8Array(len);

const attributes = {
  displacement: { type: 'f', value: [] }
}

const shaderMaterial = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader
})

// create ring
const geometry = new THREE.RingBufferGeometry(200, 201, 511);
geometry.addAttribute( 'displacement', new THREE.BufferAttribute( buf, 1 ) );
const ring = new THREE.Mesh(geometry, shaderMaterial);
// debugger;
scene.add(ring);

// create ring2
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const ring2 = new THREE.Mesh(geometry, material);
scene.add(ring2);

const controls = new THREE.OrbitControls(camera);
camera.position.set(0, 0, 600);
controls.update();

// animate
function animate() {
  requestAnimationFrame(animate);
  const data = anaylser.getFrequencyData();
  for(let i = 0; i < data.length; i++) {
    buf[i] = data[i];
  }
  ring.geometry.attributes.displacement.needsUpdate = true;
  controls.update();
  renderer.render(scene, camera);
}

window.scene = scene;

animate();
