// components/TopicSelect.js
import { getState, setTopic } from '../lib/state.js';
console.log("topicselect.js loaded");
export function renderTopicSelect(container, onChange) {
    const select = document.createElement('select');
    select.className = 'topic-select';
    const topics = getState().topics;
    select.innerHTML = Object.keys(topics).map(topic => `
        <option value="${topic}">${topic.charAt(0).toUpperCase() + topic.slice(1).replace(/([A-Z])/g, ' $1')}</option>
    `).join('') || '<option value="">No topics available</option>';
    container.innerHTML = '<div class="slide-header"></div>';
    container.querySelector('.slide-header').appendChild(select);
    select.addEventListener('change', () => {
        setTopic(select.value);
        onChange();
    });
}