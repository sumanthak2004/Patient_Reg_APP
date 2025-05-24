import React, { useState, useEffect } from 'react';
import { getDB } from './db';
import { resetDBConnection } from './db';


export default function PatientList({ refreshTrigger }) {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPatients = async () => {
    try {
      setIsLoading(true);
      const db = await getDB();
      const result = await db.query('SELECT * FROM patients ORDER BY created_at DESC');
      setPatients(result.rows || []);
    } catch (err) {
      console.error('Fetch error:', err);
      setPatients([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();

    // 👂 Listen for changes from other tabs
    const channel = new BroadcastChannel('patient-sync');
    channel.onmessage = (msg) => {
  if (msg.data === 'refresh') {
    resetDBConnection(); // force new DB instance
    fetchPatients();      // fetch fresh data
  }
};
    return () => channel.close();
  }, [refreshTrigger]);

  if (isLoading) {
    return <div className="text-center text-gray-600 p-4">Loading patients...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md overflow-y-auto max-h-[90vh]">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        Patient List ({patients.length})
      </h2>
      {patients.length === 0 ? (
        <p className="text-center text-gray-500">No patients registered.</p>
      ) : (
        <div className="space-y-4">
          {patients.map(p => (
            <div key={p.id} className="p-4 border rounded hover:bg-gray-50">
              <h3 className="text-lg font-bold text-blue-800">{p.first_name} {p.last_name}</h3>
              <p><strong>Email:</strong> {p.email}</p>
              <p><strong>Phone:</strong> {p.phone}</p>
              <p><strong>DOB:</strong> {p.dob}</p>
              <p><strong>Gender:</strong> {p.gender}</p>
              <p><strong>Address:</strong> {p.address}, {p.city}, {p.state}, {p.zip}</p>
              <p><strong>Emergency:</strong> {p.emergency_name} - {p.emergency_phone}</p>
              <p><strong>Medical History:</strong> {p.medical_history || 'N/A'}</p>
              <p><strong>Allergies:</strong> {p.allergies || 'N/A'}</p>
              <p><strong>Medications:</strong> {p.medications || 'N/A'}</p>
              <p className="text-sm text-gray-500">Registered: {p.created_at && new Date(p.created_at).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
