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
async function loadTextInstruction(element) {
  try {
    const filename = element.dataset.instruction;
    console.log(`Loading instruction from ${filename}`);
    const response = await fetch(filename);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const text = await response.text();
    element.textContent = text.replace(/^"|"$/g, ''); // Remove surrounding quotes if present
    console.log(`Successfully loaded instruction for ${element.id}`);
  } catch (error) {
    console.error(`Error loading instruction for ${element.id}:`, error);
    element.textContent = 'Failed to load instruction';
  }
}

// Lazy load videos
function lazyLoadVideos() {
  const videos = document.querySelectorAll('video');
  
  const videoObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const video = entry.target;
        const source = video.querySelector('source');
        const container = video.closest('.video-container');
        
        if (source.dataset.src && !source.src) {
          container.classList.add('loading');
          source.src = source.dataset.src;
          video.load();
          
          video.addEventListener('loadeddata', () => {
            container.classList.remove('loading');
          });
          
          observer.unobserve(video);
        }
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '50px'
  });
  
  videos.forEach(video => {
    videoObserver.observe(video);
  });
}

// Load text instructions and setup lazy loading when the page loads
document.addEventListener('DOMContentLoaded', function() {
  // Load text-based instructions
  const captions = document.querySelectorAll('.video-caption[data-instruction]');
  captions.forEach(caption => {
    loadTextInstruction(caption);
  });
  
  // Initialize lazy loading
  lazyLoadVideos();
});
