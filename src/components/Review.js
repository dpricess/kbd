// components/Review.js
import { getState, updateReview } from '../lib/state.js';

export function renderReview(container, toggleBtn) {
    container.innerHTML = '<h3>Review</h3>';
    const reviewContent = document.createElement('div');
    reviewContent.id = 'reviewContent';
    reviewContent.className = 'panel-content';
    reviewContent.contentEditable = false;

    const editBtn = document.createElement('button');
    editBtn.id = 'editReviewBtn';
    editBtn.className = 'btn btn-secondary';
    editBtn.textContent = 'Edit Review';

    container.appendChild(reviewContent);
    container.appendChild(editBtn);

    toggleBtn.addEventListener('click', () => {
        container.style.display = container.style.display === 'none' ? 'block' : 'none';
    });

    editBtn.addEventListener('click', () => {
        const isEditable = reviewContent.contentEditable === 'true';
        reviewContent.contentEditable = !isEditable;
        editBtn.textContent = isEditable ? 'Edit Review' : 'Save Review';
        if (isEditable) {
            updateReview('custom', { prompt: 'Custom', answer: reviewContent.innerText, correct: true });
        }
    });

    updateReviewContent(reviewContent);
}

function updateReviewContent(content) {
    const state = getState();
    content.innerHTML = state.reviewData[state.currentTopic] ?
        Object.entries(state.reviewData[state.currentTopic]).map(([_, data]) => `
            <p><strong>${data.prompt}</strong><br>Your answer: ${data.answer}<br>${data.correct ? 'Correct' : 'Incorrect'}</p>
        `).join('') : '<p>No review data yet.</p>';
}