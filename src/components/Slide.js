import { getCurrentSlide, nextSlide, updateReview } from '../lib/state.js';

export function renderSlide(container) {
    container.innerHTML = '';
    const slide = getCurrentSlide();
    if (!slide) return;

    const slideDiv = document.createElement('div');
    slideDiv.className = 'slide';
    let content = `<div class="slide-content">`;
    if (slide.type === 'fill') {
        content += `
            <p>${slide.prompt.replace('___', `<input type="text" id="fill-${slide.id}" class="cloze-input">`)}</p>
            <button class="btn btn-primary submit-btn" data-id="${slide.id}">Submit</button>
            <span id="feedback-${slide.id}"></span>
            <span id="error-${slide.id}"></span>
        `;
    }
    content += `</div><div class="slide-footer"><button class="btn btn-primary next-slide-btn">Next Slide</button></div>`;
    slideDiv.innerHTML = content;
    container.appendChild(slideDiv);

    slideDiv.querySelector('.submit-btn')?.addEventListener('click', () => checkAnswer(slide, container));
    slideDiv.querySelector('.next-slide-btn').addEventListener('click', () => nextSlide() && renderSlide(container));
}

function checkAnswer(slide, container) {
    const feedback = document.getElementById(`feedback-${slide.id}`);
    const error = document.getElementById(`error-${slide.id}`);
    const input = document.getElementById(`fill-${slide.id}`);
    const isCorrect = input.value.trim().toLowerCase() === slide.answer?.toLowerCase();
    feedback.textContent = isCorrect ? 'Correct!' : '';
    error.textContent = isCorrect ? '' : 'Try again';
    if (isCorrect) {
        updateReview(slide.id, { prompt: slide.prompt, answer: slide.answer, correct: true });
        setTimeout(() => nextSlide() && renderSlide(container), 2000);
    }
}