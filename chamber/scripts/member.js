async function fetchMembers() {
    try {
        const response = await fetch('data/member.json'); // Fetch the member data
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json(); // Parse JSON directly
        localStorage.setItem('members', JSON.stringify(data)); // Store data locally
        displayMembers(data); // Display members
    } catch (error) {
        console.error('Error fetching member data:', error);
    }
}

function displayMembers(members) {
    const memberContainer = document.getElementById('member-container');
    memberContainer.innerHTML = ''; // Clear previous content

    if (!members.length) {
        memberContainer.innerHTML = '<p>No members found.</p>';
        return;
    }

    members.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.classList.add('member-card');

        // Check if the container is in list view or grid view
        if (memberContainer.classList.contains('list-view')) {
            memberCard.innerHTML = `
                <h3>${member.name}</h3>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
            `;
        } else {
            memberCard.innerHTML = `
                <img src="data/${member.image}" alt="${member.name}" class="member-image">
                <h3>${member.name}</h3>
                <p><strong>Address:</strong> ${member.address}</p>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
                <p><strong>Membership Level:</strong> ${getMembershipLevel(member.membership_level)}</p>
                <p><strong>Industry:</strong> ${member.industry}</p>
            `;
        }

        memberContainer.appendChild(memberCard);
    });
}

function getMembershipLevel(level) {
    switch(level.toLowerCase()) {
        case 'bronze': return 'Bronze Member';
        case 'silver': return 'Silver Member';
        case 'gold': return 'Gold Member';
        default: return 'Unknown Membership Level';
    }
}

function toggleView(view) {
    const container = document.getElementById('member-container');
    container.classList.remove('grid-view', 'list-view');
    container.classList.add(view === 'grid' ? 'grid-view' : 'list-view');

    const members = JSON.parse(localStorage.getItem('members')) || [];
    displayMembers(members);
}

document.addEventListener('DOMContentLoaded', async () => {
    await fetchMembers(); // Fetch and display member data on page load
});
