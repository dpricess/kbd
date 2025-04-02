import { createClient } from '@supabase/supabase-js';
 
 
const supabaseUrl = 'https://pcgalkgmlylfxputhaev.supabase.co'; // Replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjZ2Fsa2dtbHlsZnhwdXRoYWV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4NzU5MTIsImV4cCI6MjA1ODQ1MTkxMn0.FYYDAPC0A50ZbQMUJXvEEE4kh4vRQ4eSowlEulOGLoQ'; // Replace with your Supabase anon key
const supabase = createClient(supabaseUrl, supabaseKey);


export async function fetchTopics() {
    const { data, error } = await supabase.from('topics').select('*');
    if (error) throw error;
    const topics = {};
    data.forEach(row => {
        topics[row.name] = topics[row.name] || [];
        topics[row.name].push(row);
    });
    return topics;
}