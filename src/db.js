// // // src/db.js
// // import { open } from "@electric-sql/pglite";

// // let db;

// // export async function getDB() {
// //   if (!db) {
// //     db = await open({
// //       filename: "mydb.sqlite",
// //       schema: `
// //         CREATE TABLE IF NOT EXISTS patients (
// //           id INTEGER PRIMARY KEY AUTOINCREMENT,
// //           name TEXT,
// //           age INTEGER,
// //           gender TEXT
// //         );
// //       `,
// //     });
// //   }
// //   return db;
// // }

// import { PGlite } from '@electric-sql/pglite';

// // Database singleton
// let db = null;

// export async function getDB() {
//   if (!db) {
//     try {
//       // Initialize PGlite with IndexedDB for persistence
//       db = new PGlite('idb://patient-db');
      
//       // Create the patients table
//       await db.exec(`
//         CREATE TABLE IF NOT EXISTS patients (
//           id SERIAL PRIMARY KEY,
//           name TEXT NOT NULL,
//           age INTEGER NOT NULL,
//           gender TEXT NOT NULL,
//           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//         );
//       `);
      
//       console.log('Database initialized successfully');
//     } catch (error) {
//       console.error('Database initialization error:', error);
//       throw error;
//     }
//   }
//   return db;
// }

// // Helper function to execute queries with error handling
// export async function executeQuery(query, params = []) {
//   try {
//     const database = await getDB();
//     const result = await database.query(query, params);
//     return result;
//   } catch (error) {
//     console.error('Query execution error:', error);
//     throw error;
//   }
// }

// // Helper function to execute statements (INSERT, UPDATE, DELETE)
// export async function executeStatement(statement, params = []) {
//   try {
//     const database = await getDB();
//     await database.exec(statement, params);
//   } catch (error) {
//     console.error('Statement execution error:', error);
//     throw error;
//   }
// }

import { PGlite } from '@electric-sql/pglite';

let db = null;

export async function getDB() {
  if (!db) {
    try {
      // Initialize PGlite with IndexedDB for persistence
      db = new PGlite('idb://patient-db');
      
      // Create the patients table
      await db.exec(`
        CREATE TABLE IF NOT EXISTS patients (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          age INTEGER NOT NULL,
          gender TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
      
      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Database initialization error:', error);
      throw error;
    }
  }
  return db;
}

export async function executeQuery(query) {
  const db = await getDB();
  const result = await db.query(query);
  return result;
}
