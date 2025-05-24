import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import PatientForm from './PatientForm';
import PatientList from './PatientList';
import SQLQuery from './SQLQuery';
import HomePage from './home';

// Registration Page Component
function RegistrationPage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handlePatientAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleQueryExecuted = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Patient Registration System
        </h1>
        <p className="text-gray-600">
          Welcome to Patient Registration Portal
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <PatientForm onPatientAdded={handlePatientAdded} />
        <PatientList key={refreshTrigger} />
      </div>
      
      <div className="mt-8">
        <SQLQuery onQueryExecuted={handleQueryExecuted} />
      </div>
      
      <div className="text-center mt-6 text-sm text-gray-500">
        Data is persisted using PGlite with IndexedDB
      </div>
    </div>
  );
}

// Main App Component
export default function App() {
  const location = useLocation();

  return (
  
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/registration" element={<RegistrationPage />} />
        </Routes>
     
  );
}