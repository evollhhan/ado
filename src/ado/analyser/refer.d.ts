type TRegion = 'T' | 'F';
type TArrayType = 'f' | 'b';

interface IAdoAnalyserConf {
  /**
   * 设定FFT大小，默认为32，可选的参数有：
   * 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096 | 8192 | 16384 | 32768;
   */
  fftSize?: 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096 | 8192 | 16384 | 32768;
  /**
   * 频域 - F，时域 - T，默认为时域
   */
  region?: TRegion;
  /**
   * 数组类型，默认为Uint8
   * Float32 - f
   * Uint8 - b
   */
  type?: TArrayType;
}
