import React, { useState } from 'react';
import { executeQuery } from './db';
import { resetDBConnection } from './db';


export default function SQLQuery({ onQueryExecuted }) {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const runQuery = async () => {
    try {
      setError('');
      const res = await executeQuery(query);
      setResult(res.rows || []);
      if (onQueryExecuted) onQueryExecuted();

      // 🔁 Broadcast sync to other tabs
      new BroadcastChannel('patient-sync').postMessage('refresh');
    } catch (err) {
      console.error(err);
      setResult(null);
      setError(err.message);
    }
  };
  const channel = new BroadcastChannel('patient-sync');
channel.onmessage = (msg) => {
  if (msg.data === 'refresh') {
    resetDBConnection();
  }
};


  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Run Raw SQL Query</h2>
      <textarea
        className="w-full h-24 p-3 border border-gray-300 rounded text-black mb-4"
        placeholder="Enter SQL (e.g., SELECT * FROM patients)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        onClick={runQuery}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Run Query
      </button>

      {error && <p className="text-red-600 mt-4">⚠️ {error}</p>}

      {result && result.length > 0 && (
        <div className="mt-6 overflow-auto">
          <table className="min-w-full text-sm text-left border border-gray-200 text-gray-800">
            <thead>
              <tr className="bg-gray-100">
                {Object.keys(result[0]).map((key) => (
                  <th
                    key={key}
                    className="px-4 py-2 border-b border-gray-200 font-semibold text-gray-700"
                  >
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {result.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  {Object.values(row).map((val, j) => (
                    <td key={j} className="px-4 py-2 border-b border-gray-200">
                      {val !== null ? val.toString() : ''}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {result && result.length === 0 && !error && (
        <p className="text-gray-600 mt-4">Query executed successfully. No results to display.</p>
      )}
    </div>
  );
}
