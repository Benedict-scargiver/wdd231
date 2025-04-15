export function displayThankYouMessage(mainElement) {
    const formSubmitted = localStorage.getItem('formSubmitted');
    const formData = JSON.parse(localStorage.getItem('formData'));

    const thankYouSection = document.createElement('section');
    thankYouSection.classList.add('thank-you-section');

    if (formSubmitted === 'true') {
        thankYouSection.innerHTML = `
            <h1>Thank You for Subscribing to our weekly Newsletter!</h1>
            <button id="viewFormData">View Submitted Data</button>
        `;
    } else {
        thankYouSection.innerHTML = `
            <h1>No Subscription Detected</h1>
            <p>Please go to the Newsletter page to subscribe to our weekly newsletter!</p>
            <a href="join.html" class="join-button">Newsletter page</a>
        `;
    }

    mainElement.appendChild(thankYouSection);

    if (formSubmitted === 'true') {
        const viewFormDataButton = document.getElementById('viewFormData');
        viewFormDataButton.addEventListener('click', () => {
            const dialog = document.createElement('dialog');
            dialog.classList.add('form-data-dialog');

            let dataHtml = '<h2>Submitted Form Data:</h2><ul>';
            for (const [key, value] of Object.entries(formData)) {
                if (Array.isArray(value)) {
                    dataHtml += `<li><strong>${key}:</strong> ${value.join(', ')}</li>`;
                } else if ( value === null || value === '') {
                    dataHtml += `<li><strong>${key}:</strong> Not provided</li>`;
                } else {
                    dataHtml += `<li><strong>${key}:</strong> ${value}</li>`;
                }
            }
            dataHtml += '</ul>';
            dataHtml += `<button class="close-dialog">Close</button>`;
            dialog.innerHTML = dataHtml;

            document.body.appendChild(dialog);
            dialog.showModal();

            const closeDialogButton = dialog.querySelector('.close-dialog');
            closeDialogButton.addEventListener('click', () => {
                dialog.close();
                dialog.remove();
            });
        });
    }
}