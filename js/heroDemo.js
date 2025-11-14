// Hero Demo - Main Controller
// Initializes and controls the interactive gap cards demo

// Query data for carousel
const queries = [
    {
        id: 1,
        query: "What are the best investment platforms for people new to the stock market in Australia?",
        competitors: "CommSec, Sharesies, Superhero (+5 more)"
    },
    {
        id: 2,
        query: "Which Australian stock trading app has the lowest fees?",
        competitors: "Superhero, Tiger Brokers, CommSec (+4 more)"
    },
    {
        id: 3,
        query: "Can Australians invest in US stocks easily?",
        competitors: "CommSec, Tiger Brokers, Moomoo (+6 more)"
    },
    {
        id: 4,
        query: "What's the best platform for SMSF investing in Australia?",
        competitors: "Netwealth, CommSec, HUB24 (+5 more)"
    },
    {
        id: 5,
        query: "Which trading platform is best for beginners learning to invest?",
        competitors: "CommSec, Sharesies, Pearler (+4 more)"
    },
    {
        id: 6,
        query: "How can I invest small amounts regularly in Australian shares?",
        competitors: "Raiz, Spaceship, Sharesies (+3 more)"
    },
    {
        id: 7,
        query: "What are the alternatives to traditional stockbrokers in Australia?",
        competitors: "Superhero, Tiger Brokers, Pearler (+5 more)"
    },
    {
        id: 8,
        query: "Which app lets Australians buy fractional shares?",
        competitors: "Sharesies, Raiz, Superhero (+2 more)"
    }
];

let currentQueryIndex = 0;

function initHeroDemo() {
    // Render query carousel
    renderQueryCarousel();

    // Render single expanded gap card
    renderExpandedGapCard();

    // Initialize carousel navigation
    initCarouselNavigation();

    // Initialize modal listeners
    initModalListeners();

    // Track page view
    trackEvent('hero_demo_view', {
        total_gaps: gaps.length,
        total_queries: queries.length
    });

    console.log('Hero demo initialized with', gaps.length, 'gaps and', queries.length, 'queries');
}

function renderQueryCarousel() {
    const queryTextEl = document.getElementById('current-query');
    const competitorsEl = document.getElementById('competitors-list');
    const counterEl = document.getElementById('query-counter');

    if (!queryTextEl || !competitorsEl || !counterEl) {
        console.error('Query carousel elements not found');
        return;
    }

    const currentQuery = queries[currentQueryIndex];
    queryTextEl.textContent = `"${currentQuery.query}"`;
    competitorsEl.textContent = currentQuery.competitors;
    counterEl.textContent = `Query ${currentQueryIndex + 1} of ${queries.length}`;
}

function initCarouselNavigation() {
    const nextBtn = document.getElementById('query-next-btn');
    if (!nextBtn) {
        console.error('Next button not found');
        return;
    }

    nextBtn.addEventListener('click', function() {
        // Cycle to next query
        currentQueryIndex = (currentQueryIndex + 1) % queries.length;
        renderQueryCarousel();

        // Track carousel navigation
        trackEvent('query_carousel_next', {
            query_index: currentQueryIndex
        });
    });
}

function renderExpandedGapCard() {
    const container = document.querySelector('.expanded-gap-container');
    if (!container) {
        console.error('Expanded gap container not found');
        return;
    }

    // Clear existing content
    container.innerHTML = '';

    // Render the visibility gap (ID 2) as expanded card - most compelling example
    const visibilityGap = gaps.find(g => g.id === 2);
    if (!visibilityGap) {
        console.error('Visibility gap not found');
        return;
    }

    const card = createGapCard(visibilityGap);
    container.appendChild(card);
}

function createGapCard(gap) {
    const card = document.createElement('div');
    card.className = 'gap-card';
    card.setAttribute('data-gap-id', gap.id);

    // Build meta + badge row (at top)
    let metaHTML = '';
    let badgeHTML = '';

    if (gap.citationCount && gap.citationCount > 0) {
        const citationText = gap.citationCount + ' citation' + (gap.citationCount > 1 ? 's' : '');
        const enginesText = gap.engines && gap.engines.length > 0 ? gap.engines.join(', ') : 'Multiple sources';
        metaHTML = `<span class="gap-citations">${citationText} • ${enginesText}</span>`;
    }

    if (gap.priorityScore && gap.priorityScore >= 75) {
        badgeHTML = '<div class="gap-badge">HIGH IMPACT</div>';
    }

    // Wrap in flex row if either exists
    let topRowHTML = '';
    if (metaHTML || badgeHTML) {
        topRowHTML = `<div class="gap-top-row">${metaHTML}${badgeHTML}</div>`;
    }

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
            ${topRowHTML}
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
        renderExpandedGapCard,
        createGapCard
    };
}
