import type { AggregateRequest, AggregateResult, AggregateResultRecordType, HealthConnectRecord, Permission, ReadRecordsOptions, RecordResult, RecordType } from './types';
import type { TimeRangeFilter } from './types/base.types';
/**
 * Gets the status of the Health Connect SDK
 * @param providerPackageName the package name of the Health Connect provider
 * @returns the status of the SDK - check SdkAvailabilityStatus constants
 */
export declare function getSdkStatus(providerPackageName?: string): Promise<number>;
/**
 * Initializes the Health Connect SDK
 * @param providerPackageName the package name of the Health Connect provider
 * @returns true if the SDK was initialized successfully
 */
export declare function initialize(providerPackageName?: string): Promise<boolean>;
/**
 * Opens Health Connect settings app
 */
export declare function openHealthConnectSettings(): void;
/**
 * Request permissions to access Health Connect data
 * @param permissions list of permissions to request
 * @returns granted permissions
 */
export declare function requestPermission(permissions: Permission[], providerPackageName?: string): Promise<Permission[]>;
export declare function getGrantedPermissions(): Promise<Permission[]>;
export declare function revokeAllPermissions(): void;
export declare function readRecords<T extends RecordType>(recordType: T, options: ReadRecordsOptions): Promise<RecordResult<T>[]>;
export declare function readRecord<T extends RecordType>(recordType: T, recordId: string): Promise<RecordResult<T>>;
export declare function insertRecords(records: HealthConnectRecord[]): Promise<string[]>;
export declare function aggregateRecord<T extends AggregateResultRecordType>(request: AggregateRequest<T>): Promise<AggregateResult<T>>;
export declare function deleteRecordsByUuids(recordType: RecordType, recordIdsList: string[], clientRecordIdsList: string[]): Promise<void>;
export declare function deleteRecordsByTimeRange(recordType: RecordType, timeRangeFilter: TimeRangeFilter): Promise<void>;
export declare function getChanges<T extends RecordType>(recordType: T, token?: string): Promise<{
    upserts: RecordResult<T>[];
    deletes: string[];
    nextToken: string;
}>;
export * from './constants';
//# sourceMappingURL=index.d.ts.map