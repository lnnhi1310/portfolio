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

   
    document.addEventListener('DOMContentLoaded', () => {
        const carousels = [
            { id: '#carouselExample1', trackClass: '.carousel-track', thumbnailClass: '.track-thumbnail img', trackWrapperClass: '.carousel-track-wrapper' },
            { id: '#carouselExample2', trackClass: '.carousel-track2', thumbnailClass: '.track-thumbnail2 img', trackWrapperClass: '.carousel-track-wrapper2' },
            { id: '#carouselExample3', trackClass: '.carousel-track3', thumbnailClass: '.track-thumbnail3 img', trackWrapperClass: '.carousel-track-wrapper3' }
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
    
                // Center the active thumbnail
                centerActiveThumbnail(activeIndex);
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