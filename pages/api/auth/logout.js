import supabase from '../../../lib/supabaseClient';

export default async function handler(req, res) {
    await supabase.auth.signOut();
    res.status(200).json({ message: 'Logged out' });
}
