import { fetchTopics } from './lib/db.js';
import { initState } from './lib/state.js';
import { renderSlide } from './components/Slide.js';
import { renderTopicSelect } from './components/TopicSelect.js';
import { renderReview } from './components/Review.js';
import { renderNotes } from './components/Notes.js'; 

async function init() {
    const topics = await fetchTopics();
    initState(topics);

    const slideContainer = document.getElementById('slideContainer');
    const topicSelectContainer = document.getElementById('topicSelectContainer');
    const reviewContainer = document.getElementById('reviewArea');
    const notesContainer = document.getElementById('notesArea');
    const toggleReviewBtn = document.getElementById('toggleReviewBtn');

    renderTopicSelect(topicSelectContainer, () => {
        renderSlide(slideContainer);
      //renderReview(reviewContainer, toggleReviewBtn);
      //renderNotes(notesContainer);
    });
    renderSlide(slideContainer);
    renderReview(reviewContainer, toggleReviewBtn);
    renderNotes(notesContainer);
}

init();