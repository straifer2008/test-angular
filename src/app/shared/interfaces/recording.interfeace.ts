interface MediaRecordingVideoOptions {
  width?: number | { min?: number, max?: number, ideal?: number };
  height?: number | { min?: number, max?: number, ideal?: number };
  aspectRatio?: { ideal?: number };
  facingMode?: string | { exact?: string };
  deviceId?: string;
}

interface MediaRecordingAudioOptions {
  sampleSize?: number;
  channelCount?: number;
}

export interface MediaRecordingOptions {
  video?: MediaRecordingVideoOptions | boolean;
  audio?: MediaRecordingAudioOptions | boolean;
  cursor?: 'never';
  frameRate?: number;
}
