// Minimal Solution Renderers for Demo

const SolutionRenderers = {
    visibility_gap: function(gap) {
        const sol = gap.solution;
        return `
            <div class="demo-content">
                <button class="close-modal" aria-label="Close">&times;</button>
                <h2>How we'd fix this gap</h2>

                <div class="gap-description">
                    <p class="problem-statement"><strong>${sol.citationCount}+ AI citations</strong> — zero mention your brand</p>
                    <p class="solution-intro">What you'd get (ready to use):</p>
                </div>

                <div class="solution-steps">
                    <div class="step">
                        <div class="step-number">✓</div>
                        <div class="step-content">
                            <div class="step-title">Verified editor contact</div>
                            <div class="step-description">Real email + LinkedIn for the decision-maker</div>
                        </div>
                    </div>

                    <div class="step">
                        <div class="step-number">✓</div>
                        <div class="step-content">
                            <div class="step-title">Pre-written pitch email</div>
                            <div class="step-description">Custom template for your brand + this specific editor</div>
                        </div>
                    </div>

                    <div class="step">
                        <div class="step-number">✓</div>
                        <div class="step-content">
                            <div class="step-title">Citation tracking alert</div>
                            <div class="step-description">Get notified when you're mentioned</div>
                        </div>
                    </div>
                </div>

                <button class="cta-primary" onclick="window.location.href='/?showAuth=true'">Find Your Gaps →</button>

                <p class="footer-note">Real example. Real fix. See what gaps we find for YOUR brand.</p>
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
                    <p class="solution-intro">We found the right contact and created the right pitch.</p>
                </div>

                <div class="solution-steps">
                    <h3>What you'd get:</h3>

                    <div class="step">
                        <div class="step-number">1.</div>
                        <div class="step-content">
                            <div class="step-title">Who to email</div>
                            <div class="step-description">Verified journalist email + LinkedIn (in this case: TechCrunch)</div>
                        </div>
                    </div>

                    <div class="step">
                        <div class="step-number">2.</div>
                        <div class="step-content">
                            <div class="step-title">What to send</div>
                            <div class="step-description">Pre-written response email (customized for your brand and recipient)</div>
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

                <button class="cta-primary" onclick="window.location.href='/?showAuth=true'">Find Your Gaps →</button>

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
                    <p class="solution-intro">We found the right contact and created the right pitch.</p>
                </div>

                <div class="solution-steps">
                    <h3>What you'd get:</h3>

                    <div class="step">
                        <div class="step-number">1.</div>
                        <div class="step-content">
                            <div class="step-title">What you get</div>
                            <div class="step-description">Ready-to-use llms.txt (customized for your brand)</div>
                        </div>
                    </div>

                    <div class="step">
                        <div class="step-number">2.</div>
                        <div class="step-content">
                            <div class="step-title">How to install</div>
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

                <button class="cta-primary" onclick="window.location.href='/?showAuth=true'">Find Your Gaps →</button>

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
                    <p class="solution-intro">We found the right contact and created the right pitch.</p>
                </div>

                <div class="solution-steps">
                    <h3>What you'd get:</h3>

                    <div class="step">
                        <div class="step-number">1.</div>
                        <div class="step-content">
                            <div class="step-title">Who to email</div>
                            <div class="step-description">Verified awards coordinator email + LinkedIn (in this case: Finder)</div>
                        </div>
                    </div>

                    <div class="step">
                        <div class="step-number">2.</div>
                        <div class="step-content">
                            <div class="step-title">What to send</div>
                            <div class="step-description">Pre-written inquiry email (customized for your brand and recipient)</div>
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

                <button class="cta-primary" onclick="window.location.href='/?showAuth=true'">Find Your Gaps →</button>

                <p class="footer-note">This is an example. Get real solutions for YOUR brand.</p>
            </div>
        `;
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SolutionRenderers;
}
