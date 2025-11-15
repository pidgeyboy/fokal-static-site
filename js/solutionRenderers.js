// Solution Renderers - Generate HTML for each solution type

const SolutionRenderers = {
    pr_opportunity: function(gap) {
        const sol = gap.solution;
        return `
            <div class="solution-container">
                <!-- Demo Context Banner -->
                <div class="demo-context-banner">
                    <div style="font-size: 20px; margin-bottom: 8px;">💡</div>
                    <div>
                        <div style="font-weight: 600; margin-bottom: 4px;">DEMO: This is what Fokal found for Stake</div>
                        <div style="opacity: 0.8;">When you connect YOUR brand, we'll find gaps like this for you—automatically</div>
                    </div>
                </div>

                <!-- Why This Matters Section - MOVED UP -->
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

                <!-- Journalist Request Card -->
                <div class="primary-action-card">
                    <h3 style="font-size: 15px; font-weight: 500; color: #E5E9F0; margin-bottom: 8px;">📰 Journalist Request</h3>
                    <p style="color: #C6CDD8; line-height: 1.6; margin-bottom: 0; font-size: 14px;">${sol.requestDetails}</p>
                </div>

                <!-- What You'll Get - REPLACES full response -->
                <div class="what-youll-get">
                    <h3 style="font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 500; color: #E5E9F0; margin-bottom: 14px; display: flex; align-items: center; gap: 8px;">
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
                <!-- Demo Context Banner -->
                <div class="demo-context-banner">
                    <div style="font-size: 20px; margin-bottom: 8px;">💡</div>
                    <div>
                        <div style="font-weight: 600; margin-bottom: 4px;">DEMO: This is what Fokal found for Stake</div>
                        <div style="opacity: 0.8;">When you connect YOUR brand, we'll find gaps like this for you—automatically</div>
                    </div>
                </div>

                <!-- Why This Matters Section - MOVED UP -->
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

                <h3 style="font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 500; color: #E5E9F0; margin-bottom: 12px; padding: 0 24px;">Discovered Contact</h3>

                <!-- Contact Card - Production Layout -->
                <div class="contact-card-prod" style="margin: 0 24px 20px 24px;">
                    <div style="flex: 1; min-width: 0;">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9DA6B5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0;"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            <span style="font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; color: #E5E9F0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${primaryContact.name}</span>
                            ${primaryContact.verified ? '<div style="width: 12px; height: 12px; border-radius: 50%; background: #00E676; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"><svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></div>' : ''}
                        </div>
                        <div style="margin-left: 20px; margin-top: 4px;">
                            <p style="font-family: 'DM Sans', sans-serif; font-size: 12px; color: #9DA6B5; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${primaryContact.role}</p>
                            <p style="font-family: monospace; font-size: 12px; color: #8A93A1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin-top: 2px;">${primaryContact.email}</p>
                        </div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px; flex-shrink: 0;">
                        <div style="font-family: 'DM Sans', sans-serif; font-size: 12px; padding: 4px 8px; border-radius: 6px; background: rgba(74, 192, 255, 0.12); color: #4AC0FF; border: 1px solid rgba(74, 192, 255, 0.2);">
                            ${Math.round(primaryContact.confidence)}%
                        </div>
                    </div>
                </div>

                <!-- What You'll Get - REPLACES full email template -->
                <div class="what-youll-get">
                    <h3 style="font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 500; color: #E5E9F0; margin-bottom: 14px; display: flex; align-items: center; gap: 8px;">
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
                <!-- Demo Context Banner -->
                <div class="demo-context-banner">
                    <div style="font-size: 20px; margin-bottom: 8px;">💡</div>
                    <div>
                        <div style="font-weight: 600; margin-bottom: 4px;">DEMO: This is what Fokal found for Stake</div>
                        <div style="opacity: 0.8;">When you connect YOUR brand, we'll find gaps like this for you—automatically</div>
                    </div>
                </div>

                <!-- Why This Matters Section - MOVED UP -->
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

                <!-- File Content Card -->
                <div class="primary-action-card">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                        <h3>📄 llms.txt File</h3>
                        <button class="copy-btn" data-copy="llms-file-content">Copy File</button>
                    </div>
                    <div id="llms-file-content" style="background: rgba(0,0,0,0.2); border: 1px solid rgba(255, 255, 255, 0.08); padding: 16px; border-radius: 8px; overflow-x: auto;">
                        <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 13px; line-height: 1.6; color: #E5E9F0;">${sol.fileContent}</pre>
                    </div>
                </div>

                <!-- What You'll Get -->
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
                <!-- Demo Context Banner -->
                <div class="demo-context-banner">
                    <div style="font-size: 20px; margin-bottom: 8px;">💡</div>
                    <div>
                        <div style="font-weight: 600; margin-bottom: 4px;">DEMO: This is what Fokal found for Stake</div>
                        <div style="opacity: 0.8;">When you connect YOUR brand, we'll find gaps like this for you—automatically</div>
                    </div>
                </div>

                <!-- Why This Matters Section - MOVED UP -->
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

                <!-- Awards Opportunity Card -->
                <div class="primary-action-card">
                    <h3 style="font-size: 15px; font-weight: 500; color: #E5E9F0; margin-bottom: 8px;">🏆 Awards Opportunity</h3>
                    <p style="color: #C6CDD8; line-height: 1.6; margin-bottom: 12px; font-size: 14px;">${sol.description}</p>

                    <h4 style="font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 500; color: #E5E9F0; margin-bottom: 8px;">Key Contact</h4>

                    <!-- Contact Card - Production Layout -->
                    <div class="contact-card-prod">
                        <div style="flex: 1; min-width: 0;">
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9DA6B5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0;"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                <span style="font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; color: #E5E9F0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${primaryContact.name}</span>
                                ${primaryContact.verified ? '<div style="width: 12px; height: 12px; border-radius: 50%; background: #00E676; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"><svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></div>' : ''}
                            </div>
                            <div style="margin-left: 20px; margin-top: 4px;">
                                <p style="font-family: 'DM Sans', sans-serif; font-size: 12px; color: #9DA6B5; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${primaryContact.role}</p>
                                <p style="font-family: monospace; font-size: 12px; color: #8A93A1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin-top: 2px;">${primaryContact.email}</p>
                            </div>
                        </div>
                        <div style="display: flex; align-items: center; gap: 8px; flex-shrink: 0;">
                            <div style="font-family: 'DM Sans', sans-serif; font-size: 12px; padding: 4px 8px; border-radius: 6px; background: rgba(74, 192, 255, 0.12); color: #4AC0FF; border: 1px solid rgba(74, 192, 255, 0.2);">
                                ${Math.round(primaryContact.confidence)}%
                            </div>
                        </div>
                    </div>
                </div>

                <!-- What You'll Get -->
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
