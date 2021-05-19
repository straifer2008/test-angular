interface MediaRecordingVideoOptions {
  width?: number | { min?: number, max?: number, ideal?: number };
  height?: number | { min?: number, max?: number, ideal?: number };
  aspectRatio?: { ideal?: number };
  facingMode?: string | { exact?: string };
  deviceId?: string;
  cursor?: 'never' | 'always' | 'motion';
}

interface MediaRecordingAudioOptions {
  sampleSize?: number;
  channelCount?: number;
  echoCancellation?: boolean;
  noiseSuppression?: boolean;
  sampleRate?: number;
  deviceId?: string;
  frameRate?: number;
  cursor?: 'never' | 'always' | 'motion';
}

export interface MediaRecordingOptions {
  video?: MediaRecordingVideoOptions | boolean;
  audio?: MediaRecordingAudioOptions | boolean;
  cursor?: 'never' | 'always' | 'motion';
  frameRate?: number;
  logicalSurface?: boolean;
}
