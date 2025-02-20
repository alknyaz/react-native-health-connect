export interface BaseRecord {
    metadata?: Metadata;
}
export interface InstantaneousRecord extends BaseRecord {
    time: string;
    zoneOffset?: string;
}
export interface IntervalRecord extends BaseRecord {
    startTime: string;
    startZoneOffset?: string;
    endTime: string;
    endZoneOffset?: string;
}
export interface Metadata {
    id: string;
    dataOrigin: string;
    lastModifiedTime: string;
    clientRecordId?: string;
    clientRecordVersion: number;
    device: number;
    recordingMethod: number;
}
export type TimeRangeFilter = {
    operator: 'between';
    startTime: string;
    endTime: string;
} | {
    operator: 'after';
    startTime: string;
} | {
    operator: 'before';
    endTime: string;
};
export interface Energy {
    value: number;
    unit: 'calories' | 'joules' | 'kilocalories' | 'kilojoules';
}
export interface EnergyResult {
    inCalories: number;
    inJoules: number;
    inKilocalories: number;
    inKilojoules: number;
}
export interface Velocity {
    value: number;
    unit: 'kilometersPerHour' | 'metersPerSecond' | 'milesPerHour';
}
export interface VelocityResult {
    inKilometersPerHour: number;
    inMetersPerSecond: number;
    inMilesPerHour: number;
}
export interface BloodGlucose {
    value: number;
    unit: 'milligramsPerDeciliter' | 'millimolesPerLiter';
}
export interface Power {
    value: number;
    unit: 'watts' | 'kilocaloriesPerDay';
}
export interface PowerResult {
    inWatts: number;
    inKilocaloriesPerDay: number;
}
export interface Temperature {
    value: number;
    unit: 'celsius' | 'fahrenheit';
}
export interface Pressure {
    value: number;
    unit: 'millimetersOfMercury';
}
export interface PressureResult {
    inMillimetersOfMercury: number;
}
export interface Mass {
    value: number;
    unit: 'grams' | 'kilograms' | 'milligrams' | 'micrograms' | 'ounces' | 'pounds';
}
export interface MassResult {
    inGrams: number;
    inKilograms: number;
    inMilligrams: number;
    inMicrograms: number;
    inOunces: number;
    inPounds: number;
}
export interface Length {
    value: number;
    unit: 'meters' | 'kilometers' | 'miles' | 'inches' | 'feet';
}
export interface LengthResult {
    inMeters: number;
    inKilometers: number;
    inMiles: number;
    inInches: number;
    inFeet: number;
}
export interface Volume {
    value: number;
    unit: 'liters' | 'fluidOuncesUs' | 'milliliters';
}
export interface VolumeResult {
    inLiters: number;
    inFluidOuncesUs: number;
    inMilliliters: number;
}
interface BaseSample {
    time: string;
}
export interface CyclingPedalingCadenceSample extends BaseSample {
    revolutionsPerMinute: number;
}
export interface HeartRateSample extends BaseSample {
    beatsPerMinute: number;
}
export interface SpeedSample extends BaseSample {
    speed: Velocity;
}
export interface SpeedSampleResult extends BaseSample {
    speed: VelocityResult;
}
export interface StepsCadenceSample extends BaseSample {
    rate: number;
}
export interface PowerSample extends BaseSample {
    power: Power;
}
export interface PowerSampleResult extends BaseSample {
    power: PowerResult;
}
export interface ExerciseSegment {
    startTime: string;
    endTime: string;
    segmentType: number;
    repetitions: number;
}
export interface ExerciseLap {
    startTime: string;
    endTime: string;
    length: Length;
}
export interface SleepStage {
    startTime: string;
    endTime: string;
    stage: number;
}
export interface Location {
    time: string;
    latitude: number;
    longitude: number;
    horizontalAccuracy?: Length;
    verticalAccuracy?: Length;
    altitude?: Length;
}
export interface ExerciseRoute {
    route: Location[];
}
export {};
//# sourceMappingURL=base.types.d.ts.map