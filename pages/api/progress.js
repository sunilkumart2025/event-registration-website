import supabase from '../../lib/supabaseClient';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const { email, progress } = req.body;
    const { error } = await supabase
        .from('users')
        .update({ progress })
        .eq('email', email);

    if (error) return res.status(400).json({ error: error.message });

    return res.status(200).json({ message: 'Progress updated' });
}
