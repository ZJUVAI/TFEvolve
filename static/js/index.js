window.HELP_IMPROVE_VIDEOJS = false;


$(document).ready(function() {
    // Check for click events on the navbar burger icon

    var options = {
			slidesToScroll: 1,
			slidesToShow: 1,
			loop: true,
			infinite: true,
			autoplay: true,
			autoplaySpeed: 5000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);
	
    bulmaSlider.attach();

})

// Function to load text file content
async function loadTextInstruction(filename, elementId) {
  try {
    const response = await fetch(filename);
    const text = await response.text();
    document.getElementById(elementId).textContent = text;
  } catch (error) {
    console.error('Error loading instruction:', error);
  }
}

// Load text instructions when the page loads
document.addEventListener('DOMContentLoaded', function() {
  // Load text-based instructions
  loadTextInstruction('static/videos/bonsai_text/instruction.txt', 'bonsai-text-caption');
  loadTextInstruction('static/videos/feet_text/instruction.txt', 'feet-text-caption');
  loadTextInstruction('static/videos/head_text/instruction.txt', 'head-text-caption');
  loadTextInstruction('static/videos/jet_text/instruction.txt', 'jet-text-caption');
});
