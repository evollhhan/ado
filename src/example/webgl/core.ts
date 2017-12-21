import '@libs/orbit-control';
import ShaderMaterial from './shader';
const { THREE } = window;

export default class Visual {
  public readonly barNum: number;
  public readonly r: number;
  public scene: any;
  public play: () => void;
  private camera: any;
  private renderer: any;
  // private material: any;
  private controls: any;
  private displacement: any[];
  private listOfGeom: any[];
  private renderCb: (...args: any[]) => void;
  // private now: number;

  /**
   * 根据配置初始化场景
   * @param barNum 柱子数量
   * @param r 半径
   */
  constructor(barNum: number, r: number) {
    // 用户配置初始化
    this.barNum = barNum;
    this.r = r;

    // 系统初始化
    this.init();
  }

  /** 系统初始化 */
  private init(): void {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // this.material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    // this.renderer.setClearColor(0x222222, 1);
    document.body.appendChild(this.renderer.domElement);
    this.controls = new THREE.OrbitControls(this.camera);
    this.camera.position.set(0, 130, 100);
    this.controls.update();
    this.play = this.playScene.bind(this);
    this.displacement = [];
    this.listOfGeom = [];
    // this.now = 0;

    window.scene = this.scene;
  }

  /**
   * 初始化buffer属性
   * @param bufferList buffer list
   */
  public loadBufferAttr(bufferList: Uint8Array[]): void {
    bufferList.forEach(buf => {
      this.displacement.push(new THREE.BufferAttribute(buf, 1));
    });
  }

  /** 创建场景 */
  public createStage(): void {
    const degreeStep = Math.PI * 2 / this.barNum;
    for (let i = 0; i < this.barNum; i++) {
      const degree = degreeStep * i;
      const geom = new THREE.PlaneBufferGeometry(10, 1);
      if (i < this.displacement.length) {
        geom.addAttribute('displacement', this.displacement[i]);
        this.listOfGeom.push(geom);
      }
      const shape = new THREE.Mesh(geom, ShaderMaterial);
      shape.position.x = this.r * Math.sin(degree);
      shape.position.z = this.r * Math.cos(degree);
      shape.rotation.y = degree;
      this.scene.add(shape);
    }
  }

  /** 当播放场景时 */
  public onRender(cb: (...args: any[]) => void): void {
    this.renderCb = cb.bind(null);
  }

  /** 播放场景 */
  public playScene(): void {
    requestAnimationFrame(this.play);

    // // lock frame
    // const now = Date.now();
    // if (now - this.now < 30) {
    //   return;
    // } else {
    //   this.now = now;
    // }

    this.renderCb();

    this.listOfGeom.forEach(geom => {
      geom.attributes.displacement.needsUpdate = true;
    });

    this.controls.update();
    this.renderer.render(this.scene, this.camera);

  }
}
