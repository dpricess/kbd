// db.js

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://pcgalkgmlylfxputhaev.supabase.co'; // Replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjZ2Fsa2dtbHlsZnhwdXRoYWV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4NzU5MTIsImV4cCI6MjA1ODQ1MTkxMn0.FYYDAPC0A50ZbQMUJXvEEE4kh4vRQ4eSowlEulOGLoQ'; // Replace with your Supabase anon key

const supabase = createClient(supabaseUrl, supabaseKey);

//const supabase = createClient(supabaseUrl, supabaseKey);
async function fetchTopics() {
    console.log('Fetching topics from Supabase...');
    const { data, error } = await supabase.from('topics').select('*');
    
    if (error) {
        console.error('Supabase error:', error);
        const cachedTopics = JSON.parse(localStorage.getItem('topics')) || {};
        console.log('Falling back to localStorage:', cachedTopics);
        return cachedTopics;
    }

    console.log('Raw data from Supabase:', data);

    if (!data || data.length === 0) {
        console.warn('No data returned from Supabase');
        const cachedTopics = JSON.parse(localStorage.getItem('topics')) || {};
        console.log('Falling back to localStorage:', cachedTopics);
        return cachedTopics;
    }

    // Group slides by topic name
    const topics = data.reduce((acc, slide) => {
        const topicName = slide.name;
        if (!acc[topicName]) {
            acc[topicName] = [];
        }
        // Remove 'name' and 'updated_at' from slide object, keep all other fields
        const { name, updated_at, ...slideData } = slide;
        acc[topicName].push(slideData);
        return acc;
    }, {});

    console.log('Processed topics:', topics);
    localStorage.setItem('topics', JSON.stringify(topics));
    return topics;
}

async function updateTopic(topicName, slides) {
    console.log(`Updating topic '${topicName}' with slides:`, slides);
    const rows = slides.map(slide => ({
        ...slide,
        name: topicName,
        updated_at: new Date().toISOString()
    }));
    const { error } = await supabase
        .from('topics')
        .upsert(rows, { onConflict: 'id' });
    if (error) console.error('Error updating topic:', error);
    else {
        console.log(`Successfully updated topic '${topicName}'`);
        localStorage.setItem('topics', JSON.stringify(await fetchTopics()));
    }
}

export { fetchTopics, updateTopic };