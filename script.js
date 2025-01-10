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
