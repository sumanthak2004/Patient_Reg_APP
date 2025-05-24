import React, { useState } from 'react';
import { getDB } from './db';

export default function PatientForm({ onPatientAdded }) {
  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '', phone: '', dob: '', gender: '',
    address: '', city: '', state: '', zip: '',
    emergency_name: '', emergency_phone: '',
    medical_history: '', allergies: '', medications: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const db = await getDB();
      const fields = Object.keys(form).map(k => `'${form[k].replace(/'/g, "''")}'`);
      const query = `
        INSERT INTO patients (
          first_name, last_name, email, phone, dob, gender,
          address, city, state, zip,
          emergency_name, emergency_phone,
          medical_history, allergies, medications
        ) VALUES (${fields.join(',')});
      `;
      await db.exec(query);
      alert('Patient registered successfully!');
      setForm({
        first_name: '', last_name: '', email: '', phone: '', dob: '', gender: '',
        address: '', city: '', state: '', zip: '',
        emergency_name: '', emergency_phone: '',
        medical_history: '', allergies: '', medications: ''
      });
      onPatientAdded?.();

      // 🔁 Broadcast sync to other tabs
      new BroadcastChannel('patient-sync').postMessage('refresh');
    } catch (err) {
      console.error(err);
      alert('Error registering patient.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 overflow-y-auto max-h-[90vh]">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Register New Patient</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
        {[
          ['First Name', 'first_name'], ['Last Name', 'last_name'],
          ['Email', 'email'], ['Phone Number', 'phone'],
          ['Date of Birth', 'dob'], ['Gender', 'gender'],
          ['Address', 'address'], ['City', 'city'],
          ['State', 'state'], ['ZIP Code', 'zip'],
          ['Emergency Contact Name', 'emergency_name'],
          ['Emergency Contact Phone', 'emergency_phone'],
          ['Medical History', 'medical_history'],
          ['Allergies', 'allergies'],
          ['Current Medications', 'medications']
        ].map(([label, name]) => (
          <div key={name} className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">{label}{!['medical_history','allergies','medications'].includes(name) && ' *'}</label>
            {name === 'gender' ? (
              <select name="gender" value={form.gender} onChange={handleChange}
                className="mt-1 px-3 py-2 border rounded text-black">
                <option value="">Select Gender</option>
                <option>Male</option><option>Female</option><option>Other</option>
              </select>
            ) : name === 'medical_history' || name === 'allergies' || name === 'medications' ? (
              <textarea name={name} value={form[name]} onChange={handleChange}
                className="mt-1 px-3 py-2 border rounded text-black" rows="2" />
            ) : (
              <input name={name} type={name === 'dob' ? 'date' : 'text'} value={form[name]} onChange={handleChange}
                className="mt-1 px-3 py-2 border rounded text-black" required={!['medical_history','allergies','medications'].includes(name)} />
            )}
          </div>
        ))}
        <div className="col-span-full">
          <button type="submit" disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50">
            {isSubmitting ? 'Registering...' : 'Register Patient'}
          </button>
        </div>
      </form>
    </div>
  );
}
