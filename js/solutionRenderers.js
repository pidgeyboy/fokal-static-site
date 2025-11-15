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

                <!-- Journalist Request Card -->
                <div class="primary-action-card">
                    <h3 style="font-size: 15px; font-weight: 500; color: #E5E9F0; margin-bottom: 8px;">📰 Journalist Request</h3>
                    <p style="color: #C6CDD8; line-height: 1.6; margin-bottom: 0; font-size: 14px;">${sol.requestDetails}</p>
                </div>

                <div style="padding: 0 24px;">
                    <h3 style="font-size: 15px; font-weight: 500; color: #E5E9F0; margin-bottom: 12px;">✍️ Your Response</h3>

                    <!-- Response Card - Same format as contact card -->
                    <div class="contact-card-prod" id="pr-response-content">
                        <div style="flex: 1; min-width: 0;">
                            <div style="margin-bottom: 12px;">
                                <span style="font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 600; color: #9DA6B5; text-transform: uppercase; letter-spacing: 0.5px;">Subject</span>
                                <p style="font-family: 'DM Sans', sans-serif; font-size: 14px; color: #E5E9F0; margin-top: 4px; font-weight: 500;">${sol.responseSubject}</p>
                            </div>
                            <div style="border-top: 1px solid rgba(255, 255, 255, 0.06); padding-top: 12px;">
                                <span style="font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 600; color: #9DA6B5; text-transform: uppercase; letter-spacing: 0.5px;">Body</span>
                                <div style="margin-top: 8px; font-family: 'DM Sans', sans-serif; font-size: 12px; line-height: 1.6; color: #C6CDD8;">
                                    ${sol.responseBody.split('\n').map(line => {
                                        if (line.startsWith('•')) {
                                            return `<p style="margin-left: 20px; margin-bottom: 8px;">${line}</p>`;
                                        }
                                        return line ? `<p style="margin-bottom: 8px;">${line}</p>` : '';
                                    }).join('')}
                                </div>
                            </div>
                        </div>
                        <div style="flex-shrink: 0; align-self: flex-start;">
                            <button class="copy-btn" data-copy="pr-response-content" style="padding: 6px 12px; font-size: 13px;">Copy</button>
                        </div>
                    </div>
                </div>

                <!-- Volume Indicator -->
                <div class="volume-indicator">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0;"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>
                    <span>This PR opportunity + <strong>12 live requests</strong> updated daily</span>
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

                <h3 style="font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 500; color: #E5E9F0; margin-bottom: 12px; padding: 0 24px;">Email Template</h3>

                <!-- Email Template Card - Same format as contact card -->
                <div class="contact-card-prod" id="email-template-content" style="margin: 0 24px 24px 24px;">
                    <div style="flex: 1; min-width: 0;">
                        <div style="margin-bottom: 12px;">
                            <span style="font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 600; color: #9DA6B5; text-transform: uppercase; letter-spacing: 0.5px;">Subject</span>
                            <p style="font-family: 'DM Sans', sans-serif; font-size: 14px; color: #E5E9F0; margin-top: 4px; font-weight: 500;">${sol.emailTemplate.subject}</p>
                        </div>
                        <div style="border-top: 1px solid rgba(255, 255, 255, 0.06); padding-top: 12px;">
                            <span style="font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 600; color: #9DA6B5; text-transform: uppercase; letter-spacing: 0.5px;">Body</span>
                            <div style="margin-top: 8px; font-family: 'DM Sans', sans-serif; font-size: 12px; line-height: 1.6; color: #C6CDD8;">
                                ${sol.emailTemplate.body.split('\n').map(line => {
                                    if (line.startsWith('•')) {
                                        return `<p style="margin-left: 20px; margin-bottom: 8px;">${line}</p>`;
                                    }
                                    return line ? `<p style="margin-bottom: 8px;">${line}</p>` : '';
                                }).join('')}
                            </div>
                        </div>
                    </div>
                    <div style="flex-shrink: 0; align-self: flex-start;">
                        <button class="copy-btn" data-copy="email-template-content" style="padding: 6px 12px; font-size: 13px;">Copy</button>
                    </div>
                </div>

                <!-- Volume Indicator -->
                <div class="volume-indicator">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0;"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>
                    <span>This citation gap + <strong>47 more</strong> discovered for Stake</span>
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

                <!-- Quick Steps -->
                <div style="padding: 0 24px 24px;">
                    <h3 style="font-size: 18px; font-weight: 600; color: var(--text-primary); margin-bottom: 16px;">🚀 Quick Setup</h3>
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        ${sol.steps.slice(0, 3).map((step, idx) => `
                            <div style="display: flex; gap: 12px; align-items: start;">
                                <div style="width: 32px; height: 32px; border-radius: 50%; background: rgba(74, 192, 255, 0.1); border: 1px solid rgba(74, 192, 255, 0.3); display: flex; align-items: center; justify-content: center; font-weight: 600; color: var(--accent-blue); flex-shrink: 0;">${idx + 1}</div>
                                <div style="flex: 1;">
                                    <div style="font-weight: 600; color: var(--text-primary); margin-bottom: 4px;">${step.title}</div>
                                    <div style="font-size: 14px; color: var(--text-muted); line-height: 1.5;">${step.description}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Volume Indicator -->
                <div class="volume-indicator">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0;"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>
                    <span>This technical fix + <strong>4 more optimizations</strong> discovered</span>
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

                <!-- Awards Info Card -->
                <div class="primary-action-card">
                    <h3 style="font-size: 15px; font-weight: 500; color: #E5E9F0; margin-bottom: 8px;">🤝 Build Relationship for Future Participation</h3>
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

                    <h3 style="font-size: 15px; font-weight: 500; color: #E5E9F0; margin-top: 20px; margin-bottom: 12px;">✉️ Inquiry Email</h3>

                    <!-- Email Template Card - Same format as contact card -->
                    <div class="contact-card-prod" id="awards-email-content">
                        <div style="flex: 1; min-width: 0;">
                            <div style="margin-bottom: 12px;">
                                <span style="font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 600; color: #9DA6B5; text-transform: uppercase; letter-spacing: 0.5px;">Subject</span>
                                <p style="font-family: 'DM Sans', sans-serif; font-size: 14px; color: #E5E9F0; margin-top: 4px; font-weight: 500;">${sol.emailTemplate.subject}</p>
                            </div>
                            <div style="border-top: 1px solid rgba(255, 255, 255, 0.06); padding-top: 12px;">
                                <span style="font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 600; color: #9DA6B5; text-transform: uppercase; letter-spacing: 0.5px;">Body</span>
                                <div style="margin-top: 8px; font-family: 'DM Sans', sans-serif; font-size: 12px; line-height: 1.6; color: #C6CDD8;">
                                    ${sol.emailTemplate.body.split('\n').map(line => {
                                        if (line.startsWith('•')) {
                                            return `<p style="margin-left: 20px; margin-bottom: 8px;">${line}</p>`;
                                        }
                                        return line ? `<p style="margin-bottom: 8px;">${line}</p>` : '';
                                    }).join('')}
                                </div>
                            </div>
                        </div>
                        <div style="flex-shrink: 0; align-self: flex-start;">
                            <button class="copy-btn" data-copy="awards-email-content" style="padding: 6px 12px; font-size: 13px;">Copy</button>
                        </div>
                    </div>
                </div>

                <!-- Volume Indicator -->
                <div class="volume-indicator">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0;"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>
                    <span>This award + <strong>15 opportunities</strong> tracked with deadlines</span>
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
