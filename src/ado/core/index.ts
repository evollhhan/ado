import AdoPlayer from '../source/audio';
import SourceNode from '../source/source-node';
import AdoAnalyser from '../analyser/index';
import AdoProcessor from '../processor/index';

/**
 * Ado Context
 */
export default class AdoContext {
  /** audio context */
  public ctx: AudioContext;

  /** 创建一个Audio上下文。 */
  constructor() {
    const context = window.AudioContext || window.webkitAudioContext;
    this.ctx = new context();
  }

  /**
   * 创建一个输入源节点
   * @param source 输入源
   */
  public createSourceNode(source: AdoPlayer): SourceNode {
    return new SourceNode(this.ctx, source);
  }

  /**
   * 创建一个分析器
   * @param conf 分析器配置
   */
  public createAnalyser(conf: IAdoAnalyserConf = {}): AdoAnalyser {
    return new AdoAnalyser(this.ctx, conf);
  }

  /**
   * 创建一个处理单元
   * @param conf 处理单元配置
   */
  public createProcessor(conf: IAdoProcessorConf = {}): AdoProcessor {
    return new AdoProcessor(this.ctx, conf);
  }
}
