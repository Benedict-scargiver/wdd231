const last_modif = new Date(document.lastModified);
document.querySelector("#lastModified").textContent = `Last Modification: ${document.lastModified}`;

const currentYear = new Date().getFullYear();
document.querySelector('.currentYear').textContent = currentYear;