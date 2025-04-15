export function handleFormSubmission(form) {
    const formData = new FormData(form);
    const formObject = {};

    formData.forEach((value, key) => {
        if (key === 'newsletterSelection') {
            if (!formObject[key]) {
                formObject[key] = [];
            }
            formObject[key].push(value);
        } else {
            formObject[key] = value;
        }
    });

    localStorage.setItem('formSubmitted', 'true');
    localStorage.setItem('formData', JSON.stringify(formObject));
}

export function redirectToThankYouPage() {
    window.location.href = 'thankyou.html';
}