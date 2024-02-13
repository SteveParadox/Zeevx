import {createClient, createMicrophoneAndCameraTracks} from "agora-rtc-react";

const appId = "d2c206b6e7cb403cafd16f56f487e0b9"
const token = "007eJxTYFi4ZhHPnIeR57WCa9eL/54h6m6yckFlO/97jV2f2s2FF35RYEgxSjYyMEsySzVPTjIxME5OTEsxNEszNUszsTBPNUiyZDp+KrUhkJHhKEcyMyMDBIL4LAy5iZl5DAwAeUAf4Q=="


export const config = { mode: "rtc", codec: "vp8",appId=appId, token=token};
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "main";