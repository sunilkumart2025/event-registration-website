import { useState } from 'react';
import supabase from '../lib/supabaseClient';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleRegister() {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) alert(error.message);
        else alert('Check your email for confirmation!');
    }

    return (
        <div>
            <h2>Register</h2>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleRegister}>Sign Up</button>
        </div>
    );
}
