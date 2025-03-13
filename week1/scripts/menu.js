const hamburgerIcon = document.getElementById('menu');
const navigation = document.getElementById('navMenu');

hamburgerIcon.addEventListener('click', function () {
    navigation.classList.toggle('show');
    hamburgerIcon.classList.toggle('open');
});