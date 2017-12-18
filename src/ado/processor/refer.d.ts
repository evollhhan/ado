interface IAdoProcessorConf {
  /** 缓冲区大小 */
  bufferSize?: 256 | 512 | 1024 | 2048 | 4096 | 8192 | 16384;
  /** 输入通道数 */
  numberOfInputChannels?: number;
  /** 输出通道数 */
  numberOfOutputChannels?: number;
}
