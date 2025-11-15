// Minimal Solution Renderers for Demo

const SolutionRenderers = {
    visibility_gap: function(gap) {
        const sol = gap.solution;
        return `
            <div class="demo-content">
                <button class="close-modal" aria-label="Close">&times;</button>
                <h2>Visibility Gap Solution</h2>

                <div class="gap-description">
                    <p class="label">The gap you clicked:</p>
                    <p class="quote">"Stake missing from ${sol.domain} (${sol.citationCount}+ AI citations)"</p>
                </div>

                <div class="solution-steps">
                    <h3>What you'd get:</h3>

                    <div class="step">
                        <div class="step-number">1.</div>
                        <div class="step-content">
                            <div class="step-title">The contact</div>
                            <div class="step-description">Verified editor email + LinkedIn (in this case: ${sol.domain})</div>
                        </div>
                    </div>

                    <div class="step">
                        <div class="step-number">2.</div>
                        <div class="step-content">
                            <div class="step-title">The pitch</div>
                            <div class="step-description">Pre-written outreach email (customized for your brand)</div>
                        </div>
                    </div>

                    <div class="step">
                        <div class="step-number">3.</div>
                        <div class="step-content">
                            <div class="step-title">The tracking</div>
                            <div class="step-description">Alert when you get mentioned in the article</div>
                        </div>
                    </div>
                </div>

                <button class="cta-primary" onclick="window.location.href='/?showAuth=true'">Start Free - Find Your Gaps →</button>

                <p class="footer-note">This is an example. Get real solutions for YOUR brand.</p>
            </div>
        `;
    },

    pr_opportunity: function(gap) {
        return `
            <div class="demo-content">
                <button class="close-modal" aria-label="Close">&times;</button>
                <h2>PR Gap Solution</h2>

                <div class="gap-description">
                    <p class="label">The gap you clicked:</p>
                    <p class="quote">"TechCrunch reporter needs fintech experts (48-hour deadline)"</p>
                </div>

                <div class="solution-steps">
                    <h3>What you'd get:</h3>

                    <div class="step">
                        <div class="step-number">1.</div>
                        <div class="step-content">
                            <div class="step-title">The contact</div>
                            <div class="step-description">Verified journalist email + LinkedIn (in this case: TechCrunch)</div>
                        </div>
                    </div>

                    <div class="step">
                        <div class="step-number">2.</div>
                        <div class="step-content">
                            <div class="step-title">The pitch</div>
                            <div class="step-description">Pre-written response email (customized for your brand)</div>
                        </div>
                    </div>

                    <div class="step">
                        <div class="step-number">3.</div>
                        <div class="step-content">
                            <div class="step-title">The tracking</div>
                            <div class="step-description">Deadline alerts + follow-up reminders</div>
                        </div>
                    </div>
                </div>

                <button class="cta-primary" onclick="window.location.href='/?showAuth=true'">Start Free - Find Your Gaps →</button>

                <p class="footer-note">This is an example. Get real solutions for YOUR brand.</p>
            </div>
        `;
    },

    technical_seo: function(gap) {
        return `
            <div class="demo-content">
                <button class="close-modal" aria-label="Close">&times;</button>
                <h2>Technical SEO Gap Solution</h2>

                <div class="gap-description">
                    <p class="label">The gap you clicked:</p>
                    <p class="quote">"Missing llms.txt file (AI engines can't index properly)"</p>
                </div>

                <div class="solution-steps">
                    <h3>What you'd get:</h3>

                    <div class="step">
                        <div class="step-number">1.</div>
                        <div class="step-content">
                            <div class="step-title">The file</div>
                            <div class="step-description">Ready-to-use llms.txt (customized for your brand)</div>
                        </div>
                    </div>

                    <div class="step">
                        <div class="step-number">2.</div>
                        <div class="step-content">
                            <div class="step-title">The guide</div>
                            <div class="step-description">Step-by-step installation instructions</div>
                        </div>
                    </div>

                    <div class="step">
                        <div class="step-number">3.</div>
                        <div class="step-content">
                            <div class="step-title">The tracking</div>
                            <div class="step-description">Monitor when AI engines access your file</div>
                        </div>
                    </div>
                </div>

                <button class="cta-primary" onclick="window.location.href='/?showAuth=true'">Start Free - Find Your Gaps →</button>

                <p class="footer-note">This is an example. Get real solutions for YOUR brand.</p>
            </div>
        `;
    },

    media_pitch: function(gap) {
        return `
            <div class="demo-content">
                <button class="close-modal" aria-label="Close">&times;</button>
                <h2>Awards Gap Solution</h2>

                <div class="gap-description">
                    <p class="label">The gap you clicked:</p>
                    <p class="quote">"Finder Investment Awards 2026 (your competitors won in 2025)"</p>
                </div>

                <div class="solution-steps">
                    <h3>What you'd get:</h3>

                    <div class="step">
                        <div class="step-number">1.</div>
                        <div class="step-content">
                            <div class="step-title">The contact</div>
                            <div class="step-description">Verified awards coordinator email + LinkedIn (in this case: Finder)</div>
                        </div>
                    </div>

                    <div class="step">
                        <div class="step-number">2.</div>
                        <div class="step-content">
                            <div class="step-title">The pitch</div>
                            <div class="step-description">Pre-written inquiry email (customized for your brand)</div>
                        </div>
                    </div>

                    <div class="step">
                        <div class="step-number">3.</div>
                        <div class="step-content">
                            <div class="step-title">The tracking</div>
                            <div class="step-description">Application deadlines and submission timeline</div>
                        </div>
                    </div>
                </div>

                <button class="cta-primary" onclick="window.location.href='/?showAuth=true'">Start Free - Find Your Gaps →</button>

                <p class="footer-note">This is an example. Get real solutions for YOUR brand.</p>
            </div>
        `;
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SolutionRenderers;
}
