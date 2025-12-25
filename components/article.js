/**
 * Article Component
 * Auto-generates TOC, injects author bio, and handles scroll highlighting
 *
 * Usage:
 * 1. Include this script: <script src="/components/article.js"></script>
 * 2. Add a <div id="toc-container"></div> where you want the TOC
 * 3. Add a <div id="author-container"></div> where you want the author bio
 * 4. Add a <div id="related-container"></div> where you want related articles
 * 5. Add a <div id="cta-container"></div> where you want the CTA
 *
 * Configuration (optional):
 * Set window.ARTICLE_CONFIG before loading this script:
 * window.ARTICLE_CONFIG = {
 *     author: { name, title, bio, photo, linkedin, twitter },
 *     related: [{ title, description, url }],
 *     cta: { title, description, buttonText, buttonUrl }
 * };
 */

// Default author info
const DEFAULT_AUTHOR = {
    name: 'Patrick Gallagher',
    title: 'Founder, Fokal',
    bio: 'Patrick researches how AI systems discover, evaluate, and cite brands. He founded Fokal to help brands understand and optimize their visibility in AI search.',
    photo: '/patrick-photo.jpg',
    linkedin: 'https://www.linkedin.com/in/patrick-g-96791070/',
    twitter: 'https://x.com/llmvibes'
};

// Default related articles
const DEFAULT_RELATED = [
    { title: 'AI Search Patents', description: 'What 13 patents reveal about how AI search works', url: '/ai-search-patents' },
    { title: 'How LLMs Cite', description: 'The mechanics of AI citation selection', url: '/llm-citation-selection' },
    { title: 'Conversion Metrics', description: 'Measuring success beyond clicks', url: '/ai-search-conversions' },
    { title: 'All Research', description: 'View all Fokal Insights', url: '/insights' }
];

// Default CTA
const DEFAULT_CTA = {
    title: 'Track Your AI Search Visibility',
    description: 'See where your brand appears across ChatGPT, Perplexity, and Google AI Overviews.',
    buttonText: 'Get Started Free',
    secondaryText: 'Back to Insights',
    secondaryUrl: '/insights'
};

/**
 * Generate TOC from h2 headings
 */
function generateTOC() {
    const tocContainer = document.getElementById('toc-container');
    if (!tocContainer) return;

    const headings = document.querySelectorAll('.article-content h2[id]');
    if (headings.length === 0) return;

    let tocHTML = `
        <div class="toc-card">
            <div class="toc-title">On This Page</div>
            <ul class="toc-list">
    `;

    headings.forEach(heading => {
        const id = heading.getAttribute('id');
        const text = heading.textContent;
        tocHTML += `<li><a href="#${id}">${text}</a></li>`;
    });

    // Add Author section link if author container exists
    if (document.getElementById('author-container')) {
        tocHTML += `<li><a href="#author">About the Author</a></li>`;
    }

    tocHTML += `
            </ul>
        </div>
    `;

    tocContainer.innerHTML = tocHTML;
}

/**
 * Inject author bio section
 */
function injectAuthor() {
    const authorContainer = document.getElementById('author-container');
    if (!authorContainer) return;

    const config = window.ARTICLE_CONFIG?.author || DEFAULT_AUTHOR;

    const authorHTML = `
        <div class="author-section" id="author">
            <img src="${config.photo}" alt="${config.name}" class="author-photo">
            <div class="author-content">
                <span class="author-label">Written by</span>
                <h3>${config.name}</h3>
                <p class="author-title">${config.title}</p>
                <p class="author-bio">${config.bio}</p>
                <div class="author-links">
                    ${config.linkedin ? `
                        <a href="${config.linkedin}" target="_blank">
                            <svg viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
                            LinkedIn
                        </a>
                    ` : ''}
                    ${config.twitter ? `
                        <a href="${config.twitter}" target="_blank">
                            <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                            X
                        </a>
                    ` : ''}
                </div>
            </div>
        </div>
    `;

    authorContainer.innerHTML = authorHTML;
}

/**
 * Inject related articles section
 */
function injectRelated() {
    const relatedContainer = document.getElementById('related-container');
    if (!relatedContainer) return;

    const articles = window.ARTICLE_CONFIG?.related || DEFAULT_RELATED;
    const currentPath = window.location.pathname;

    // Filter out the current page from related articles
    const filteredArticles = articles.filter(article => article.url !== currentPath);

    let relatedHTML = `
        <div class="related-section">
            <h2>Related Research</h2>
            <div class="related-grid">
    `;

    filteredArticles.forEach(article => {
        relatedHTML += `
            <a href="${article.url}" class="related-card">
                <h3>${article.title}</h3>
                <p>${article.description}</p>
            </a>
        `;
    });

    relatedHTML += `
            </div>
        </div>
    `;

    relatedContainer.innerHTML = relatedHTML;
}

/**
 * Inject CTA section
 */
function injectCTA() {
    const ctaContainer = document.getElementById('cta-container');
    if (!ctaContainer) return;

    const config = window.ARTICLE_CONFIG?.cta || DEFAULT_CTA;

    const ctaHTML = `
        <div class="cta-section">
            <h2>${config.title}</h2>
            <p>${config.description}</p>
            <div class="cta-buttons">
                <button class="btn btn-primary" onclick="signInWithGoogle()">${config.buttonText}</button>
                <a href="${config.secondaryUrl}" class="btn btn-secondary">${config.secondaryText}</a>
            </div>
        </div>
    `;

    ctaContainer.innerHTML = ctaHTML;
}

/**
 * Handle TOC scroll highlighting
 */
function initScrollHighlight() {
    document.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.article-content h2[id]');
        const tocLinks = document.querySelectorAll('.toc-list a');

        if (sections.length === 0 || tocLinks.length === 0) return;

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * Smooth scroll for TOC links
 */
function initSmoothScroll() {
    document.addEventListener('click', function(e) {
        const link = e.target.closest('.toc-list a');
        if (!link) return;

        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);

        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            history.pushState(null, null, '#' + targetId);
        }
    });
}

/**
 * Initialize all article components
 */
function initArticleComponents() {
    generateTOC();
    injectAuthor();
    injectRelated();
    injectCTA();
    initScrollHighlight();
    initSmoothScroll();
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initArticleComponents);
