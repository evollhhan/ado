import PipeNode from '../core/pipe-node';

export default class AdoProcessor extends PipeNode {
  constructor(ctx: AudioContext, id: number) {
    super(ctx, id);
  }
}
