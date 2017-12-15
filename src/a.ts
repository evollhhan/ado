import * as Ado from './ado';

const stage = new Ado.Stage();
const ele = stage.createElement();

// player
const player = new Ado.Player();
ele.input(player);

// processor
const processor = new Ado.Processor();
ele.append(processor);
