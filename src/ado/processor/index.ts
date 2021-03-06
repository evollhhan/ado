import PipeNode from '../core/pipe-node';

export default class AdoProcessor extends PipeNode {
  /** Processor配置 */
  public readonly config: IAdoProcessorConf;
  /** Processor节点 */
  public readonly node: ScriptProcessorNode;
  /** 是否有处理方法 */
  private handled: boolean;

  /**
   * 初始化Processor
   * @param ctx 上下文
   * @param conf 配置
   */
  constructor(ctx: AudioContext, conf: IAdoProcessorConf) {
    super(ctx);
    this.config = {
      ...{
        bufferSize: 256,
        numberOfInputChannels: 1,
        numberOfOutputChannels: 1
      },
      ...conf
    };
    this.handled = false;
    this.node = this.ctx.createScriptProcessor(
      this.config.bufferSize,
      this.config.numberOfInputChannels,
      this.config.numberOfOutputChannels
    );
  }

  /**
   * 添加音频处理回调，对于逐个采样点的处理可以使用onSampling更为方便。
   * @param cb 音频处理回调方法，第一个参数为处理事件
   */
  public onProcessing(cb: (ev: AudioProcessingEvent) => void): void {
    if (this.handled) {
      console.warn('Dupiclate handler on ado processor.');
      return;
    }

    this.handled = true;
    this.node.onaudioprocess = cb.bind(null);
  }

  /**
   * 逐个采样点处理回调
   * @param cb 回调方法，回调参数依次为输入值、输入索引、通道索引，返回需要提供输出值。
   */
  public onSampling(cb: (input: number, index: number, channel: number) => number): void {
    this.onProcessing((ev) => {
      const inbuf = ev.inputBuffer;
      const oubuf = ev.outputBuffer;
      for (let i = 0; i < oubuf.numberOfChannels; i += 1) {
        const inData = inbuf.getChannelData(i);
        const ouData = oubuf.getChannelData(i);
        for (let j = 0; j < inData.length; j += 1) {
          ouData[j] = cb.call(null, inData[j], j, i);
        }
      }
    });
  }
}
