import { useState } from 'react'; // <-- Import useState

export default function Register() {
  const [username, setUsername] = useState(''); // <-- Add this line
  const [password, setPassword] = useState(''); // <-- Add this line

  return (
    <div className="bg-blue-50 h-screen flex items-center">
      <form className="w-64 mx-auto mb-12">

        <input
          value={username} onChange={ev => setUsername(ev.target.value)}
          type="text" placeholder="Username"
          className="block w-full rounded-sm p-2 mb-2 border" />

        <input
          value={password} onChange={ev => setPassword(ev.target.value)}
          type="password" placeholder="Password"
          className="block w-full rounded-sm p-2 mb-2 border" />

        <button className="bg-blue-500 text-white block w-full rounded-sm p-2">
          Register
        </button>
      </form>
    </div>
  )
}
