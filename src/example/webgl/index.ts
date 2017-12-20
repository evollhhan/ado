import './geometry-console';
import Visual from './core';

export default function main() {
  // buffer Data
  const testData = [10, 20, 30, 40, 50, 10, 20, 30, 40, 50];
  const bufferList = [];
  for (let i = 0; i < testData.length; i += 1) {
    const buf = new Uint8Array(12);
    buf[0] = buf[2] = buf[3] = buf[5]
           = buf[6] = buf[7] = buf[8]
           = buf[9] = buf[10] = buf[11] = 0;
    buf[1] = buf[4] = testData[i];
    bufferList.push(buf);
  }

  // create Visual
  const visual = new Visual(24, 50);
  visual.loadBufferAttr(bufferList);
  visual.createStage();
  visual.play();
}
