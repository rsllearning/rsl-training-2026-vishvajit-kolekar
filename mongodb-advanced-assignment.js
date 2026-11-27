// Task-1

// 1 create db
// use company_advanced

// 2. create employee collection with schema validation

db.createCollection("employees", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "departmentId", "experience", "active"],
      properties: {
        name: { bsonType: "string" },
        departmentId: { bsonType: "int" },
        experience: { bsonType: "int" },
        active: { bsonType: "bool" },
      },
    },
  },
});

// 3. insert employees

db.employees.insertMany([
  {
    _id: 1,
    name: "John",
    departmentId: 10,
    skills: ["Java", "MongoDB"],
    experience: 4,
    active: true,
    certifications: [{ name: "MongoDB", status: "Expired", expiryYear: 2026 }],
  },
  {
    _id: 2,
    name: "Alice",
    departmentId: 10,
    skills: ["Python", "MongoDB"],
    experience: 6,
    active: true,
    certifications: [{ name: "MongoDB", status: "Active", expiryYear: 2028 }],
  },
  {
    _id: 3,
    name: "David",
    departmentId: 20,
    skills: ["Communication"],
    experience: 3,
    active: false,
    certifications: [
      { name: "Communication", status: "Active", expiryYear: 2027 },
    ],
  },
]);

// optput
// { acknowledged: true, insertedIds: { '0': 1, '1': 2, '2': 3 } }

// 4 : test validation

db.employees.insertOne({
  _id: 99,
  name: 123,
  departmentId: "HR",
  experience: "one",
  active: "yes",
});

// output

// Uncaught:
// MongoServerError: Document failed validation
// Additional information: {
//   failingDocumentId: 99,
//   details: {
//     operatorName: '$jsonSchema',
//     schemaRulesNotSatisfied: [
//       {
//         operatorName: 'properties',
//         propertiesNotSatisfied: [
//           {
//             propertyName: 'name',
//             details: [
//               {
//                 operatorName: 'bsonType',
//                 specifiedAs: { bsonType: 'string' },
//                 reason: 'type did not match',
//                 consideredValue: 123,
//                 consideredType: 'int'
//               }
//             ]
//           },
//           {
//             propertyName: 'departmentId',
//             details: [
//               {
//                 operatorName: 'bsonType',
//                 specifiedAs: { bsonType: 'int' },
//                 reason: 'type did not match',
//                 consideredValue: 'HR',
//                 consideredType: 'string'
//               }
//             ]
//           },
//           {
//             propertyName: 'experience',
//             details: [
//               {
//                 operatorName: 'bsonType',
//                 specifiedAs: { bsonType: 'int' },
//                 reason: 'type did not match',
//                 consideredValue: 'one',
//                 consideredType: 'string'
//               }
//             ]
//           },
//           {
//             propertyName: 'active',
//             details: [
//               {
//                 operatorName: 'bsonType',
//                 specifiedAs: { bsonType: 'bool' },
//                 reason: 'type did not match',
//                 consideredValue: 'yes',
//                 consideredType: 'string'
//               }
//             ]
//           }
//         ]
//       }
//     ]
//   }
// }

// Task 2: Advanced Array Queries and Updates

// 2.1 Find One Matching Array Object

db.employees.find({
  certifications: { $elemMatch: { name: "MongoDB", status: "Active" } },
})[
  // output
  {
    _id: 2,
    name: "Alice",
    departmentId: 10,
    skills: ["Python", "MongoDB"],
    experience: 6,
    active: true,
    certifications: [{ name: "MongoDB", status: "Active", expiryYear: 2028 }],
  }
];

// 2.2 Update One Matching Array Element

db.employees.updateOne(
  { _id: 1, "certifications.name": "MongoDB" },
  { $set: { "certifications.$.status": "Active" } },
);

// Output

// {
//   acknowledged: true,
//   insertedId: null,
//   matchedCount: 1,
//   modifiedCount: 1,
//   upsertedCount: 0
// }
company_advanced >
  db.employees.find({ name: "John" })[
    {
      _id: 1,
      name: "John",
      departmentId: 10,
      skills: ["Java", "MongoDB"],
      experience: 4,
      active: true,
      certifications: [{ name: "MongoDB", status: "Active", expiryYear: 2026 }],
    }
  ];

// 2.3 Update Selected Array Elements

db.employees.updateOne(
  { _id: 1 },
  { $set: { "certifications.$[x].status": "Renewal Due" } },
  { arrayFilters: [{ "x.expiryYear": { $lt: 2027 } }] },
);

// output

// {
//   acknowledged: true,
//   insertedId: null,
//   matchedCount: 1,
//   modifiedCount: 1,
//   upsertedCount: 0
// }

// Task 3: Bulk Write Operations

db.employees.bulkWrite([
  {
    updateOne: {
      filter: { name: "John" },
      update: { $inc: { experience: 1 } },
    },
  },
  {
    updateOne: {
      filter: { name: "Alice" },
      update: { $set: { active: false } },
    },
  },
  {
    insertOne: {
      document: {
        _id: 4,
        name: "Emma",
        departmentId: 20,
        skills: ["Excel"],
        experience: 2,
        active: true,
        certifications: [{ name: "Excel", status: "Active", expiryYear: 2026 }],
      },
    },
  },
]);

// output

// {
//   acknowledged: true,
//   insertedCount: 1,
//   insertedIds: { '2': 4 },
//   matchedCount: 2,
//   modifiedCount: 2,
//   deletedCount: 0,
//   upsertedCount: 0,
//   upsertedIds: {}
// }

// Task 4: Advanced Aggregation

// Step 1: Create the Departments Collection

db.employees
  .aggregate([
    {
      $lookup: {
        from: "department",
        localField: "departmentId",
        foreignField: "_id",
        as: "department",
      },
    },
    { $unwind: "$department" },
    { $set: { departmentName: "$department.name" } },
    { $unset: "department" },
    { $project: { name: 1, departmentName: 1, _id: 0 } },
  ])
  .sort({ name: 1 });

// 4.2 Count Employees for Each Skill

db.employees.aggregate([
  { $unwind: "$skills" },
  { $group: { _id: "$skills", employeeCount: { $sum: 1 } } },
  { $sort: { employeeCount: 1 } },
]);

// 4.3 Return Active Employees and a Count

db.employees.aggregate([
  {
    $facet: {
      activeEmployee: [
        { $match: { active: true } },
        { $sort: { name: 1 } },
        { $project: { _id: 0, name: 1 } },
      ],
      activeEmployeeCount: [{ $match: { active: true } }, { $count: "count" }],
    },
  },
]);

// 5.1 Create and Verify a Compound Index

db.employees.createIndex({ departmentId: 1, name: 1 });

// departmentId_1_name_1

company_advanced > db.employees.getIndexes();

// [
//   { v: 2, key: { _id: 1 }, name: '_id_' },
//   {
//     v: 2,
//     key: { departmentId: 1, name: 1 },
//     name: 'departmentId_1_name_1'
//   }
// ]

// 5.2 Read explain("executionStats")

db.employees
  .find({ departmentId: 10 })
  .sort({ name: 1 })
  .explain("executionStats");

// 5.3 Create a TTL Index

db.createCollection("sessions");

// { ok: 1 }

db.sessions.insertOne({
  _id: 1,
  userName: "John",
  expiresAt: new Date(Date.now() + 600000),
});

// { acknowledged: true, insertedId: 1 }

db.sessions.createIndex({ expiresAt: 1 }, { expireAfterSecounds: 0 });

// expiresAt_1

// db.sessions.find()
// [
//   {
//     _id: 1,
//     userName: 'John',
//     expiresAt: ISODate('2026-11-27T17:12:02.073Z')
//   }
// ]
