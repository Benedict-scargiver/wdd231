document.addEventListener('DOMContentLoaded', () => {
    const membershipDetails = {
        "nonprofit": {
            title: "Non-Profit Membership Level",
            benefits: [
                "Training: ✅",
                "Advertising: ❌",
                "Event Discounts: ❌",
                "City Sponsorship: ❌",
                "Extra Fees: ₦0"
            ]
        },
        "bronze": {
            title: "Bronze Membership Level",
            benefits: [
                "Training: ✅",
                "Advertising: ✅",
                "Event Discounts: ❌",
                "City Sponsorship: ❌",
                "Extra Fees: ₦10,000"
            ]
        },
        "silver": {
            title: "Silver Membership Level",
            benefits: [
                "Training: ✅",
                "Advertising: ✅",
                "Event Discounts: ✅",
                "City Sponsorship: ❌",
                "Extra Fees: ₦15,000"
            ]
        },
        "gold": {
            title: "Gold Membership Level",
            benefits: [
                "Training: ✅",
                "Advertising: ✅",
                "Event Discounts: ✅",
                "City Sponsorship: ✅",
                "Extra Fees: ₦25,000"
            ]
        }
    };

    document.querySelectorAll('.details-btn').forEach(button => {
        button.addEventListener('click', () => {
            const level = button.dataset.level;
            const dialog = document.querySelector(`#${level}-details`);
            const details = membershipDetails[level];

            dialog.querySelector('h3').textContent = details.title;
            dialog.querySelector('ul').innerHTML = details.benefits.map(benefit => `<li>${benefit}</li>`).join('');
            dialog.showModal();
        });
    });

    document.querySelectorAll('.close-btn').forEach(button => {
        button.addEventListener('click', () => {
            button.closest('dialog').close();
        });
    });

    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', setDateTime);
    }
});

function setDateTime(event) {
    const now = new Date();
    const dateTimeString = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
    document.getElementById('dateTime').value = dateTimeString;
}