// Solution Renderers - Generate HTML for each solution type

const SolutionRenderers = {
    pr_opportunity: function(gap) {
        const sol = gap.solution;
        return `
            <div class="solution-container">
                <!-- Hero Section -->
                <div class="solution-hero">
                    <div class="solution-badge">⏰ Deadline: ${sol.deadline}</div>
                    <h2>${sol.requestTitle}</h2>
                    <p class="solution-subtitle">${sol.outlet} • ${sol.journalist}</p>
                </div>

                <!-- Journalist Request Card -->
                <div class="primary-action-card">
                    <h3>📰 Journalist Request</h3>
                    <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 16px;">${sol.requestDetails}</p>
                    <button class="expand-btn" onclick="toggleSection('pr-response-section')">
                        View Pre-Written Response →
                    </button>
                </div>

                <!-- Collapsible Response -->
                <div id="pr-response-section" class="collapsible-section">
                    <div class="template-card" style="margin: 20px 0;">
                        <div class="template-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                            <h4 style="margin: 0;">✍️ Your Response</h4>
                            <button class="copy-btn" data-copy="pr-response-content">Copy Response</button>
                        </div>
                        <div class="template-content" id="pr-response-content" style="background: rgba(255,255,255,0.03); padding: 16px; border-radius: 8px;">
                            <div style="margin-bottom: 12px;"><strong>Subject:</strong> ${sol.responseSubject}</div>
                            <div class="email-body">
                                ${sol.responseBody.split('\n').map(line => {
                                    if (line.startsWith('•')) {
                                        return `<p style="margin-left: 20px; margin-bottom: 8px;">${line}</p>`;
                                    }
                                    return line ? `<p style="margin-bottom: 8px;">${line}</p>` : '';
                                }).join('')}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Bottom CTA -->
                <div class="modal-footer">
                    <button class="primary-btn" data-gap-type="${gap.type}">Get Full Solution →</button>
                </div>
            </div>
        `;
    },

    visibility_gap: function(gap) {
        const sol = gap.solution;
        const primaryContact = sol.contacts.find(c => c.primary) || sol.contacts[0];

        return `
            <div class="solution-container">
                <!-- Hero Section -->
                <div class="solution-hero">
                    <div class="solution-badge">${sol.citationCount} AI citations</div>
                    <h2>${sol.articleTitle}</h2>
                    <p class="solution-subtitle">${sol.domain}</p>
                </div>

                <!-- Primary Action Card -->
                <div class="primary-action-card">
                    <h3>📧 Reach Out to Decision Maker</h3>
                    <div class="contact-highlight">
                        <div class="contact-avatar">${primaryContact.firstName.charAt(0)}</div>
                        <div>
                            <div class="contact-name">${primaryContact.name}</div>
                            <div class="contact-role">${primaryContact.role}</div>
                        </div>
                    </div>
                    <button class="expand-btn" onclick="toggleSection('email-template-section')">
                        View Email Template →
                    </button>
                </div>

                <!-- Collapsible Email Template -->
                <div id="email-template-section" class="collapsible-section">
                    <div class="template-card" style="margin: 20px 0;">
                        <div class="template-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                            <h4 style="margin: 0;">Email Template</h4>
                            <button class="copy-btn" data-copy="email-template-content">Copy</button>
                        </div>
                        <div class="template-content" id="email-template-content" style="background: rgba(255,255,255,0.03); padding: 16px; border-radius: 8px;">
                            <div style="margin-bottom: 12px;"><strong>Subject:</strong> ${sol.emailTemplate.subject}</div>
                            <div class="email-body">
                                ${sol.emailTemplate.body.split('\n').map(line => {
                                    if (line.startsWith('•')) {
                                        return `<p style="margin-left: 20px; margin-bottom: 8px;">${line}</p>`;
                                    }
                                    return line ? `<p style="margin-bottom: 8px;">${line}</p>` : '';
                                }).join('')}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Bottom CTA -->
                <div class="modal-footer">
                    <button class="primary-btn" data-gap-type="${gap.type}">Get Full Solution →</button>
                </div>
            </div>
        `;
    },

    technical_seo: function(gap) {
        const sol = gap.solution;
        return `
            <div class="solution-container">
                <!-- Hero Section -->
                <div class="solution-hero">
                    <div class="solution-badge">⏱️ ${sol.estimatedTime} • ${sol.difficulty}</div>
                    <h2>${sol.problemTitle}</h2>
                    <p class="solution-subtitle">${sol.impact} impact on AI visibility</p>
                </div>

                <!-- File Content Card -->
                <div class="primary-action-card">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                        <h3>📄 llms.txt File</h3>
                        <button class="copy-btn" data-copy="llms-file-content">Copy File</button>
                    </div>
                    <div id="llms-file-content" style="background: rgba(0,0,0,0.4); padding: 16px; border-radius: 8px; overflow-x: auto;">
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

                <!-- Bottom CTA -->
                <div class="modal-footer">
                    <button class="primary-btn" data-gap-type="${gap.type}">Get Full Solution →</button>
                </div>
            </div>
        `;
    },

    media_pitch: function(gap) {
        const sol = gap.solution;
        const primaryContact = sol.contacts.find(c => c.primary) || sol.contacts[0];

        return `
            <div class="solution-container">
                <!-- Hero Section -->
                <div class="solution-hero">
                    <div class="solution-badge">🏆 ${sol.nextAwardsDate}</div>
                    <h2>${sol.awardsName}</h2>
                    <p class="solution-subtitle">${sol.organizationName}</p>
                </div>

                <!-- Awards Info Card -->
                <div class="primary-action-card">
                    <h3>🤝 Build Relationship for Future Participation</h3>
                    <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 16px;">${sol.description}</p>
                    <div class="contact-highlight">
                        <div class="contact-avatar">${primaryContact.firstName.charAt(0)}</div>
                        <div>
                            <div class="contact-name">${primaryContact.name}</div>
                            <div class="contact-role">${primaryContact.role}</div>
                        </div>
                    </div>
                    <button class="expand-btn" onclick="toggleSection('awards-email-section')">
                        View Inquiry Email →
                    </button>
                </div>

                <!-- Collapsible Email Template -->
                <div id="awards-email-section" class="collapsible-section">
                    <div class="template-card" style="margin: 20px 0;">
                        <div class="template-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                            <h4 style="margin: 0;">✉️ Inquiry Email</h4>
                            <button class="copy-btn" data-copy="awards-email-content">Copy Email</button>
                        </div>
                        <div class="template-content" id="awards-email-content" style="background: rgba(255,255,255,0.03); padding: 16px; border-radius: 8px;">
                            <div style="margin-bottom: 12px;"><strong>Subject:</strong> ${sol.emailTemplate.subject}</div>
                            <div class="email-body">
                                ${sol.emailTemplate.body.split('\n').map(line => {
                                    if (line.startsWith('•')) {
                                        return `<p style="margin-left: 20px; margin-bottom: 8px;">${line}</p>`;
                                    }
                                    return line ? `<p style="margin-bottom: 8px;">${line}</p>` : '';
                                }).join('')}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Bottom CTA -->
                <div class="modal-footer">
                    <button class="primary-btn" data-gap-type="${gap.type}">Get Full Solution →</button>
                </div>
            </div>
        `;
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SolutionRenderers;
}
