document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.getElementById('menu-icon');
    const navList = document.querySelector('.navlist');

    // Toggle the class 'active' on the navigation list
    menuIcon.addEventListener('click', function() {
        navList.classList.toggle('active');
    });

    // Close the navigation list when a navigation option is clicked
    navList.addEventListener('click', function() {
        navList.classList.remove('active');
    });
});



var DownloadBtn = document.getElementById('DownloadBtn');
DownloadBtn.addEventListener('click', function(event) {
    event.preventDefault();
    var cvUrl = 'https://drive.google.com/file/d/1NC5POaXt2aDSjQyiP4MjR6-h7Z8tNG5w/view?usp=sharing';
    window.open(cvUrl, '_blank');
});