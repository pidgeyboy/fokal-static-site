// Hero Demo - Main Controller
// Initializes and controls the interactive gap cards demo

// Static query example
const queryExample = {
    query: "What are the best investment platforms for people new to the stock market in Australia?",
    competitors: "CommSec, Sharesies, Superhero (+5 more)"
};

let selectedGapType = 'visibility_gap'; // Default to visibility gap

// Gap type display names
const gapTypeNames = {
    'pr_opportunity': 'PR Opportunity',
    'visibility_gap': 'Visibility Gap',
    'technical_seo': 'Technical SEO',
    'media_pitch': 'Media Pitch'
};

function initHeroDemo() {
    // Render query carousel
    renderQueryCarousel();

    // Render filter pills
    renderFilterPills();

    // Render single showcase gap card
    renderShowcaseGapCard();

    // Initialize modal listeners
    initModalListeners();

    // Track page view
    trackEvent('hero_demo_view', {
        total_gaps: gaps.length
    });

    console.log('Hero demo initialized with', gaps.length, 'gaps');
}

function renderQueryCarousel() {
    const queryTextEl = document.getElementById('current-query');
    const competitorsEl = document.getElementById('competitors-list');

    if (!queryTextEl || !competitorsEl) {
        console.error('Query carousel elements not found');
        return;
    }

    queryTextEl.textContent = `"${queryExample.query}"`;
    competitorsEl.textContent = queryExample.competitors;
}

function renderFilterPills() {
    const container = document.querySelector('.filter-pills-container');
    if (!container) {
        console.error('Filter pills container not found');
        return;
    }

    // Clear existing content
    container.innerHTML = '';

    // Get unique gap types from gaps array
    const gapTypes = gaps.map(g => g.type);

    // Create filter pill for each gap type
    gapTypes.forEach(type => {
        const pill = document.createElement('button');
        pill.className = 'filter-pill';
        if (type === selectedGapType) {
            pill.classList.add('active');
        }

        pill.textContent = gapTypeNames[type] || type;

        // Add click handler
        pill.addEventListener('click', function() {
            selectedGapType = type;
            renderFilterPills(); // Re-render to update active state
            renderShowcaseGapCard(); // Re-render card with new filter

            // Track filter change
            trackEvent('filter_change', {
                gap_type: type
            });
        });

        container.appendChild(pill);
    });
}

function renderShowcaseGapCard() {
    const container = document.querySelector('.gap-cards-grid');
    if (!container) {
        console.error('Gap cards container not found');
        return;
    }

    // Clear existing content
    container.innerHTML = '';

    // Find the gap matching the selected type
    const selectedGap = gaps.find(g => g.type === selectedGapType);
    if (!selectedGap) {
        console.error('Selected gap not found:', selectedGapType);
        return;
    }

    const card = createGapCard(selectedGap);
    container.appendChild(card);
}

function createGapCard(gap) {
    const card = document.createElement('div');
    card.className = 'gap-card';
    card.setAttribute('data-gap-id', gap.id);

    // No meta/badge row for homepage - just spacing

    // Split hook on newlines for proper rendering
    const hookLines = gap.hook.split('\n').filter(line => line.trim());
    const mainMessage = hookLines[0] || '';
    const detailLines = hookLines.slice(1);

    // Build hook HTML with dividers
    let hookHTML = `<p class="gap-hook-main">${mainMessage}</p>`;
    if (detailLines.length > 0) {
        hookHTML += '<div class="gap-hook-divider"></div>';
        detailLines.forEach((line, idx) => {
            hookHTML += `<p class="gap-hook-detail">${line}</p>`;
            if (idx === 0 && detailLines.length > 1) {
                hookHTML += '<div class="gap-hook-divider"></div>';
            }
        });
    }

    // ArrowRight SVG icon
    const arrowIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>';

    card.innerHTML = `
        <div class="gap-content-wrapper">
            <h3 class="gap-title">${gap.typeName}</h3>
            ${hookHTML}
            <div class="gap-button-container">
                <button class="fix-gap-btn" data-gap-id="${gap.id}">
                    Fix gap
                    ${arrowIcon}
                </button>
            </div>
        </div>
    `;

    // Attach click handler to the button
    const button = card.querySelector('.fix-gap-btn');
    button.addEventListener('click', function(e) {
        e.stopPropagation();
        const gapId = parseInt(this.getAttribute('data-gap-id'));
        handleFixGapClick(gapId);
    });

    // Optional: Make entire card clickable
    card.addEventListener('click', function() {
        const gapId = parseInt(this.getAttribute('data-gap-id'));
        handleFixGapClick(gapId);
    });

    // Track card impression
    trackCardImpression(card, gap);

    return card;
}

function handleFixGapClick(gapId) {
    const gap = gaps.find(g => g.id === gapId);
    if (!gap) {
        console.error('Gap not found:', gapId);
        return;
    }

    // Track click event
    trackEvent('fix_gap_click', {
        gap_id: gapId,
        gap_type: gap.type,
        priority: gap.priority
    });

    // Open modal
    openModal(gapId);
}

function trackCardImpression(cardElement, gap) {
    // Use Intersection Observer to track when card comes into view
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        trackEvent('card_impression', {
                            gap_id: gap.id,
                            gap_type: gap.type,
                            priority: gap.priority
                        });
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );

        observer.observe(cardElement);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroDemo);
} else {
    // DOM is already loaded
    initHeroDemo();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initHeroDemo,
        renderQueryCarousel,
        renderFilterPills,
        renderShowcaseGapCard,
        createGapCard
    };
}
