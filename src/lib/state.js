let state = { topics: {}, currentTopic: null, currentSlideIndex: 0, reviewData: {} };

export function initState(topicsData) {
    state.topics = topicsData;
    state.currentTopic = Object.keys(topicsData)[0];
    state.reviewData = JSON.parse(localStorage.getItem('reviewData')) || {};
}

export function getCurrentSlide() {
    return state.topics[state.currentTopic]?.[state.currentSlideIndex];
}

export function nextSlide() {
    if (state.currentSlideIndex < state.topics[state.currentTopic].length - 1) {
        state.currentSlideIndex++;
        return true;
    }
    return false;
}

export function updateReview(slideId, reviewEntry) {
    state.reviewData[state.currentTopic] = state.reviewData[state.currentTopic] || {};
    state.reviewData[state.currentTopic][slideId] = reviewEntry;
    localStorage.setItem('reviewData', JSON.stringify(state.reviewData));
}

export function getState() {
    return { ...state }; // Return a shallow copy to avoid direct mutation
}

export function setTopic(topic) {
    state.currentTopic = topic;
    state.currentSlideIndex = 0;
}