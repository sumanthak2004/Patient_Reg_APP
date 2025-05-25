import React, { useState } from 'react';
import { getDB } from './db';
import { FaUser, FaEnvelope, FaPhone, FaBirthdayCake, FaVenusMars, FaHome, FaCity, FaMapMarkedAlt, FaIdBadge, FaUserShield, FaNotesMedical, FaPills, FaAllergies } from 'react-icons/fa';

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
      new BroadcastChannel('patient-sync').postMessage('refresh');
    } catch (err) {
      console.error(err);
      alert('Error registering patient.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (label, name, icon, type = 'text', required = true) => (
    <div className="flex flex-col">
      <label className="text-sm font-semibold text-gray-800 mb-1 flex items-center gap-2">
        {icon} {label}{required && ' *'}
      </label>
      <input
        name={name}
        type={type}
        value={form[name]}
        onChange={handleChange}
        className="mt-1 px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        required={required}
      />
    </div>
  );

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg mb-6 overflow-y-auto max-h-[90vh] border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-blue-800 text-center">Register New Patient</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        {renderField('First Name', 'first_name', <FaUser />)}
        {renderField('Last Name', 'last_name', <FaUser />)}
        {renderField('Email', 'email', <FaEnvelope />, 'email')}
        {renderField('Phone Number', 'phone', <FaPhone />)}
        {renderField('Date of Birth', 'dob', <FaBirthdayCake />, 'date')}

        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-800 mb-1 flex items-center gap-2">
            <FaVenusMars /> Gender *
          </label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="mt-1 px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        {renderField('Address', 'address', <FaHome />)}
        {renderField('City', 'city', <FaCity />)}
        {renderField('State', 'state', <FaMapMarkedAlt />)}
        {renderField('ZIP Code', 'zip', <FaIdBadge />)}

        {renderField('Emergency Contact Name', 'emergency_name', <FaUserShield />)}
        {renderField('Emergency Contact Phone', 'emergency_phone', <FaPhone />)}

        <div className="col-span-full">
          <label className="text-sm font-semibold text-gray-800 mb-1 flex items-center gap-2">
            <FaNotesMedical /> Medical History
          </label>
          <textarea
            name="medical_history"
            value={form.medical_history}
            onChange={handleChange}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={2}
          />
        </div>

        <div className="col-span-full">
          <label className="text-sm font-semibold text-gray-800 mb-1 flex items-center gap-2">
            <FaAllergies /> Allergies
          </label>
          <textarea
            name="allergies"
            value={form.allergies}
            onChange={handleChange}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={2}
          />
        </div>

        <div className="col-span-full">
          <label className="text-sm font-semibold text-gray-800 mb-1 flex items-center gap-2">
            <FaPills /> Current Medications
          </label>
          <textarea
            name="medications"
            value={form.medications}
            onChange={handleChange}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={2}
          />
        </div>

        <div className="col-span-full">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-700 text-white py-3 px-6 rounded-md font-semibold hover:bg-blue-800 transition duration-300 disabled:opacity-50"
          >
            {isSubmitting ? 'Registering...' : 'Register Patient'}
          </button>
        </div>
      </form>
    </div>
  );
}
