import type { TurboModule } from 'react-native';
import type { HealthConnectRecord, Permission } from './types';
type ReadRecordsOptions = {
    startTime: string;
    endTime: string;
    dataOriginFilter?: string[];
    ascendingOrder?: boolean;
    pageSize?: number;
    pageToken?: string;
};
export interface Spec extends TurboModule {
    getSdkStatus(providerPackageName: string): Promise<number>;
    initialize(providerPackageName: string): Promise<boolean>;
    openHealthConnectSettings: () => void;
    requestPermission(permissions: Permission[], providerPackageName: string): Promise<Permission[]>;
    getGrantedPermissions(): Promise<Permission[]>;
    revokeAllPermissions(): Promise<void>;
    insertRecords(records: HealthConnectRecord[]): Promise<string[]>;
    readRecords(recordType: string, options: ReadRecordsOptions): Promise<Array<{}>>;
    readRecord(recordType: string, recordId: string): Promise<{}>;
    aggregateRecord(record: {
        recordType: string;
        startTime: string;
        endTime: string;
    }): Promise<{}>;
    deleteRecordsByUuids(recordType: string, recordIdsList: string[], clientRecordIdsList: string[]): Promise<void>;
    deleteRecordsByTimeRange(recordType: string, timeRangeFilter: Object): Promise<void>;
    getChanges(recordType: string, token: string): Promise<void>;
}
declare const _default: Spec;
export default _default;
//# sourceMappingURL=NativeHealthConnect.d.ts.map