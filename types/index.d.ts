export interface IAuthAppResponse {
  _id: string;
  expiresAt: string;
  appId: string;
}

export interface IStreamsResponse {
  _id: string;
  currentTitle: string;
  type: string;
  username: string;
  webhook: string;
  duration: number;
  jobKey: string;
  recording: boolean;
}
