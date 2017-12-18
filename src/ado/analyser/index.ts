import PipeNode from '../core/pipe-node';

export default class AdoAnalyser extends PipeNode {
  /** 分析节点 */
  public readonly node: AnalyserNode;
  /** 采样数量 */
  public readonly frequencyBinCount: number;
  /** 跟新器名称 */
  private updater: string;
  /** 配置 */
  private conf: IAdoAnalyserConf;

  /**
   * 创建一个分析器。
   * @param ctx 上下文
   * @param conf 分析器配置
   */
  constructor(ctx: AudioContext, conf: IAdoAnalyserConf) {
    super(ctx);
    this.conf = {
      ...{
        fftSize: 32,
        region: 'T',
        type: 'b'
      },
      ...conf
    };
    this.node = this.ctx.createAnalyser();
    this.node.fftSize = this.conf.fftSize;
    this.frequencyBinCount = this.node.frequencyBinCount;
    this.createUpdater(this.conf.region, this.conf.type);
  }

  /**
   * 创建更新器
   * @param region 域类
   * @param type 数组类型
   */
  private createUpdater(region: TRegion, type: TArrayType): void {
    this.updater = region === 'F'
      ? type === 'f'
        ? 'getFloatFrequencyData'
        : 'getByteFrequencyData'
      : type === 'f'
        ? 'getFloatFrequencyData'
        : 'getByteTimeDomainData';
  }

  /**
   * 更新音频采样数据
   * @param data 需要更新的buffer对象
   */
  public update(data?: Uint8Array | Float32Array): void {
    this.node[this.updater](data);
  }
}
