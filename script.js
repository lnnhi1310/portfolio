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

   
    const carousel = document.querySelector('#carouselExample1');
        const track = document.querySelector('.carousel-track');
        const thumbnails = document.querySelectorAll('.track-thumbnail img');

        // Function to center the active thumbnail in the track
        function centerActiveThumbnail(activeIndex) {
            const activeThumbnail = thumbnails[activeIndex];
            const trackWrapperWidth = document.querySelector('.carousel-track-wrapper').offsetWidth;
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
        document.addEventListener('DOMContentLoaded', () => {
            const activeIndex = Array.from(thumbnails).findIndex((thumb) =>
                thumb.classList.contains('active-thumb')
            );
            centerActiveThumbnail(activeIndex === -1 ? 0 : activeIndex);
        });

// phan 2//
document.addEventListener('DOMContentLoaded', () => {
    const carousel2 = document.querySelector('#carouselExample2');
    const track2 = document.querySelector('.carousel-track2');
    const thumbnails2 = document.querySelectorAll('.track-thumbnail2 img');

    // Function to center the active thumbnail in the track
    function centerActiveThumbnail2(activeIndex2) {
        const activeThumbnail2 = thumbnails2[activeIndex2];
        const trackWrapperWidth2 = document.querySelector('.carousel-track-wrapper2').offsetWidth;
        const thumbnailWidth2 = activeThumbnail2.offsetWidth;
        const activeThumbnailOffsetLeft2 = activeThumbnail2.offsetLeft;

        // Calculate the scroll position to center the active thumbnail
        const scrollTo = activeThumbnailOffsetLeft2 - (trackWrapperWidth2 / 2) + (thumbnailWidth2 / 2);
        track2.style.transform = `translateX(-${scrollTo}px)`;
    }

    // Bootstrap carousel event listener
    carousel2.addEventListener('slide.bs.carousel', (event) => {
        const activeIndex2 = event.to;

        // Highlight the active thumbnail
        thumbnails2.forEach((thumb2, index) => {
            thumb2.classList.toggle('active-thumb2', index === activeIndex2);
        });

        // Center the active thumbnail
        centerActiveThumbnail2(activeIndex2);
    });

    // Add click event to thumbnails
    thumbnails2.forEach((thumbnail2, index) => {
        thumbnail2.addEventListener('click', () => {
            thumbnails2.forEach((thumb2) => thumb2.classList.remove('active-thumb2'));
            thumbnail2.classList.add('active-thumb2');
            centerActiveThumbnail2(index);
        });
    });

    // Initial centering of the active thumbnail
    const activeIndex2 = Array.from(thumbnails2).findIndex((thumb) =>
        thumb.classList.contains('active-thumb2')
    );
    centerActiveThumbnail2(activeIndex2 === -1 ? 0 : activeIndex2);
});

// phan 3//
document.addEventListener('DOMContentLoaded', () => {
    const carousel3 = document.querySelector('#carouselExample3');
    const track3 = document.querySelector('.carousel-track3');
    const thumbnails3 = document.querySelectorAll('.track-thumbnail3 img');

    // Function to center the active thumbnail in the track
    function centerActiveThumbnail3(activeIndex3) {
        const activeThumbnail3 = thumbnails3[activeIndex3];
        const trackWrapperWidth3 = document.querySelector('.carousel-track-wrapper3').offsetWidth;
        const thumbnailWidth3 = activeThumbnail3.offsetWidth;
        const activeThumbnailOffsetLeft3 = activeThumbnail3.offsetLeft;

        // Calculate the scroll position to center the active thumbnail
        const scrollTo = activeThumbnailOffsetLeft3 - (trackWrapperWidth3 / 2) + (thumbnailWidth3 / 2);
        track3.style.transform = `translateX(-${scrollTo}px)`;
    }

    // Bootstrap carousel event listener
    carousel3.addEventListener('slide.bs.carousel', (event) => {
        const activeIndex3 = event.to;

        // Highlight the active thumbnail
        thumbnails3.forEach((thumb3, index) => {
            thumb3.classList.toggle('active-thumb3', index === activeIndex3);
        });

        // Center the active thumbnail
        centerActiveThumbnail3(activeIndex3);
    });

    // Add click event to thumbnails
    thumbnails3.forEach((thumbnail3, index) => {
        thumbnail3.addEventListener('click', () => {
            thumbnails3.forEach((thumb3) => thumb3.classList.remove('active-thumb3'));
            thumbnail3.classList.add('active-thumb3');
            centerActiveThumbnail3(index);
        });
    });

    // Initial centering of the active thumbnail
    const activeIndex3 = Array.from(thumbnails3).findIndex((thumb) =>
        thumb.classList.contains('active-thumb3')
    );
    centerActiveThumbnail3(activeIndex3 === -1 ? 0 : activeIndex3);
});