// Minimal Solution Renderers for Demo

const SolutionRenderers = {
    visibility_gap: function(gap) {
        const sol = gap.solution;
        return `
            <div class="demo-content">
                <button class="close-modal" aria-label="Close">&times;</button>
                <h2>Visibility Gap</h2>

                <div class="gap-context">
                    <p>ChatGPT cites ${sol.domain} ${sol.citationCount}+ times</p>
                    <p class="problem">Stake isn't mentioned</p>
                </div>

                <div class="solution-items">
                    <h3>You'd get:</h3>
                    <div class="item">→ Contact info</div>
                    <div class="item">→ Email template</div>
                    <div class="item">→ Tracking</div>
                </div>

                <button class="cta-primary" onclick="window.location.href='/?showAuth=true'">Start Free - See Your Gaps →</button>

                <p class="footer-note">
                    We find the gaps, contacts, and write the pitches.<br>
                    <span class="coming-soon">Coming soon: We send them for you</span>
                </p>
            </div>
        `;
    },

    pr_opportunity: function(gap) {
        return `
            <div class="demo-content">
                <button class="close-modal" aria-label="Close">&times;</button>
                <h2>PR Opportunity</h2>

                <div class="gap-context">
                    <p>TechCrunch reporter needs fintech experts</p>
                    <p class="problem">48-hour deadline</p>
                </div>

                <div class="solution-items">
                    <h3>You'd get:</h3>
                    <div class="item">→ Journalist details</div>
                    <div class="item">→ Response template</div>
                    <div class="item">→ Follow-up tracking</div>
                </div>

                <button class="cta-primary" onclick="window.location.href='/?showAuth=true'">Start Free - See Your Gaps →</button>

                <p class="footer-note">
                    We find the gaps, contacts, and write the pitches.<br>
                    <span class="coming-soon">Coming soon: We send them for you</span>
                </p>
            </div>
        `;
    },

    technical_seo: function(gap) {
        return `
            <div class="demo-content">
                <button class="close-modal" aria-label="Close">&times;</button>
                <h2>Technical SEO Gap</h2>

                <div class="gap-context">
                    <p>Your site is missing llms.txt</p>
                    <p class="problem">AI engines can't index properly</p>
                </div>

                <div class="solution-items">
                    <h3>You'd get:</h3>
                    <div class="item">→ Ready-to-use file</div>
                    <div class="item">→ Installation guide</div>
                    <div class="item">→ Verification check</div>
                </div>

                <button class="cta-primary" onclick="window.location.href='/?showAuth=true'">Start Free - See Your Gaps →</button>

                <p class="footer-note">
                    We find the gaps, contacts, and write the pitches.<br>
                    <span class="coming-soon">Coming soon: We send them for you</span>
                </p>
            </div>
        `;
    },

    media_pitch: function(gap) {
        return `
            <div class="demo-content">
                <button class="close-modal" aria-label="Close">&times;</button>
                <h2>Awards Opportunity</h2>

                <div class="gap-context">
                    <p>Finder Investment Awards 2026</p>
                    <p class="problem">Your competitors won in 2025</p>
                </div>

                <div class="solution-items">
                    <h3>You'd get:</h3>
                    <div class="item">→ Awards contact</div>
                    <div class="item">→ Inquiry email</div>
                    <div class="item">→ Application timeline</div>
                </div>

                <button class="cta-primary" onclick="window.location.href='/?showAuth=true'">Start Free - See Your Gaps →</button>

                <p class="footer-note">
                    We find the gaps, contacts, and write the pitches.<br>
                    <span class="coming-soon">Coming soon: We send them for you</span>
                </p>
            </div>
        `;
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SolutionRenderers;
}
