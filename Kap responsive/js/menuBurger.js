const toggle = document.getElementById("toggle");
const navigation = document.getElementById("navigation");

// Only attach handlers if elements exist
if (toggle && navigation) {
    // Close the menu when clicking outside of the toggle or the navigation
    document.addEventListener('click', function (e) {
        // If the click is NOT inside #navigation and NOT on the #toggle, close menu
        if (!e.target.closest('#navigation') && !e.target.closest('#toggle')) {
            toggle.classList.remove('active');
            navigation.classList.remove('active');
        }
    });

    // Toggle menu when clicking the burger
    toggle.addEventListener('click', function (e) {
        // prevent the document click handler from immediately closing it
        e.stopPropagation();
        toggle.classList.toggle('active');
        navigation.classList.toggle('active');
    });
}