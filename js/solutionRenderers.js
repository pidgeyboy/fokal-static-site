// Solution Renderers - Generate HTML for each solution type

const SolutionRenderers = {
    pr_opportunity: function(gap) {
        const sol = gap.solution;
        return `
            <div class="solution-container pr-opportunity">
                <!-- Journalist Request Card -->
                <div class="journalist-card">
                    <div class="outlet-header">
                        <h3>${sol.outlet}</h3>
                        <div class="deadline-badge urgent">⏰ ${sol.deadline}</div>
                    </div>
                    <h3>${sol.requestTitle}</h3>
                    <p class="request-details">${sol.requestDetails}</p>
                    <div class="request-meta">
                        <span>📰 ${sol.outlet}</span>
                        <span>📅 Deadline: ${sol.deadline}</span>
                        <span>👤 ${sol.journalist}, ${sol.role}</span>
                    </div>
                </div>

                <!-- Pre-Written Response -->
                <div class="response-section">
                    <div class="section-header">
                        <h4>✍️ Pre-Written Response</h4>
                        <button class="copy-btn" data-copy="pr-response">Copy Response</button>
                    </div>
                    <div class="response-preview" id="pr-response">
                        <div class="email-field"><strong>Subject:</strong> ${sol.responseSubject}</div>
                        <div class="email-body">
                            ${sol.responseBody.split('\n').map(line => {
                                if (line.startsWith('•')) {
                                    return `<p style="margin-left: 20px;">${line}</p>`;
                                }
                                return line ? `<p>${line}</p>` : '';
                            }).join('')}
                        </div>
                    </div>
                </div>

                <!-- Why This Matters -->
                <div class="impact-card">
                    <h4>💡 Why This Matters</h4>
                    <ul>
                        ${sol.impactPoints.map(point => `<li>${point}</li>`).join('')}
                    </ul>
                </div>

                <!-- CTA -->
                <div class="solution-cta">
                    <button class="primary-btn" data-gap-type="${gap.type}">Get Started with Snoops →</button>
                </div>
            </div>
        `;
    },

    email_outreach: function(gap) {
        const sol = gap.solution;
        return `
            <div class="solution-container email-outreach">
                <!-- Article Analysis -->
                <div class="article-card">
                    <h3>${sol.articleTitle}</h3>
                    <div class="article-stats">
                        <span>📊 ${sol.citationCount} AI citations</span>
                        <span>🏆 Cited by ${sol.citedBy.join(', ')}</span>
                        <span>📈 Updated: ${sol.lastUpdated}</span>
                    </div>
                    <p class="gap-summary">${sol.gapSummary}</p>
                </div>

                <!-- Contact Cards -->
                <div class="contacts-section">
                    <h4>📧 Verified Contacts</h4>
                    ${sol.contacts.map(contact => `
                        <div class="contact-card ${contact.primary ? 'primary' : ''}">
                            <div class="contact-header">
                                <div class="contact-name">${contact.name}</div>
                                ${contact.verified ? '<div class="verified-badge">✓ Email Verified</div>' : ''}
                            </div>
                            <div class="contact-details">
                                <p>${contact.role}</p>
                                <p>📧 ${contact.email}</p>
                                ${contact.linkedin ? `<p>💼 LinkedIn: ${contact.linkedin}</p>` : ''}
                                <div class="confidence-score">Confidence: ${contact.confidence}%</div>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <!-- Message Templates -->
                <div class="templates-section">
                    <div class="template-card">
                        <div class="template-header">
                            <h4>📧 Email Template</h4>
                            <button class="copy-btn" data-copy="email-template">Copy</button>
                        </div>
                        <div class="template-content" id="email-template">
                            <div class="email-field"><strong>Subject:</strong> ${sol.emailTemplate.subject}</div>
                            <div class="email-body">
                                ${sol.emailTemplate.body.split('\n').map(line => {
                                    if (line.startsWith('•')) {
                                        return `<p style="margin-left: 20px;">${line}</p>`;
                                    }
                                    return line ? `<p>${line}</p>` : '';
                                }).join('')}
                            </div>
                        </div>
                    </div>

                    <div class="template-card">
                        <div class="template-header">
                            <h4>💼 LinkedIn Template</h4>
                            <button class="copy-btn" data-copy="linkedin-template">Copy</button>
                        </div>
                        <div class="template-content" id="linkedin-template">
                            <p>${sol.linkedinTemplate}</p>
                        </div>
                    </div>
                </div>

                <!-- Placement Guidance -->
                <div class="placement-card">
                    <h4>📍 Where to Add</h4>
                    <p><strong>Section:</strong> ${sol.placement.section}</p>
                    <p><strong>Position:</strong> ${sol.placement.position}</p>
                    <div class="placement-preview">
                        <code>${sol.placement.snippet}</code>
                    </div>
                </div>

                <!-- CTA -->
                <div class="solution-cta">
                    <button class="primary-btn" data-gap-type="${gap.type}">Get Started with Snoops →</button>
                </div>
            </div>
        `;
    },

    technical_seo: function(gap) {
        const sol = gap.solution;
        return `
            <div class="solution-container technical-seo">
                <!-- Problem Overview -->
                <div class="problem-overview">
                    <div class="icon-badge">🛠️</div>
                    <h3>${sol.problemTitle}</h3>
                    <p>${sol.problemDescription}</p>
                    <div class="impact-badges">
                        <span class="badge high">🎯 ${sol.impact} Impact</span>
                        <span class="badge quick">⏱️ ${sol.estimatedTime}</span>
                        <span class="badge easy">✅ ${sol.difficulty}</span>
                    </div>
                </div>

                <!-- File Content -->
                <div class="file-section">
                    <div class="file-header">
                        <h4>📄 llms.txt File Content</h4>
                        <button class="copy-btn" data-copy="llms-file">Copy File</button>
                    </div>
                    <div class="code-block" id="llms-file">
                        <pre>${sol.fileContent}</pre>
                    </div>
                </div>

                <!-- Implementation Steps -->
                <div class="steps-section">
                    <h4>🚀 Implementation Steps</h4>
                    <div class="step-list">
                        ${sol.steps.map(step => `
                            <div class="step">
                                <div class="step-number">${step.number}</div>
                                <div class="step-content">
                                    <h5>${step.title}</h5>
                                    <p>${step.description}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- What is llms.txt -->
                <div class="explainer-card">
                    <h4>❓ ${sol.explainer.title}</h4>
                    <p>${sol.explainer.description}</p>
                    <a href="${sol.explainer.learnMoreUrl}" target="_blank" class="learn-more">Learn more about llms.txt →</a>
                </div>

                <!-- CTA -->
                <div class="solution-cta">
                    <button class="primary-btn" data-gap-type="${gap.type}">Get Started with Snoops →</button>
                </div>
            </div>
        `;
    },

    media_pitch: function(gap) {
        const sol = gap.solution;
        return `
            <div class="solution-container media-pitch">
                <!-- Opportunity Overview -->
                <div class="awards-header">
                    <div class="icon-badge">🏆</div>
                    <h3>${sol.awardsName}</h3>
                    <p class="opportunity-type">${sol.opportunityType}</p>
                </div>

                <!-- Awards Context -->
                <div class="awards-context">
                    <h4>About the Awards</h4>
                    <p>${sol.description}</p>
                    <div class="awards-meta">
                        <span>📅 Next awards: ${sol.nextAwardsDate}</span>
                        <span>🏆 ${sol.categories} categories</span>
                        <span>📰 Coverage: ${sol.coverage}</span>
                    </div>
                </div>

                <!-- Guidance -->
                <div class="guidance-section">
                    ${sol.guidanceSteps.map(step => `
                        <div class="guidance-card">
                            <div class="guidance-icon">${step.icon}</div>
                            <div>
                                <h4>${step.title}</h4>
                                <p>${step.description}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <!-- Contacts -->
                <div class="contacts-section">
                    <h4>📧 Key Contacts</h4>
                    ${sol.contacts.map(contact => `
                        <div class="contact-card ${contact.primary ? 'primary' : ''}">
                            <div class="contact-header">
                                <div class="contact-name">${contact.name}</div>
                                ${contact.verified ? '<div class="verified-badge">✓ Email Verified</div>' : ''}
                            </div>
                            <div class="contact-details">
                                <p>${contact.role}</p>
                                <p>📧 ${contact.email}</p>
                                <div class="confidence-score">Confidence: ${contact.confidence}%</div>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <!-- Email Template -->
                <div class="template-section">
                    <div class="template-header">
                        <h4>✉️ Inquiry Email Template</h4>
                        <button class="copy-btn" data-copy="awards-email">Copy Email</button>
                    </div>
                    <div class="template-content" id="awards-email">
                        <div class="email-field"><strong>Subject:</strong> ${sol.emailTemplate.subject}</div>
                        <div class="email-body">
                            ${sol.emailTemplate.body.split('\n').map(line => {
                                if (line.startsWith('•')) {
                                    return `<p style="margin-left: 20px;">${line}</p>`;
                                }
                                return line ? `<p>${line}</p>` : '';
                            }).join('')}
                        </div>
                    </div>
                </div>

                <!-- Action Plan -->
                <div class="action-plan">
                    <h4>📋 Action Plan</h4>
                    <div class="plan-steps">
                        ${sol.actionPlan.map((step, index) => `
                            <div class="plan-step">
                                <span class="step-icon">${index + 1}️⃣</span>
                                <p>${step}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- CTA -->
                <div class="solution-cta">
                    <button class="primary-btn" data-gap-type="${gap.type}">Get Started with Snoops →</button>
                </div>
            </div>
        `;
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SolutionRenderers;
}
