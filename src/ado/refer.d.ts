type AnyFunction = (...args: any[]) => any;

interface Window {
  AudioContext: any;
  webkitAudioContext: any;
}