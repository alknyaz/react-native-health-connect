"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  getSdkStatus: true,
  initialize: true,
  openHealthConnectSettings: true,
  requestPermission: true,
  getGrantedPermissions: true,
  revokeAllPermissions: true,
  readRecords: true,
  readRecord: true,
  insertRecords: true,
  aggregateRecord: true,
  deleteRecordsByUuids: true,
  deleteRecordsByTimeRange: true,
  getChanges: true
};
exports.aggregateRecord = aggregateRecord;
exports.deleteRecordsByTimeRange = deleteRecordsByTimeRange;
exports.deleteRecordsByUuids = deleteRecordsByUuids;
exports.getChanges = getChanges;
exports.getGrantedPermissions = getGrantedPermissions;
exports.getSdkStatus = getSdkStatus;
exports.initialize = initialize;
exports.insertRecords = insertRecords;
exports.openHealthConnectSettings = openHealthConnectSettings;
exports.readRecord = readRecord;
exports.readRecords = readRecords;
exports.requestPermission = requestPermission;
exports.revokeAllPermissions = revokeAllPermissions;
var _reactNative = require("react-native");
var _errors = require("./errors");
var _constants = require("./constants");
Object.keys(_constants).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _constants[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _constants[key];
    }
  });
});
const LINKING_ERROR = `The package 'react-native-health-connect' doesn't seem to be linked. Make sure: \n\n` + _reactNative.Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo Go\n';
const PLATFORM_NOT_SUPPORTED_ERROR = `Platform not supported. This package only supports Android.`;

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;
const moduleProxy = message => new Proxy({}, {
  get() {
    throw new Error(message);
  }
});
const HealthConnectModule = _reactNative.Platform.select({
  android: isTurboModuleEnabled ? require('./NativeHealthConnect').default : _reactNative.NativeModules.HealthConnect,
  ios: moduleProxy(PLATFORM_NOT_SUPPORTED_ERROR),
  default: moduleProxy(PLATFORM_NOT_SUPPORTED_ERROR)
});
const HealthConnect = HealthConnectModule ? HealthConnectModule : moduleProxy(LINKING_ERROR);
const DEFAULT_PROVIDER_PACKAGE_NAME = 'com.google.android.apps.healthdata';

/**
 * Gets the status of the Health Connect SDK
 * @param providerPackageName the package name of the Health Connect provider
 * @returns the status of the SDK - check SdkAvailabilityStatus constants
 */
function getSdkStatus() {
  let providerPackageName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_PROVIDER_PACKAGE_NAME;
  return HealthConnect.getSdkStatus(providerPackageName);
}

/**
 * Initializes the Health Connect SDK
 * @param providerPackageName the package name of the Health Connect provider
 * @returns true if the SDK was initialized successfully
 */
function initialize() {
  let providerPackageName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_PROVIDER_PACKAGE_NAME;
  return HealthConnect.initialize(providerPackageName);
}

/**
 * Opens Health Connect settings app
 */
function openHealthConnectSettings() {
  return HealthConnect.openHealthConnectSettings();
}

/**
 * Request permissions to access Health Connect data
 * @param permissions list of permissions to request
 * @returns granted permissions
 */
function requestPermission(permissions) {
  let providerPackageName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_PROVIDER_PACKAGE_NAME;
  return HealthConnect.requestPermission(permissions, providerPackageName);
}
function getGrantedPermissions() {
  return HealthConnect.getGrantedPermissions();
}
function revokeAllPermissions() {
  return HealthConnect.revokeAllPermissions();
}
function readRecords(recordType, options) {
  return HealthConnect.readRecords(recordType, options);
}
function readRecord(recordType, recordId) {
  return HealthConnect.readRecord(recordType, recordId);
}
function insertRecords(records) {
  if (records.length === 0) {
    throw new _errors.HealthConnectError('You must provide at least one record', 'insertRecords');
  }
  const recordTypes = records.map(record => record.recordType);
  const uniqueRecordTypes = new Set(recordTypes);
  if (uniqueRecordTypes.size > 1) {
    throw new _errors.HealthConnectError('All records must have the same type', 'insertRecords');
  }
  return HealthConnect.insertRecords(records);
}
function aggregateRecord(request) {
  return HealthConnect.aggregateRecord(request);
}
function deleteRecordsByUuids(recordType, recordIdsList, clientRecordIdsList) {
  return HealthConnect.deleteRecordsByUuids(recordType, recordIdsList, clientRecordIdsList);
}
function deleteRecordsByTimeRange(recordType, timeRangeFilter) {
  return HealthConnect.deleteRecordsByTimeRange(recordType, timeRangeFilter);
}
function getChanges(recordType, token) {
  return HealthConnect.getChanges(recordType, token ?? '');
}
//# sourceMappingURL=index.js.map