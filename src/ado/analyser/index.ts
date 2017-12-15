import PipeNode from '../core/pipe-node';

type TRegion = 'T' | 'F';
type TArrayType = 'f' | 'b';

interface IAdoAnalyserConf {
  /** 设定FFT大小，默认为 8 */
  fftSize?: number;
  /** 频域 / 时域，默认为时域 */
  region?: TRegion;
  /** 数组类型：Float32 / Uint8，默认为Uint8 */
  type?: TArrayType;
}

export default class AdoAnalyser extends PipeNode {
  /** 分析节点 */
  public node: AnalyserNode;
  /** 采样数量 */
  public frequencyBinCount: number;
  /** 更新采样数据 */
  public update: (data?: Uint8Array | Float32Array) => void;
  /** 配置 */
  private conf: IAdoAnalyserConf;

  /**
   * 创建一个分析器。
   * @param conf 分析器配置
   */
  constructor(conf: IAdoAnalyserConf = {}) {
    super();
    this.conf = {
      ...{
        fftSize: 8,
        region: 'T',
        type: 'b'
      },
      ...conf
    };
  }

  /**
   * 创建更新器
   * @param region 域类
   * @param type 数组类型
   */
  private createUpdater(region: TRegion, type: TArrayType): void {
    this.update = region === 'F'
      ? type === 'f'
        ? this.node.getFloatFrequencyData
        : this.node.getByteFrequencyData
      : type === 'f'
        ? this.node.getFloatFrequencyData
        : this.node.getByteTimeDomainData;
  }

  protected main(): void {
    this.node = this.ctx.createAnalyser();
    this.node.fftSize = this.conf.fftSize;
    this.frequencyBinCount = this.node.frequencyBinCount;
    this.createUpdater(this.conf.region, this.conf.type);
  }
}
