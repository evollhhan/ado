import PipeNode from '../core/pipe-node';

export default class AdoOscillator extends PipeNode {
  /** 波形节点 */
  public readonly node: OscillatorNode;

  /**
   * 创建一个周期波形
   * MDN: https://developer.mozilla.org/zh-CN/docs/Web/API/OscillatorNode
   * @param ctx 音频上下文
   */
  constructor(ctx: AudioContext, conf: IAdoOscillatorConf = {}) {
    super(ctx);
    conf = {
      ...{
        frequency: 440,
        detune: 0,
        type: 'sine'
      },
      ...conf
    };
    this.node = this.ctx.createOscillator();
    this.node.frequency.value = conf.frequency;
    this.node.detune.value = conf.detune;
    this.node.type = conf.type;
  }
}
