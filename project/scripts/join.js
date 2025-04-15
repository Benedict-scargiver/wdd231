import { handleFormSubmission, redirectToThankYouPage } from './formHandler.mjs';

const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    handleFormSubmission(form);
    redirectToThankYouPage();
});