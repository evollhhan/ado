/**
 * Class Ado
 */
class Ado {
  /** audio context */
  public ctx: AudioContext;

  constructor() {
    this.ctx = new AudioContext();
  }

  public load(input: string): Sounder {
    const sounder = new Sounder(this.ctx)
    sounder.src = input;
    return sounder;
  }

  public createAnalyser(config?: IAnalyserConf): AnalyserNode {
    const analyser = this.ctx.createAnalyser();
    if (config) {
      Object.keys(config).forEach(k => { analyser[k] = config[k]; })
    }
    return analyser;
  }

  public createProcessor(conf?: IProcessorConf, handler?: (ev: AudioProcessingEvent) => void): Processor {
    const processor = new Processor(this.ctx, conf);
    if (handler) {
      processor.useHandler(handler);
    }
    return processor;
  }
}

import Stage from './core/stage';
import Processor from './processor';
import Player from './source/audio';
import SourceNode from './source/source-node';

export {
  Stage,
  Player,
  Processor,
  SourceNode
};
