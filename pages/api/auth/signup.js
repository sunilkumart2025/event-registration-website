import supabase from '../../../lib/supabaseClient';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const { email, password } = req.body;
    const { user, error } = await supabase.auth.signUp({ email, password });

    if (error) return res.status(400).json({ error: error.message });

    return res.status(200).json({ message: 'Signup successful!', user });
}
