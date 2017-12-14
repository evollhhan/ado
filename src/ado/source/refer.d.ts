interface IAudioPlayer {
  /**
   * 加载音乐。
   * @param src 音频URL地址
   * @param crossOrigin 跨域配置
   */
  load(src: string, crossOrigin: string): Promise<void>;

  /** 播放音频 */
  play(): void;

  /** 暂停播放 */
  pause(): void;

  /** 停止播放 */
  stop(): void;

  /** 重播 */
  replay(): void;

  /**
   * 静音
   * @param mute 是否静音
   */
  mute(mute: boolean): void;
}
