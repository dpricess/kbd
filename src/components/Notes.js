// components/Notes.js
import { getState } from '../lib/state.js';

export function renderNotes(container) {
    container.innerHTML = '<h3>Notes</h3>';
    const notes = document.createElement('textarea');
    notes.id = 'notesInput';
    notes.className = 'panel-content';
    notes.placeholder = 'Type your notes here...';

    const saveBtn = document.createElement('button');
    saveBtn.id = 'saveNotesBtn';
    saveBtn.className = 'btn btn-primary';
    saveBtn.textContent = 'Save Notes';

    container.appendChild(notes);
    container.appendChild(saveBtn);

    notes.value = localStorage.getItem(`notes_${getState().currentTopic}`) || '';

    saveBtn.addEventListener('click', () => {
        localStorage.setItem(`notes_${getState().currentTopic}`, notes.value);
        alert('Notes saved!');
    });
}