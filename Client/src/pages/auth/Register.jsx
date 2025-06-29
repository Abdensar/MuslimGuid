// pages/Register.jsx
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username:name, email, password })
      });
      
        const data = await response.json();
      if (response.ok) {
        localStorage.setItem('currentUser', JSON.stringify(data.user))
        navigate('/');
      } else {
        throw new Error(data.message || 'registering failed');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-blue-sidebar rounded-lg shadow-lg mt-20">
      <h2 className="text-2xl font-semibold text-dark-yellow mb-6">Register</h2>
      {error && <div className="text-red-400 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-white mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
        </div>
        <div>
          <label className="block text-white mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
        </div>
        <div>
          <label className="block text-white mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-dark-yellow hover:bg-arrow-yellow text-white rounded-lg"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;