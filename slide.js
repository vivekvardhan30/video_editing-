let slideIndex = 0;  // Starting index for the slideshow
showSlides();

// Function to show slides automatically
function showSlides() {
    let i;
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");

    // Hide all slides initially
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Reset slide index if it exceeds the total number of slides
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1; }

    // Remove active class from all dots
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // Display the current slide and set the corresponding dot as active
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";

    // Change slide every 5 seconds
    setTimeout(showSlides, 7000);
}

// Manual navigation (optional, for previous/next buttons)
function plusSlides(n) {
    slideIndex += n - 1;  // Adjust index for manual navigation
    showSlides();
}

// Navigate to the selected dot's slide
function currentSlide(n) {
    slideIndex = n - 1;
    showSlides();
}
