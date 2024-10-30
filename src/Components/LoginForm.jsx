import React,{useState} from 'react';
import { getAuth,signInWithEmailAndPassword } from 'firebase/auth';

const LoginForm = ({setIsAdmin}) =>{
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const auth = getAuth();
  const handleLogin = async (e) =>{
    e.preventDefault();
    try{
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if the logged-in user is the admin
      if (user.uid === 'RZbwxZM2cPVpJnzFqDn4PQelmRf2') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }

      console.log('User signed in:', user.email);
    }
    catch (error) {
        console.error('Error signing in:', error);
      }
  }

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;

