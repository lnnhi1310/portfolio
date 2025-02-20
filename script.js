    function setupOverlay(openId, overlayId, closeId) {
    const openButton = document.getElementById(openId);
    const overlay = document.getElementById(overlayId);
    const closeButton = document.getElementById(closeId);

    if (openButton && overlay && closeButton) {
        openButton.addEventListener('click', () => overlay.style.display = 'flex');
        closeButton.addEventListener('click', () => overlay.style.display = 'none');
    } else {
        console.warn(`Missing element(s) for IDs: ${openId}, ${overlayId}, ${closeId}`);
    }
    }

    // Set up all overlays
    setupOverlay('openOverlay1', 'overlay1', 'closeOverlay1');
    setupOverlay('openOverlay2', 'overlay2', 'closeOverlay2');
    setupOverlay('openOverlay3', 'overlay3', 'closeOverlay3');
    setupOverlay('openOverlay4', 'overlay4', 'closeOverlay4');
    setupOverlay('openOverlay5', 'overlay5', 'closeOverlay5');
    setupOverlay('openOverlay6', 'overlay6', 'closeOverlay6');

    document.addEventListener('DOMContentLoaded', () => {
        const carousels = [
            { id: '#carouselExample1', trackClass: '.carousel-track', thumbnailClass: '.track-thumbnail img', trackWrapperClass: '.carousel-track-wrapper' },
            { id: '#carouselExample2', trackClass: '.carousel-track2', thumbnailClass: '.track-thumbnail2 img', trackWrapperClass: '.carousel-track-wrapper2' },
            { id: '#carouselExample3', trackClass: '.carousel-track3', thumbnailClass: '.track-thumbnail3 img', trackWrapperClass: '.carousel-track-wrapper3' },
            { id: '#carouselExample4', trackClass: '.carousel-track4', thumbnailClass: '.track-thumbnail4 img', trackWrapperClass: '.carousel-track-wrapper4' },
        ];
    
        carousels.forEach((carouselData, index) => {
            const carousel = document.querySelector(carouselData.id);
            const track = document.querySelector(carouselData.trackClass);
            const thumbnails = document.querySelectorAll(carouselData.thumbnailClass);
    
            // Function to center the active thumbnail in the track
            function centerActiveThumbnail(activeIndex) {
                const activeThumbnail = thumbnails[activeIndex];
                const trackWrapperWidth = document.querySelector(carouselData.trackWrapperClass).offsetWidth;
                const thumbnailWidth = activeThumbnail.offsetWidth;
                const activeThumbnailOffsetLeft = activeThumbnail.offsetLeft;
    
                // Calculate the scroll position to center the active thumbnail
                const scrollTo = activeThumbnailOffsetLeft - (trackWrapperWidth / 2) + (thumbnailWidth / 2);
                track.style.transform = `translateX(-${scrollTo}px)`;
            }
    
            // Bootstrap carousel event listener
            carousel.addEventListener('slide.bs.carousel', (event) => {
                const activeIndex = event.to;
    
                // Highlight the active thumbnail
                thumbnails.forEach((thumb, index) => {
                    thumb.classList.toggle('active-thumb', index === activeIndex);
                });
    
                // If the active thumbnail is at the first slide, reset translateX to 0
                if (activeIndex === 0) {
                    track.style.transform = 'translateX(0)';
                } else {
                    // Center the active thumbnail for other slides
                    centerActiveThumbnail(activeIndex);
                }
            });
    
            // Add click event to thumbnails
            thumbnails.forEach((thumbnail, index) => {
                thumbnail.addEventListener('click', () => {
                    thumbnails.forEach((thumb) => thumb.classList.remove('active-thumb'));
                    thumbnail.classList.add('active-thumb');
                    centerActiveThumbnail(index);
                });
            });
    
            // Initial centering of the active thumbnail
            const activeIndex = Array.from(thumbnails).findIndex((thumb) =>
                thumb.classList.contains('active-thumb')
            );
            centerActiveThumbnail(activeIndex === -1 ? 0 : activeIndex);
        });
    
        // Ensure mobile responsiveness using touch events
        document.querySelectorAll('.carousel-track').forEach((track) => {
            let startX = 0;
            let isTouching = false;
    
            track.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                isTouching = true;
            });
    
            track.addEventListener('touchmove', (e) => {
                if (!isTouching) return;
                const touchMove = e.touches[0].clientX;
                const diff = startX - touchMove;
    
                track.style.transform = `translateX(${diff}px)`;
            });
    
            track.addEventListener('touchend', () => {
                isTouching = false;
                track.style.transition = 'transform 0.3s ease-in-out';
            });
    
            track.addEventListener('transitionend', () => {
                track.style.transition = '';
            });
        });
    });

    document.addEventListener('DOMContentLoaded', () => {
        const soundToggleButton = document.getElementById('sound-toggle-btn');
        const wiggleElements = document.querySelectorAll('.wiggle');
        let soundEnabled = JSON.parse(localStorage.getItem('soundEnabled')) ?? true; // Default to true if not set
    
        // Update the button text based on the saved state
        function updateButtonText() {
            soundToggleButton.textContent = soundEnabled ? '🔊' : '🔈';
        }
    
        // Function to toggle sound on and off
        function toggleSound() {
            soundEnabled = !soundEnabled; // Toggle state
            localStorage.setItem('soundEnabled', JSON.stringify(soundEnabled)); // Save state
            updateButtonText(); // Update button text
        }
    
        // Add click event to the sound toggle button
        soundToggleButton.addEventListener('click', toggleSound);
    
        // Update button text on page load
        updateButtonText();
    
        // Add event listener for hover on each wiggle element
        wiggleElements.forEach((element) => {
            element.addEventListener('mouseenter', () => {
                console.log('Hovering:', element);
                if (soundEnabled) {
                    const soundFile = element.getAttribute('data-sound');
                    console.log('Sound File:', soundFile);
                    if (soundFile) {
                        const audio = new Audio(`file/${soundFile}`);
                        audio.play().catch((error) => console.error('Audio Play Error:', error));
                    } else {
                        console.error('No data-sound attribute found.');
                    }
                }
            });
        });
    });

        // Function to open the overlay based on the URL fragment
        window.onload = function () {
            const hash = window.location.hash; // Get the hash from the URL
            if (hash) {
                const overlay = document.querySelector(hash); // Find the overlay by ID
                if (overlay) {
                    overlay.style.display = "flex"; // Show the overlay
                }
            }
        };
    
        // Function to close the overlay
        function closeOverlay() {
            const overlays = document.querySelectorAll(".overlay");
            overlays.forEach(overlay => overlay.style.display = "none");
        }