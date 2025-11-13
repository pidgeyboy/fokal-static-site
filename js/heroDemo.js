// Hero Demo - Main Controller
// Initializes and controls the interactive gap cards demo

function initHeroDemo() {
    // Render gap cards
    renderGapCards();

    // Initialize modal listeners
    initModalListeners();

    // Track page view
    trackEvent('hero_demo_view', {
        total_gaps: gaps.length
    });

    console.log('Hero demo initialized with', gaps.length, 'gaps');
}

function renderGapCards() {
    const container = document.querySelector('.gap-cards-grid');
    if (!container) {
        console.error('Gap cards container not found');
        return;
    }

    // Clear existing content
    container.innerHTML = '';

    // Add header alert
    const alert = document.createElement('div');
    alert.className = 'demo-alert';
    alert.style.gridColumn = '1 / -1'; // Span all columns
    alert.innerHTML = '<p>⚠️ ' + gaps.length + ' gaps found where competitors appear and you don\'t</p>';
    container.appendChild(alert);

    // Render each gap card
    gaps.forEach(gap => {
        const card = createGapCard(gap);
        container.appendChild(card);
    });
}

function createGapCard(gap) {
    const card = document.createElement('div');
    card.className = 'gap-card';
    card.setAttribute('data-gap-id', gap.id);

    // Build hook HTML
    let hookHTML = `<p class="gap-hook">${gap.hook}</p>`;
    if (gap.hookDetails) {
        hookHTML += `<p class="gap-hook-details">${gap.hookDetails}</p>`;
    }
    if (gap.hookFooter) {
        hookHTML += `<p class="gap-hook-footer">${gap.hookFooter}</p>`;
    }

    // Build metrics HTML
    const metricsHTML = gap.metrics.map(metric =>
        `<span class="${metric.class || ''}">${metric.label}: ${metric.value}</span>`
    ).join('');

    card.innerHTML = `
        <div class="card-content">
            <div class="gap-icon">${gap.icon}</div>
            <div class="gap-badge" style="background: ${gap.badge.color}">${gap.badge.text}</div>
            <h3 class="gap-title">${gap.typeName}</h3>
            ${hookHTML}
            <div class="gap-metrics">
                ${metricsHTML}
            </div>
        </div>
        <div class="card-footer">
            <button class="fix-gap-btn" data-gap-id="${gap.id}">Fix Gap →</button>
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
        renderGapCards,
        createGapCard
    };
}
