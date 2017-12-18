type TOscillatorType = 'sine' | 'square' | 'sawtooth' | 'triangle' | 'sine';

interface IAdoOscillatorConf {
  frequency?: number;
  detune?: number;
  type?: TOscillatorType;
}