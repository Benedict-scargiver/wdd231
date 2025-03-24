// Get the current year and update the <span> tag  
document.getElementById('currentyear').textContent = new Date().getFullYear();  

// Get the last modified date and update the <p> tag with id "lastModified"  
document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;