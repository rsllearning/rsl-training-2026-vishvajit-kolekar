// 5.2 Read explain("executionStats")

{
explainVersion: '1',
queryPlanner: {
namespace: 'company_advanced.employees',
parsedQuery: { departmentId: { '$eq': 10 } },
    indexFilterSet: false,
    queryHash: 'E5A42DED',
    planCacheShapeHash: 'E5A42DED',
    planCacheKey: 'D43CA850',
    optimizationTimeMillis: 0,
    optimizationTimeMicros: 228,
    maxIndexedOrSolutionsReached: false,
    maxIndexedAndSolutionsReached: false,
    maxScansToExplodeReached: false,
    prunedSimilarIndexes: false,
    winningPlan: {
      isCached: false,
      stage: 'FETCH',
      nss: 'company_advanced.employees',
      inputStage: {
        stage: 'IXSCAN',
        nss: 'company_advanced.employees',
        keyPattern: { departmentId: 1, name: 1 },
        indexName: 'departmentId_1_name_1',
        isMultiKey: false,
        multiKeyPaths: { departmentId: [], name: [] },
        isUnique: false,
        isSparse: false,
        isPartial: false,
        indexVersion: 2,
        direction: 'forward',
        indexBounds: { departmentId: [ '[10, 10]' ], name: [ '[MinKey, MaxKey]' ] }
      }
    },
    rejectedPlans: []
  },
  executionStats: {
    executionSuccess: true,
    nReturned: 2,
    executionTimeMillis: 0,
    executionTimeMicros: 663,
    totalKeysExamined: 2,
    totalDocsExamined: 2,
    executionStages: {
      isCached: false,
      stage: 'FETCH',
      nReturned: 2,
      executionTimeMillisEstimate: 0,
      works: 3,
      advanced: 2,
      needTime: 0,
      needYield: 0,
      saveState: 0,
      restoreState: 0,
      isEOF: 1,
      nss: 'company_advanced.employees',
      docsExamined: 2,
      alreadyHasObj: 0,
      inputStage: {
        stage: 'IXSCAN',
        nReturned: 2,
        executionTimeMillisEstimate: 0,
        works: 3,
        advanced: 2,
        needTime: 0,
        needYield: 0,
        saveState: 0,
        restoreState: 0,
        isEOF: 1,
        nss: 'company_advanced.employees',
        keyPattern: { departmentId: 1, name: 1 },
        indexName: 'departmentId_1_name_1',
        isMultiKey: false,
        multiKeyPaths: { departmentId: [], name: [] },
        isUnique: false,
        isSparse: false,
        isPartial: false,
        indexVersion: 2,
        direction: 'forward',
        indexBounds: { departmentId: [ '[10, 10]' ], name: [ '[MinKey, MaxKey]' ] },
        keysExamined: 2,
        seeks: 1,
        dupsTested: 0,
        dupsDropped: 0,
        peakTrackedMemBytes: 0
      }
    }
  },
  queryShapeHash: '5A0F20A6DED9FE3E1BFA7046D82577FA3941B587A0A6EC4AD43E72479A526CFC',
  command: {
    find: 'employees',
    filter: { departmentId: 10 },
    sort: { name: 1 },
    '$db': 'company_advanced'
},
serverInfo: {
host: 'Vishvajits-Mac-mini.local',
port: 27017,
version: '9.0.8',
gitVersion: '115a0fe2dcd8edd5bacd4557bd2e741a8e080665'
},
serverParameters: {
internalQueryFacetMaxOutputDocSizeBytes: 104857600,
internalLookupStageIntermediateDocumentMaxSizeBytes: 104857600,
internalQueryProhibitBlockingMergeOnMongoS: 0,
internalQueryFrameworkControl: 'trySbeRestricted',
internalQueryPlannerIgnoreIndexWithCollationForRegex: 1
},
ok: 1
}

// MCQ

Q1 = b
Q2 = b
Q3 = c
Q4 = a
Q5 = c
Q6 = b
Q7 = c
Q8 = b
Q9 = c
Q10 = b
Q11 = a
Q12 = c
