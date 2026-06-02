import * as SecureStore from "expo-secure-store";

const DEVICE_ID_KEY = "iamfit_device_id";
const DEVICE_NAME = "Mobile Device";

const createDeviceId = () =>
  `iamfit-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

export const getDeviceSession = async () => {
  let deviceId = await SecureStore.getItemAsync(DEVICE_ID_KEY);

  if (!deviceId) {
    deviceId = createDeviceId();
    await SecureStore.setItemAsync(DEVICE_ID_KEY, deviceId);
  }

  return {
    deviceId,
    deviceName: DEVICE_NAME,
  };
};

export const resetDeviceSession = async () => {
  await SecureStore.deleteItemAsync(DEVICE_ID_KEY);
};
