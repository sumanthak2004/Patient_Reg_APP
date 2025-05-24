// // // import React, { useState } from "react";
// // // import { getDB } from "./db";

// // // export default function PatientForm() {
// // //   const [name, setName] = useState("");
// // //   const [age, setAge] = useState("");
// // //   const [gender, setGender] = useState("");

// // //   async function handleSubmit(e) {
// // //     e.preventDefault();
// // //     try {
// // //       const db = await getDB();
// // //       await db.run(
// // //         "INSERT INTO patients (name, age, gender) VALUES (?, ?, ?);",
// // //         [name, age, gender]
// // //       );
// // //       alert("Patient registered");
// // //       setName("");
// // //       setAge("");
// // //       setGender("");
// // //     } catch (err) {
// // //       console.error("Registration error:", err);
// // //       alert("Error registering patient");
// // //     }
// // //   }

// // //   return (
// // //     <form onSubmit={handleSubmit}>
// // //       <input
// // //         placeholder="Name"
// // //         value={name}
// // //         onChange={(e) => setName(e.target.value)}
// // //       />
// // //       <input
// // //         placeholder="Age"
// // //         value={age}
// // //         type="number"
// // //         onChange={(e) => setAge(e.target.value)}
// // //       />
// // //       <select value={gender} onChange={(e) => setGender(e.target.value)}>
// // //         <option value="">Select gender</option>
// // //         <option value="Male">Male</option>
// // //         <option value="Female">Female</option>
// // //       </select>
// // //       <button type="submit">Register Patient</button>
// // //     </form>
// // //   );
// // // }

// // import React, { useState } from 'react';
// // import { executeStatement } from '../utils/database';

// // export default function PatientForm({ onPatientAdded }) {
// //   const [name, setName] = useState('');
// //   const [age, setAge] = useState('');
// //   const [gender, setGender] = useState('');
// //   const [isSubmitting, setIsSubmitting] = useState(false);

// //   async function handleSubmit(e) {
// //     e.preventDefault();
    
// //     if (!name.trim() || !age || !gender) {
// //       alert('Please fill in all fields');
// //       return;
// //     }

// //     setIsSubmitting(true);
// //     try {
// //       await executeStatement(
// //         'INSERT INTO patients (name, age, gender) VALUES ($1, $2, $3)',
// //         [name.trim(), parseInt(age), gender]
// //       );
      
// //       alert('Patient registered successfully!');
// //       setName('');
// //       setAge('');
// //       setGender('');
// //       onPatientAdded(); // Refresh the patient list
// //     } catch (err) {
// //       console.error('Registration error:', err);
// //       alert('Error registering patient: ' + err.message);
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   }

// //   return (
// //     <div className="bg-white p-6 rounded-lg shadow-md mb-6">
// //       <h2 className="text-xl font-bold mb-4 text-gray-800">Register New Patient</h2>
// //       <div className="space-y-4">
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700 mb-1">
// //             Name
// //           </label>
// //           <input
// //             type="text"
// //             placeholder="Enter patient name"
// //             value={name}
// //             onChange={(e) => setName(e.target.value)}
// //             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             required
// //           />
// //         </div>
        
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700 mb-1">
// //             Age
// //           </label>
// //           <input
// //             type="number"
// //             placeholder="Enter age"
// //             value={age}
// //             onChange={(e) => setAge(e.target.value)}
// //             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             min="0"
// //             max="150"
// //             required
// //           />
// //         </div>
        
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700 mb-1">
// //             Gender
// //           </label>
// //           <select
// //             value={gender}
// //             onChange={(e) => setGender(e.target.value)}
// //             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             required
// //           >
// //             <option value="">Select gender</option>
// //             <option value="Male">Male</option>
// //             <option value="Female">Female</option>
// //             <option value="Other">Other</option>
// //           </select>
// //         </div>
        
// //         <button
// //           onClick={handleSubmit}
// //           disabled={isSubmitting}
// //           className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
// //         >
// //           {isSubmitting ? 'Registering...' : 'Register Patient'}
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // 
// import React, { useState } from 'react';
// import { getDB } from './db';

// export default function PatientForm({ onPatientAdded }) {
//   const [name, setName] = useState('');
//   const [age, setAge] = useState('');
//   const [gender, setGender] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   async function handleSubmit(e) {
//     e.preventDefault();
    
//     if (!name.trim() || !age || !gender) {
//       alert('Please fill in all fields');
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       const database = await getDB();
//       const safeName = name.trim().replace(/'/g, "''"); // escape single quotes
// const safeGender = gender.replace(/'/g, "''");
// const safeAge = parseInt(age); // age is number

// await database.exec(`
//   INSERT INTO patients (name, age, gender)
//   VALUES ('${safeName}', ${safeAge}, '${safeGender}');
// `);
      
//       alert('Patient registered successfully!');
//       setName('');
//       setAge('');
//       setGender('');
//       if (onPatientAdded) onPatientAdded();
//     } catch (err) {
//       console.error('Registration error:', err);
//       alert('Error registering patient: ' + err.message);
//     } finally {
//       setIsSubmitting(false);
//     }
//   }

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//       <h2 className="text-xl font-bold mb-4 text-gray-800">Register New Patient</h2>
//       <div className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
//           <input
//             type="text"
//             placeholder="Enter patient name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
//           <input
//             type="number"
//             placeholder="Enter age"
//             value={age}
//             onChange={(e) => setAge(e.target.value)}
//             className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             min="0"
//             max="150"
//             required
//           />
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
//           <select
//             value={gender}
//             onChange={(e) => setGender(e.target.value)}
//             className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           >
//             <option value="">Select gender</option>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//             <option value="Other">Other</option>
//           </select>
//         </div>
        
//         <button
//           onClick={handleSubmit}
//           disabled={isSubmitting}
//           className="text-black w-full bg-blue-600  py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {isSubmitting ? 'Registering...' : 'Register Patient'}
//         </button>
//       </div>
//     </div>
//   );
// }
import React, { useState } from 'react';
import { getDB } from './db';

export default function PatientForm({ onPatientAdded }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    
    if (!name.trim() || !age || !gender) {
      alert('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    try {
      const database = await getDB();
      const safeName = name.trim().replace(/'/g, "''"); // escape single quotes
      const safeGender = gender.replace(/'/g, "''");
      const safeAge = parseInt(age); // age is number

      await database.exec(`
        INSERT INTO patients (name, age, gender)
        VALUES ('${safeName}', ${safeAge}, '${safeGender}');
      `);
      
      alert('Patient registered successfully!');
      setName('');
      setAge('');
      setGender('');
      if (onPatientAdded) onPatientAdded();
    } catch (err) {
      console.error('Registration error:', err);
      alert('Error registering patient: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-full">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 !rounded-xl shadow-lg border border-blue-200">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Register New Patient</h2>
          <p className="text-gray-600">Please fill in all patient details</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter patient's full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 text-gray-800 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Age
            </label>
            <input
              type="number"
              placeholder="Enter patient's age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-4 py-3 text-gray-800 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              min="0"
              max="150"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Gender
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-4 py-3 text-gray-800 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              required
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transform transition duration-200 hover:scale-105 active:scale-95"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Registering...
              </span>
            ) : (
              'Register Patient'
            )}
          </button>
        </form>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-700">
            <strong>Note:</strong> All fields are required. Patient information will be securely stored in the database.
          </p>
        </div>
      </div>
    </div>
  );
}