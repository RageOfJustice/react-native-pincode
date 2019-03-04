"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Keychain = require("react-native-keychain");
exports.hasPinCode = (serviceName) => Keychain.getInternetCredentials(serviceName).then(res => !!res && !!res.password);
exports.deletePinCode = (serviceName) => Keychain.resetInternetCredentials(serviceName);
