// 1. Local Setup and Data Creation

// use company
// switched to db company

// show dbs

// output

// admin     40.00 KiB
// college  100.00 KiB
// config    36.00 KiB
// local     40.00 KiB
// company

db.employees.deleteMany({});

// output

// { acknowledged: true, deletedCount: 0 }

db.employees.insertMany([
  {
    _id: "EMP001",
    name: "John",
    department: "Engineering",
    experience: 4,
    skills: ["Java", "Spring Boot"],
    active: true,
    address: {
      city: "Pune",
      country: "India",
    },
  },
  {
    _id: "EMP002",
    name: "Alice",
    department: "HR",
    experience: 3,
    skills: ["Recruitment", "Communication"],
    active: true,
    address: {
      city: "Mumbai",
      country: "India",
    },
  },
  {
    _id: "EMP003",
    name: "David",
    department: "Engineering",
    experience: 6,
    skills: ["Java", "MongoDB"],
    active: true,
    address: {
      city: "Bengaluru",
      country: "India",
    },
  },
  {
    _id: "EMP004",
    name: "Emma",
    department: "Finance",
    experience: 2,
    skills: ["Accounting", "Excel"],
    active: false,
    address: {
      city: "Pune",
      country: "India",
    },
  },
  {
    _id: "EMP005",
    name: "Robert",
    department: "Engineering",
    experience: 5,
    skills: ["Java", "Docker"],
    active: true,
    address: {
      city: "Delhi",
      country: "India",
    },
  },
]);

// output

// {
//   acknowledged: true,
//   insertedIds: {
//     '0': 'EMP001',
//     '1': 'EMP002',
//     '2': 'EMP003',
//     '3': 'EMP004',
//     '4': 'EMP005'
//   }
// }

// 2.1 Engineering Employees

db.employees
  .find({ department: "Engineering" }, { _id: 1, name: 1, experience: 1 })
  .sort({ name: 1 })[
  // output

  ({ _id: "EMP003", name: "David", experience: 6 },
  { _id: "EMP001", name: "John", experience: 4 },
  { _id: "EMP005", name: "Robert", experience: 5 })
];

// 2.2 Employees with 5 or More Years of Experience

db.employees
  .find({ experience: { $gte: 5 } }, { _id: 0, name: 1, experience: 1 })
  .sort({ experience: -1 })[
  // output

  ({ name: "David", experience: 6 }, { name: "Robert", experience: 5 })
];

// 2.3 Nested Document Query

db.employees
  .find({ "address.city": "Pune" }, { _id: 0, name: 1, "address.city": 1 })
  .sort({ name: 1 })[
  // output

  ({ name: "Emma", address: { city: "Pune" } },
  { name: "John", address: { city: "Pune" } })
];

// 2.4 Array Query

db.employees
  .find({ skills: { $in: ["MongoDB", "Spring Boot"] } })
  .sort({ name: 1 })[
  // output

  ({
    _id: "EMP001",
    name: "John",
    department: "Engineering",
    experience: 4,
    skills: ["Java", "Spring Boot"],
    active: true,
    address: { city: "Pune", country: "India" },
  },
  {
    _id: "EMP003",
    name: "David",
    department: "Engineering",
    experience: 6,
    skills: ["Java", "MongoDB"],
    active: true,
    address: { city: "Bengaluru", country: "India" },
  })
];

// 2.5 Sorting and Limiting

db.employees
  .find()
  .sort({ experience: -1 })
  .limit(2)[
  // output

  ({
    _id: "EMP003",
    name: "David",
    department: "Engineering",
    experience: 6,
    skills: ["Java", "MongoDB"],
    active: true,
    address: { city: "Bengaluru", country: "India" },
  },
  {
    _id: "EMP005",
    name: "Robert",
    department: "Engineering",
    experience: 5,
    skills: ["Java", "Docker"],
    active: true,
    address: { city: "Delhi", country: "India" },
  })
];

// 3.1 $inc

db.employees.updateOne({ name: "Alice" }, { $inc: { experience: 1 } });

// output

// {
//   acknowledged: true,
//   insertedId: null,
//   matchedCount: 1,
//   modifiedCount: 1,
//   upsertedCount: 0
// }

db.employees.find({ name: "Alice" })[
  {
    _id: "EMP002",
    name: "Alice",
    department: "HR",
    experience: 4,
    skills: ["Recruitment", "Communication"],
    active: true,
    address: { city: "Mumbai", country: "India" },
  }
];

// 3.2 $set

db.employees.updateOne({ name: "Emma" }, { $set: { active: true } });

// output

// {
//   acknowledged: true,
//   insertedId: null,
//   matchedCount: 1,
//   modifiedCount: 1,
//   upsertedCount: 0
// }

db.employees.find({ name: "Emma" })[
  {
    _id: "EMP004",
    name: "Emma",
    department: "Finance",
    experience: 2,
    skills: ["Accounting", "Excel"],
    active: true,
    address: { city: "Pune", country: "India" },
  }
];

// 3.3 $addToSet

db.employees.updateOne(
  { name: "Robert" },
  { $addToSet: { skills: "MongoDB" } },
);

// output

// {
//   acknowledged: true,
//   insertedId: null,
//   matchedCount: 1,
//   modifiedCount: 1,
//   upsertedCount: 0
// }

db.employees.find({ name: "Robert" })[
  {
    _id: "EMP005",
    name: "Robert",
    department: "Engineering",
    experience: 5,
    skills: ["Java", "Docker", "MongoDB"],
    active: true,
    address: { city: "Delhi", country: "India" },
  }
];

// 3.3 $addToSet

db.employees.updateOne(
  { name: "Robert" },
  { $addToSet: { skills: "MongoDB" } },
);

// output

// {
//   acknowledged: true,
//   insertedId: null,
//   matchedCount: 1,
//   modifiedCount: 0,
//   upsertedCount: 0
// }

// 4. Delete Operation

db.employees.insertOne({
  _id: "EMP999",
  name: "Temporary Employee",
  department: "Training",
  experience: 0,
});

// output

// { acknowledged: true, insertedId: 'EMP999' }

db.employees.deleteOne({ _id: "EMP999" });

// output

// { acknowledged: true, deletedCount: 1 }

db.employees.findOne({ _id: "EMP999" });

null;

// 5.1 Check Existing Indexes

db.employees.getIndexes()[
  // output

  { v: 2, key: { _id: 1 }, name: "_id_" }
];

// 5.2 Create an Index

db.employees.createIndex({ department: 1 });

// output

department_1;

// 5.3 Verify the Index

db.employees.getIndexes()[
  // output

  ({ v: 2, key: { _id: 1 }, name: "_id_" },
  { v: 2, key: { department: 1 }, name: "department_1" })
];

// 6.1 Employees per Department

db.employees.aggregate([
  { $group: { _id: "$department", totalEmp: { $sum: 1 } } },
  { $sort: { _id: 1 } },
])[
  // output

  ({ _id: "Engineering", totalEmp: 3 },
  { _id: "Finance", totalEmp: 1 },
  { _id: "HR", totalEmp: 1 })
];

// 6.2 Average Experience per Department

db.employees.aggregate([
  { $group: { _id: "$department", avgExp: { $avg: "$experience" } } },
  { $sort: { _id: 1 } },
])[
  // output

  ({ _id: "Engineering", avgExp: 5 },
  { _id: "Finance", avgExp: 2 },
  { _id: "HR", avgExp: 4 })
];

// 6.3 Top Engineering Employees

db.employees.aggregate([
  {
    $match: { department: "Engineering" },
  },
  {
    $sort: { experience: -1 },
  },
  {
    $limit: 2,
  },
  {
    $project: { _id: 0, name: 1, experience: 1 },
  },
])[
  // output

  ({ name: "David", experience: 6 }, { name: "Robert", experience: 5 })
];
