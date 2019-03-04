import * as Keychain from "react-native-keychain";

export const hasPinCode = (serviceName: string) =>
  Keychain.getInternetCredentials(serviceName).then(
    res => !!res && !!res.password
  );

export const deletePinCode = (serviceName: string) =>
  Keychain.resetInternetCredentials(serviceName);
