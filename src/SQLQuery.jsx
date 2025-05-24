import React, { useState, useEffect } from 'react';
import { executeQuery } from './db.js';

export default function PatientList({ refreshTrigger }) {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchPatients() {
    try {
      setIsLoading(true);
      const result = await executeQuery('SELECT * FROM patients ORDER BY created_at DESC');
      setPatients(result.rows);
    } catch (err) {
      console.error('Fetch error:', err);
      alert('Error fetching patients: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPatients();
  }, [refreshTrigger]);

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-center text-gray-600">Loading patients...</div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        Patient List ({patients.length} patients)
      </h2>
      
      {patients.length === 0 ? (
        <p className="text-gray-600 text-center py-4">No patients registered yet.</p>
      ) : (
        <div className="space-y-3">
          {patients.map((patient) => (
            <div
              key={patient.id}
              className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    {patient.name}
                  </h3>
                  <p className="text-gray-600">
                    Age: {patient.age} | Gender: {patient.gender}
                  </p>
                  <p className="text-sm text-gray-500">
                    ID: {patient.id} | Registered: {new Date(patient.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}