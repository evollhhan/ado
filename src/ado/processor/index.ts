import PipeNode from '../core/pipe-node';

interface IAdoProcessorConf {
  /** 缓冲区大小 */
  bufferSize?: number;
  /** 输入通道数 */
  numberOfInputChannels?: number;
  /** 输出通道数 */
  numberOfOutputChannels?: number;
}

export default class AdoProcessor extends PipeNode {
  /** Processor配置 */
  public config: IAdoProcessorConf;
  /**
   * 初始化Processor
   * @param conf 配置
   */
  constructor(conf: IAdoProcessorConf = {}) {
    super();
    this.config = {
      ...{
        bufferSize: 1024,
        numberOfInputChannels: 2,
        numberOfOutputChannels: 2
      },
      ...conf
    };
  }

  public main(): AudioNode {
    const node = this.ctx.createScriptProcessor(
      this.config.bufferSize,
      this.config.numberOfInputChannels,
      this.config.numberOfOutputChannels
    );
    return node;
  }
}
