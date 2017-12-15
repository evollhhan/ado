import * as Ado from './ado';

const stage = new Ado.Stage();

// new Element
const ele = stage.createElement();

// source node
const player = new Ado.Player();
const source = new Ado.SourceNode(player);
ele.append(source);

// processor node
const processor = new Ado.Processor();
source.append(processor);

// analayser node
const analayser = new Ado.Analayser();
processor.append(analayser);

// play music
player.play();
