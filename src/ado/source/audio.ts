/**
 * HTMLAudioElement Source
 *
 * ATTENTION：
 * [1] 在ios较低版本中无法通过js控制静音，需要用户行为触发。
 * [2] ios默认无法自动播放音频，需要在用户执行任意操作之后才能触发。
 */
export default class AudioSource implements IAudioPlayer {
  /** URL地址 */
  public src: string;
  /** 音频时长 */
  public duration: number;
  /** Audio标签 */
  private audio: HTMLAudioElement;
  /** 音频加载状态 */
  private ready: boolean;
  /** Promise.resolve */
  private res: any;
  /** Promise.reject */
  private rej: any;

  constructor() {
    this.init();
  }

  /** 初始化Audio标签 */
  private init() {
    // create audio element
    this.audio = document.createElement('audio');

    // canplaythrough
    this.audio.addEventListener('canplaythrough', this.checkLoadStatus.bind(this));

    // load event
    // sometimes canplaythrough may not trigger
    this.audio.addEventListener('load', this.checkLoadStatus.bind(this));

    // error handler
    this.audio.addEventListener('error', e => {
      if (this.rej) {
        this.rej(e);
      }
    });
  }

  /** 检查加载状态 */
  private checkLoadStatus() {
    if (this.ready) {
      return;
    }

    this.ready = true;
    this.duration = this.audio.duration;

    if (this.res) {
      this.res();
    }
  }

  /**
   * 加载音乐。
   * @param src 音频URL地址
   * @param crossOrigin 跨域配置
   */
  public load(src: string, crossOrigin: string = 'anonymous'): Promise<void> {
    if (!src) {
      throw new Error('src is not defined.');
    }

    this.ready = false;
    this.audio.crossOrigin = crossOrigin;
    this.audio.src = this.src;

    return new Promise((res, rej) => {
      this.res = res;
      this.rej = rej;

      // you may need this in ios.
      if (this.audio.load) {
        this.audio.load();
      }

      // if audio is in cache
      if (this.audio.readyState > 3) {
        this.checkLoadStatus();
      }
    });
  }

  /** 播放音频 */
  public play(): void {
    this.audio.play();
  }

  /** 暂停播放 */
  public pause(): void {
    this.audio.pause();
  }

  /** 停止播放 */
  public stop(): void {
    this.pause();
    this.audio.currentTime = 0;
  }

  /** 重播 */
  public replay(): void {
    this.stop();
    this.play();
  }

  /**
   * 静音
   * @param mute 是否静音
   */
  public mute(mute: boolean = true): void {
    this.audio.muted = mute;
  }
}
