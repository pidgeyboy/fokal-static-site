// Solution Renderers - Generate HTML for each solution type

const SolutionRenderers = {
    pr_opportunity: function(gap) {
        const sol = gap.solution;
        return `
            <div class="solution-container">
                <!-- What You'll Get - AT TOP -->
                <div class="what-youll-get">
                    <h3 style="display: flex; align-items: center; gap: 8px;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        <span>What you'll get for this gap</span>
                    </h3>
                    <ul class="deliverables-list">
                        <li>Pre-written response email (subject + personalized pitch)</li>
                        <li>Journalist contact and outlet information</li>
                        <li>Deadline tracking and reminders</li>
                        <li>Expert positioning and key talking points</li>
                    </ul>
                </div>

                <!-- Why This Matters Section -->
                <div class="why-matters-section">
                    <div style="font-weight: 600; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
                        <span style="font-size: 18px;">⚡</span>
                        <span>Why this matters</span>
                    </div>
                    <div class="comparison-grid">
                        <div class="comparison-item without">
                            <div class="comparison-label">Without Fokal</div>
                            <div>Miss time-sensitive PR opportunities with tight deadlines</div>
                        </div>
                        <div class="comparison-item with">
                            <div class="comparison-label">With Fokal</div>
                            <div>Real-time alerts + pre-written responses + journalist contacts</div>
                        </div>
                    </div>
                    <div class="monitoring-badge">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                        We monitor journalist requests 24/7 and alert you before deadlines
                    </div>
                </div>

                <!-- Volume Indicator -->
                <div class="volume-indicator">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0;"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>
                    <span>This PR opportunity + <strong>12 live requests</strong> updated daily</span>
                </div>

                <!-- Bottom CTA -->
                <div class="modal-footer">
                    <button class="primary-btn" onclick="signInWithGoogle()">Start for free →</button>
                    <p style="text-align: center; font-size: 13px; color: var(--text-muted); margin-top: 12px;">See your brand's visibility gaps in 60 seconds</p>
                </div>
            </div>
        `;
    },

    visibility_gap: function(gap) {
        const sol = gap.solution;
        const primaryContact = sol.contacts.find(c => c.primary) || sol.contacts[0];

        return `
            <div class="solution-container">
                <!-- What You'll Get - AT TOP -->
                <div class="what-youll-get">
                    <h3 style="display: flex; align-items: center; gap: 8px;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                        <span>What you'll get for this gap</span>
                    </h3>
                    <ul class="deliverables-list">
                        <li>Pre-written email template (subject + personalized pitch)</li>
                        <li>Contact verification and confidence scoring</li>
                        <li>Pitch angle based on article context</li>
                        <li>Follow-up reminders and tracking</li>
                    </ul>
                </div>

                <!-- Why This Matters Section -->
                <div class="why-matters-section">
                    <div style="font-weight: 600; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
                        <span style="font-size: 18px;">⚡</span>
                        <span>Why this matters</span>
                    </div>
                    <div class="comparison-grid">
                        <div class="comparison-item without">
                            <div class="comparison-label">Without Fokal</div>
                            <div>Manually searching thousands of articles hoping to find missing mentions</div>
                        </div>
                        <div class="comparison-item with">
                            <div class="comparison-label">With Fokal</div>
                            <div>Automated discovery + contact finding + pitch templates</div>
                        </div>
                    </div>
                    <div class="monitoring-badge">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                        We monitor this article daily and alert you to changes
                    </div>
                </div>

                <!-- Volume Indicator -->
                <div class="volume-indicator">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0;"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>
                    <span>This citation gap + <strong>47 more</strong> discovered for Stake</span>
                </div>

                <!-- Bottom CTA -->
                <div class="modal-footer">
                    <button class="primary-btn" onclick="signInWithGoogle()">Start for free →</button>
                    <p style="text-align: center; font-size: 13px; color: var(--text-muted); margin-top: 12px;">See your brand's visibility gaps in 60 seconds</p>
                </div>
            </div>
        `;
    },

    technical_seo: function(gap) {
        const sol = gap.solution;
        return `
            <div class="solution-container">
                <!-- What You'll Get - AT TOP -->
                <div class="what-youll-get">
                    <h3 style="display: flex; align-items: center; gap: 8px;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"></path><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                        <span>What you'll get for this gap</span>
                    </h3>
                    <ul class="deliverables-list">
                        <li>Ready-to-use llms.txt file (copy & paste)</li>
                        <li>Step-by-step implementation guide</li>
                        <li>Verification checklist to ensure proper setup</li>
                        <li>Monitoring tools to track AI engine access</li>
                    </ul>
                </div>

                <!-- Why This Matters Section -->
                <div class="why-matters-section">
                    <div style="font-weight: 600; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
                        <span style="font-size: 18px;">⚡</span>
                        <span>Why this matters</span>
                    </div>
                    <div class="comparison-grid">
                        <div class="comparison-item without">
                            <div class="comparison-label">Without Fokal</div>
                            <div>Miss technical optimizations that improve AI search visibility</div>
                        </div>
                        <div class="comparison-item with">
                            <div class="comparison-label">With Fokal</div>
                            <div>Automated detection + ready-to-use files + implementation guides</div>
                        </div>
                    </div>
                    <div class="monitoring-badge">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                        We track when AI engines access your optimizations
                    </div>
                </div>

                <!-- Volume Indicator -->
                <div class="volume-indicator">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0;"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>
                    <span>This technical fix + <strong>4 more optimizations</strong> discovered</span>
                </div>

                <!-- Bottom CTA -->
                <div class="modal-footer">
                    <button class="primary-btn" onclick="signInWithGoogle()">Start for free →</button>
                    <p style="text-align: center; font-size: 13px; color: var(--text-muted); margin-top: 12px;">See your brand's visibility gaps in 60 seconds</p>
                </div>
            </div>
        `;
    },

    media_pitch: function(gap) {
        const sol = gap.solution;
        const primaryContact = sol.contacts.find(c => c.primary) || sol.contacts[0];

        return `
            <div class="solution-container">
                <!-- What You'll Get - AT TOP -->
                <div class="what-youll-get">
                    <h3 style="display: flex; align-items: center; gap: 8px;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                        <span>What you'll get for this gap</span>
                    </h3>
                    <ul class="deliverables-list">
                        <li>Pre-written inquiry email (subject + personalized pitch)</li>
                        <li>Contact verification and confidence scoring</li>
                        <li>Award eligibility criteria and submission deadlines</li>
                        <li>Relationship-building approach and follow-up strategy</li>
                    </ul>
                </div>

                <!-- Why This Matters Section -->
                <div class="why-matters-section">
                    <div style="font-weight: 600; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
                        <span style="font-size: 18px;">⚡</span>
                        <span>Why this matters</span>
                    </div>
                    <div class="comparison-grid">
                        <div class="comparison-item without">
                            <div class="comparison-label">Without Fokal</div>
                            <div>Miss award deadlines and industry recognition opportunities</div>
                        </div>
                        <div class="comparison-item with">
                            <div class="comparison-label">With Fokal</div>
                            <div>Automated tracking + contact discovery + submission reminders</div>
                        </div>
                    </div>
                    <div class="monitoring-badge">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                        We track award programs year-round and alert you to new opportunities
                    </div>
                </div>

                <!-- Volume Indicator -->
                <div class="volume-indicator">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0;"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>
                    <span>This award + <strong>15 opportunities</strong> tracked with deadlines</span>
                </div>

                <!-- Bottom CTA -->
                <div class="modal-footer">
                    <button class="primary-btn" onclick="signInWithGoogle()">Start for free →</button>
                    <p style="text-align: center; font-size: 13px; color: var(--text-muted); margin-top: 12px;">See your brand's visibility gaps in 60 seconds</p>
                </div>
            </div>
        `;
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SolutionRenderers;
}
