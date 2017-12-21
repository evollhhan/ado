import './geometry-console';
import Visual from './core';
import { Player, Context } from '../../ado';

export default async function main() {
  const player = new Player();
  await player.load('./docs/music.mp3');
  const ctx = new Context();
  const source = ctx.createSourceNode(player);
  const analyser = ctx.createAnalyser({ fftSize: 64, region: 'F' });
  const bufLen = analyser.frequencyBinCount;
  const bufData = new Uint8Array(bufLen);

  source.connect(analyser);
  analyser.output();

  // buffer Data
  // const testData = [10, 20, 30, 40, 50, 10, 20, 30, 40, 50];
  const bufferList = [];
  for (let i = 0; i < 24; i += 1) {
    const buf = new Uint8Array(4);
    buf[0] = buf[1] = bufData[i];
    bufferList.push(buf);
  }

  // create Visual
  const visual = new Visual(24, 50);
  visual.loadBufferAttr(bufferList);
  visual.createStage();

  visual.onRender(() => {
    analyser.update(bufData);
    bufferList.forEach((b, i) => {
      b[0] = b[1] = bufData[i];
    });
  });

  window.addEventListener('click', () => {
    console.log(bufData);
  });

  // play
  visual.play();
  player.play();
}
