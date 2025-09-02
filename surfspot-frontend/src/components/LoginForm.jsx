// src/components/LoginForm.jsx
import { useState } from 'react';
import { login } from '../api/auth';

export default function LoginForm({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit clickato", username, password);

    const result = await login(username, password);
    console.log("Result login:", result);
    if (result.success) {
      localStorage.setItem('jwtToken', result.token);
      onLoginSuccess(result.token); // dice ad App che siamo loggati
    } else {
      setError(result.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white text-blue-600 font-semibold px-6 py-2 rounded shadow hover:bg-gray-200 transition">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        className="block w-full mb-2 p-2 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="block w-full mb-2 p-2 rounded"
      />
      <button type="submit" className="bg-blue-600 text-black px-4 py-2 rounded">Login</button>
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </form>
  );
}
