// Modal Controller - Handle modal open/close and solution display

let currentGapType = null;
let savedScrollPosition = 0;

function openModal(gapId) {
    const gap = gaps.find(g => g.id === gapId);
    if (!gap) {
        console.error('Gap not found:', gapId);
        return;
    }

    currentGapType = gap.type;

    const modal = document.getElementById('solution-modal');
    const content = modal.querySelector('.modal-content');

    if (!modal || !content) {
        console.error('Modal elements not found');
        return;
    }

    // Render the appropriate solution template
    const renderer = SolutionRenderers[gap.type];
    if (!renderer) {
        console.error('No renderer found for gap type:', gap.type);
        return;
    }

    content.innerHTML = renderer(gap);

    // Attach close button listener (must happen after content is rendered)
    const closeButton = modal.querySelector('.close-modal');
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    // Reset scroll position to top
    const modalContainer = modal.querySelector('.modal-container');
    if (modalContainer) {
        modalContainer.scrollTop = 0;
    }

    // Save current scroll position before opening modal
    savedScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    // Show modal with animation
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${savedScrollPosition}px`;
    document.body.style.width = '100%';

    // Attach event listeners for copy buttons and CTAs
    attachCopyListeners();
    attachCTAListeners();

    // Track modal open event
    trackEvent('modal_open', { gap_type: gap.type, gap_id: gapId });
}

function closeModal() {
    const modal = document.getElementById('solution-modal');
    if (!modal) return;

    // Animate out
    modal.classList.remove('active');

    // Hide after animation and restore scroll
    setTimeout(() => {
        modal.style.display = 'none';

        // Restore body scroll and position
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';

        // Restore scroll position
        window.scrollTo(0, savedScrollPosition);
    }, 300);

    // Track modal close event
    if (currentGapType) {
        trackEvent('modal_close', { gap_type: currentGapType });
    }
    currentGapType = null;
}

function getCurrentGapType() {
    return currentGapType;
}

function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) {
        console.error('Section not found:', sectionId);
        return;
    }

    const isExpanded = section.classList.contains('expanded');

    if (isExpanded) {
        // Collapse
        section.classList.remove('expanded');
        section.style.maxHeight = '0';
    } else {
        // Expand
        section.classList.add('expanded');
        section.style.maxHeight = section.scrollHeight + 'px';
    }

    // Track toggle event
    trackEvent('section_toggle', {
        section_id: sectionId,
        action: isExpanded ? 'collapse' : 'expand'
    });
}

// Make toggleSection available globally for onclick handlers
window.toggleSection = toggleSection;

function attachCTAListeners() {
    const ctaButtons = document.querySelectorAll('.primary-btn');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const gapType = this.getAttribute('data-gap-type');
            handleCTAClick(gapType);
        });
    });
}

function handleCTAClick(gapType) {
    // Track conversion
    trackEvent('cta_click', {
        gap_type: gapType,
        source: 'hero_demo'
    });

    // Check if user is authenticated (optional)
    const isAuthenticated = document.cookie.includes('session_token') ||
                           document.cookie.includes('auth_token');

    // Redirect based on authentication status
    if (isAuthenticated) {
        // Authenticated users go to dashboard
        window.location.href = '/brand/1/greatness';
    } else {
        // Anonymous users go to sign-up with tracking
        window.location.href = `/signup?ref=hero-demo&gap=${gapType}`;
    }
}

function trackEvent(eventName, eventData) {
    // Google Analytics tracking (if available)
    if (typeof gtag === 'function') {
        gtag('event', eventName, eventData);
    }

    // Console log for debugging
    console.log('Event tracked:', eventName, eventData);

    // Add other analytics tracking here (Mixpanel, Amplitude, etc.)
}

// Set up modal event listeners
function initModalListeners() {
    // Close button
    const closeButton = document.querySelector('.close-modal');
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    // Click outside modal to close
    const modal = document.getElementById('solution-modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // ESC key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' || e.keyCode === 27) {
            const modal = document.getElementById('solution-modal');
            if (modal && modal.style.display === 'flex') {
                closeModal();
            }
        }
    });
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        openModal,
        closeModal,
        getCurrentGapType,
        initModalListeners,
        trackEvent
    };
}
