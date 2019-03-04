import * as Keychain from "react-native-keychain";
export const hasPinCode = (serviceName) => Keychain.getInternetCredentials(serviceName).then(res => !!res && !!res.password);
export const deletePinCode = (serviceName) => Keychain.resetInternetCredentials(serviceName);
