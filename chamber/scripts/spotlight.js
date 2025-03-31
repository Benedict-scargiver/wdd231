// Path to JSON file
const jsonFilePath = './data/member.json';

// Function to fetch and display member spotlights
async function displaySpotlights() {
    try {
        const response = await fetch(jsonFilePath);
        const members = await response.json();

        // Filter gold and silver members
        const eligibleMembers = members.filter(member => 
            member.membership_level === 'gold' || member.membership_level === 'silver'
        );

        // Randomly select 3 members
        const spotlights = [];
        while (spotlights.length < 3 && eligibleMembers.length > 0) {
            const randomIndex = Math.floor(Math.random() * eligibleMembers.length);
            spotlights.push(eligibleMembers.splice(randomIndex, 1)[0]);
        }

        // Display spotlights on HTML page
        const spotlightContainer = document.getElementById('spotlight-container');
        spotlightContainer.innerHTML = ''; // Clear previous content

        spotlights.forEach(member => {
            const memberHTML = `
                <div class="mem">
                    <h3>${member.name}</h3>
                    <img src="${member.imagesrc}" alt="${member.name} logo">
                    <p><strong>Phone:</strong> ${member.phone}</p>
                    <p><strong>Address:</strong> ${member.address}</p>
                    <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
                    <p><strong>Membership Level:</strong> ${member.membership_level}</p>
                </div>
            `;
            spotlightContainer.innerHTML += memberHTML;
        });
    } catch (error) {
        console.error('Error fetching or displaying members:', error);
    }
}

// Call the function to display spotlights
displaySpotlights();
