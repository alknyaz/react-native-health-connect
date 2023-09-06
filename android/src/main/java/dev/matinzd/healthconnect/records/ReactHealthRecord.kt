package dev.matinzd.healthconnect.records

import androidx.health.connect.client.aggregate.AggregationResult
import androidx.health.connect.client.changes.DeletionChange
import androidx.health.connect.client.changes.UpsertionChange
import androidx.health.connect.client.records.Record
import androidx.health.connect.client.request.AggregateRequest
import androidx.health.connect.client.request.ReadRecordsRequest
import androidx.health.connect.client.response.ChangesResponse
import androidx.health.connect.client.response.InsertRecordsResponse
import androidx.health.connect.client.response.ReadRecordResponse
import androidx.health.connect.client.response.ReadRecordsResponse
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableNativeArray
import com.facebook.react.bridge.WritableNativeMap
import dev.matinzd.healthconnect.utils.InvalidRecordType
import dev.matinzd.healthconnect.utils.convertReactRequestOptionsFromJS
import dev.matinzd.healthconnect.utils.reactRecordTypeToClassMap
import dev.matinzd.healthconnect.utils.reactRecordTypeToReactClassMap
import java.util.UUID
import kotlin.reflect.KClass

class ReactHealthRecord {
  companion object {
    private fun <T : Record> createReactHealthRecordInstance(recordType: String?): ReactHealthRecordImpl<T> {
      if (!reactRecordTypeToReactClassMap.containsKey(recordType)) {
        throw InvalidRecordType()
      }

      val reactClass = reactRecordTypeToReactClassMap[recordType]
      return reactClass?.newInstance() as ReactHealthRecordImpl<T>
    }

    fun getRecordByType(recordType: String): KClass<out Record> {
      if (!reactRecordTypeToClassMap.containsKey(recordType)) {
        throw InvalidRecordType()
      }

      return reactRecordTypeToClassMap[recordType]!!
    }

    fun parseWriteRecords(reactRecords: ReadableArray): List<Record> {
      val recordType = reactRecords.getMap(0).getString("recordType")

      val recordClass = createReactHealthRecordInstance<Record>(recordType)

      return recordClass.parseWriteRecord(reactRecords)
    }

    fun parseWriteResponse(response: InsertRecordsResponse?): WritableNativeArray {
      val ids = WritableNativeArray()
      response?.recordIdsList?.forEach { ids.pushString(it) }
      return ids
    }

    fun parseReadRequest(recordType: String, reactRequest: ReadableMap): ReadRecordsRequest<*> {
      return convertReactRequestOptionsFromJS(getRecordByType(recordType), reactRequest)
    }

    fun getAggregateRequest(recordType: String, reactRequest: ReadableMap): AggregateRequest {
      val recordClass = createReactHealthRecordInstance<Record>(recordType)

      return recordClass.getAggregateRequest(reactRequest)
    }

    fun parseAggregationResult(recordType: String, result: AggregationResult): WritableNativeMap {
      val recordClass = createReactHealthRecordInstance<Record>(recordType)

      return recordClass.parseAggregationResult(result)
    }

    fun parseRecords(
      recordType: String,
      response: ReadRecordsResponse<out Record>
    ): WritableNativeArray {
      val recordClass = createReactHealthRecordInstance<Record>(recordType)
      return WritableNativeArray().apply {
        for (record in response.records) {
          pushMap(recordClass.parseRecord(record))
        }
      }
    }

    fun parseRecord(
      recordType: String,
      response: ReadRecordResponse<out Record>
    ): WritableNativeMap {
      val recordClass = createReactHealthRecordInstance<Record>(recordType)
      return recordClass.parseRecord(response.record)
    }

    fun parseChanges(
      recordType: String,
      response: ChangesResponse
    ): WritableNativeMap {
      val recordClass = createReactHealthRecordInstance<Record>(recordType)

      val upserts = mutableListOf<WritableNativeMap>();
      val deletes = mutableListOf<String>();
      response.changes.forEach { change ->
        when (change) {
          is UpsertionChange ->
              upserts.add(recordClass.parseRecord(change.record))
          is DeletionChange -> deletes.add(change.recordId)
        }
      }

      return WritableNativeMap().apply {
        putArray("upserts", WritableNativeArray().apply {
          for (upsert in upserts) {
            pushMap(upsert)
          }
        })
        putArray("deletes", WritableNativeArray().apply {
          for (deletedId in deletes) {
            pushMap(deletedId as ReadableMap)
          }
        })
        putString("nextToken", response.nextChangesToken)
      }
    }
  }
}
