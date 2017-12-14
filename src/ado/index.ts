const DEFAULT_SCRIPTPROCESSCONFIG = {
  bufferSize: 0,
  numberOfInputChannels: 2,
  numberOfOutputChannels: 2
}

/**
 *
 * PipeNode
 * --------
 */
class PipeNode {
  public exportNode: AudioNode;
  constructor(node: AudioNode) {
    this.exportNode = node;
  }
}

/**
 *
 * Sounder
 * -------
 */
class Sounder {
  public src: string;
  private ctx: AudioContext;
  private audio: HTMLAudioElement;
  private sound: MediaElementAudioSourceNode;
  private currentNode: AudioNode;
  private seal: boolean;

  constructor(ctx: AudioContext) {
    this.ctx = ctx;
    this.audio = new Audio();
    this.sound = this.ctx.createMediaElementSource(this.audio);
    this.currentNode = this.sound;
    this.seal = false;
  }

  public pipe(node: AudioNode): Sounder;
  public pipe(node: PipeNode): Sounder;
  public pipe(node: any): Sounder {
    if (node instanceof PipeNode) {
      this.currentNode.connect(node.exportNode);
      this.currentNode = node.exportNode;
    } else {
      this.currentNode.connect(node);
      this.currentNode = node;
    }
    return this;
  }

  public loop(isLoop: boolean): Sounder {
    this.audio.loop = isLoop;
    return this;
  }

  public play(time?: number): Sounder {
    if (time) { this.audio.currentTime = time; }

    if (this.seal) {
      this.audio.play();
    } else {
      this.seal = true;
      this.currentNode.connect(this.ctx.destination);
      this.audio.addEventListener('canplay', () => {
        this.audio.play();
      })

      if (!this.src) {
        console.warn('No media source found.');
      } else {
        this.audio.src = this.src;
      }
    }

    return this;
  }

  public pause(): Sounder {
    this.audio.pause();
    return this;
  }
}

/**
 *
 * Processor
 * ---------
 */
class Processor extends PipeNode {
  private node: ScriptProcessorNode;
  private handled: boolean;
  constructor(ctx: AudioContext, param: IProcessorConf = {}) {
    const conf = {...DEFAULT_SCRIPTPROCESSCONFIG, ...param}
    const node = ctx.createScriptProcessor(
      conf.bufferSize,
      conf.numberOfInputChannels,
      conf.numberOfOutputChannels
    );
    super(node);
    this.handled = false;
    this.node = node;
  }

  private checkHandler(): boolean {
    if (this.handled) {
      console.warn('Dupiclate handler on ado.processor.')
      return false;
    }
    return true;
  }

  public useMixer(cb: (input: number, index: number, channel: number) => number) {
    this.useHandler((ev) => {
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

  public useHandler(cb: (ev: AudioProcessingEvent) => void) {
    if (!this.checkHandler()) { return; }
    this.handled = true;
    this.node.onaudioprocess = cb.bind(null);
  }
}

/**
 * Class Ado
 */
export class Ado {
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