// Gap Data for Interactive Hero Demo
// 4 hardcoded gaps from Brand ID 1 (Stake) with complete solutions

const gaps = [
    {
        id: 1,
        type: 'pr_opportunity',
        typeName: 'PR gap',
        priority: 'HIGH',
        priorityScore: 90,
        citationCount: 0,
        engines: [],
        hook: `Real-time journalist request with 48-hour deadline
TechCrunch reporter needs fintech experts: "Looking for founders who can speak to democratizing stock market access"
Your competitors are already responding—this becomes permanent AI citations.`,
        solution: {
            outlet: 'TechCrunch',
            outletLogo: 'techcrunch', // Will be used to construct path
            journalist: 'Sarah Chen',
            role: 'Senior Reporter',
            deadline: 'Dec 18, 2024',
            requestTitle: 'Looking for fintech founders on democratizing investing',
            requestDetails: "I'm writing an article about how fintech platforms are making stock market investing accessible to everyday people. Looking for founders who can speak to barriers they've removed, user success stories, and the regulatory challenges of democratizing finance.",
            responseSubject: 'RE: Expert source for democratizing investing article',
            responseBody: `Hi Sarah,

I'd be happy to contribute to your article on democratizing stock market access.

At Stake, we've helped over 500,000 investors access global markets with zero account fees and $3 flat brokerage. Here are a few insights that might be relevant:

• **Barrier removal:** 73% of our users are first-time investors who were previously priced out by traditional brokers charging $20+ per trade

• **Market access:** We enable Australians to invest in 9,500+ US stocks—previously inaccessible without expensive international accounts

• **Education focus:** Our platform includes real-time educational content that turns novices into confident investors within 30 days

I can provide specific user success stories, data on investment behavior shifts, and quotes on regulatory challenges we've navigated.

Available for a call this week if helpful.

Best,
[Your Name]
CEO, Stake`,
            impactPoints: [
                'Journalists cite expert sources in articles that get indexed by AI engines for years',
                'Your quote becomes part of the article\'s permanent citation record',
                'One response can generate AI visibility for 3-5 years'
            ]
        }
    },
    {
        id: 2,
        type: 'visibility_gap',
        typeName: 'Visibility gap',
        priority: 'HIGH',
        priorityScore: 85,
        citationCount: 400,
        engines: ['Perplexity', 'ChatGPT'],
        hook: `When people ask ChatGPT:
"Best investment platforms for new investors in Australia?"
Result: Stake doesn't appear
Competitors mentioned: CommSec, Sharesies, Superhero (+5 more)
ChatGPT uses Stockbrokers.com's "6..." as a source
This article has 400+ citations—and zero mentions of Stake.`,
        solution: {
            articleTitle: '6 Best Trading Platforms in Australia for 2025',
            domain: 'StockBrokers.com',
            domainLogo: 'stockbrokers',
            articleUrl: 'https://www.stockbrokers.com/guides/best-trading-platforms-australia',
            citationCount: 400,
            citedBy: ['Forbes', 'ChatGPT', 'Perplexity'],
            lastUpdated: 'Nov 2024',
            gapSummary: 'This comparison includes CommSec, Superhero, Tiger Brokers, and 3 others—but never mentions Stake despite your competitive pricing and feature set.',
            contacts: [
                {
                    name: 'Sarah Mitchell',
                    firstName: 'Sarah',
                    role: 'Senior Editor, StockBrokers.com',
                    email: 'sarah.mitchell@stockbrokers.com',
                    linkedin: '/in/sarahmitchell',
                    verified: true,
                    confidence: 95,
                    primary: true
                },
                {
                    name: 'Content Team',
                    firstName: 'Team',
                    role: 'Editorial',
                    email: 'content@stockbrokers.com',
                    verified: false,
                    confidence: 80,
                    primary: false
                }
            ],
            emailTemplate: {
                subject: 'Australian platform missing from your comparison',
                body: `Hi Sarah,

I noticed your "Best Trading Platforms in Australia" guide includes great options like CommSec and Superhero.

Stake might be worth adding—we're serving 500,000+ investors with $3 flat brokerage on both ASX and US markets. We've also won Finder's "Best for SMSF" award two years running.

Would you be open to reviewing Stake for your next update?

Happy to provide:
• Platform access for testing
• Feature comparison data
• User testimonials

Thanks,
[Your Name]`
            },
            linkedinTemplate: `Hi Sarah, loved your StockBrokers.com comparison. Stake (500K+ users, $3 flat brokerage) might fit well alongside Superhero and CommSec. Open to a quick review for your next update?`,
            placement: {
                section: '"Top 6 Australian Brokers" comparison table',
                position: 'After Superhero row (similar pricing model)',
                snippet: '... | Superhero | $2 | ASX only |\n+ | Stake | $3 | ASX + US |\n... | CommSec | $20 | ASX + US |'
            }
        }
    },
    {
        id: 3,
        type: 'technical_seo',
        typeName: 'Technical SEO gap',
        priority: 'MEDIUM',
        priorityScore: 65,
        citationCount: 0,
        engines: [],
        hook: `Quick technical fix to improve AI visibility
Your site is missing llms.txt—the file ChatGPT, Perplexity, and Claude use to understand your site structure
5-minute fix, high impact on AI search results`,
        solution: {
            problemTitle: 'Missing llms.txt File',
            problemDescription: 'Your site is missing llms.txt—an emerging standard that helps AI engines like ChatGPT, Perplexity, and Claude understand your site structure.',
            difficulty: 'Easy',
            estimatedTime: '5 minutes',
            impact: 'High',
            fileContent: `# Stake - Australian Investment Platform

> Stake is an online platform enabling Australians to invest in ASX and US markets with $3 flat brokerage. Over 500,000 investors trust Stake for commission-free global market access.

## About
/about: Company history, founders, mission

## Products
/invest/asx: Australian share trading
/invest/us: US stock market access
/smsf: Self-managed super fund solutions

## Resources
/learn: Investment education hub
/pricing: Fee structure and comparison
/blog: Market insights and guides`,
            steps: [
                {
                    number: 1,
                    title: 'Copy the llms.txt file content above',
                    description: 'Use the "Copy File" button to copy to clipboard'
                },
                {
                    number: 2,
                    title: 'Save it as llms.txt',
                    description: 'Create a new file named exactly "llms.txt" (no other extension)'
                },
                {
                    number: 3,
                    title: 'Upload to your site root',
                    description: 'Place file at https://hellostake.com/llms.txt'
                },
                {
                    number: 4,
                    title: 'Verify it\'s accessible',
                    description: 'Visit the URL to confirm it loads correctly'
                },
                {
                    number: 5,
                    title: 'Monitor AI engine logs',
                    description: 'Watch for crawl activity from AI bots (optional)'
                }
            ],
            explainer: {
                title: 'What is llms.txt?',
                description: 'An experimental standard from fast.ai that helps AI engines understand your site structure. While not widely adopted yet, early adopters like FastHTML and Answer.AI are seeing better AI comprehension of their content.',
                learnMoreUrl: 'https://llmstxt.org'
            },
            testUrl: 'https://hellostake.com/llms.txt'
        }
    },
    {
        id: 4,
        type: 'media_pitch',
        typeName: 'Awards gap',
        priority: 'LOW',
        priorityScore: 50,
        citationCount: 0,
        engines: [],
        hook: `Long-term credibility play through industry awards
Finder's 2025 Investment Awards featured Tiger Brokers and Superhero—you could be next
Awards = permanent AI citations and authority signals`,
        solution: {
            awardsName: 'Finder Investment Awards 2026',
            organizationName: 'Finder',
            organizationLogo: 'finder',
            opportunityType: 'Awards & Recognition Opportunity',
            description: 'Finder\'s annual Investment Awards recognize excellence in Australian investment platforms. Past winners include Tiger Brokers (Best Mobile App), Superhero (Best for Low Fees), and others in your competitive space.',
            nextAwardsDate: 'Mid-2026',
            categories: 8,
            coverage: 'Finder.com.au + media partners',
            pastWinners: ['Tiger Brokers (Best Mobile App)', 'Superhero (Best for Low Fees)', 'CommSec (Best Full-Service)'],
            contacts: [
                {
                    name: 'Kate Browne',
                    firstName: 'Kate',
                    role: 'Editorial Director, Finder',
                    email: 'kate@finder.com.au',
                    verified: true,
                    confidence: 90,
                    primary: true
                },
                {
                    name: 'Awards Team',
                    firstName: 'Team',
                    role: 'Editorial',
                    email: 'awards@finder.com.au',
                    verified: false,
                    confidence: 85,
                    primary: false
                }
            ],
            emailTemplate: {
                subject: 'Inquiry about Finder Investment Awards 2026',
                body: `Hi Kate,

I came across Finder's 2025 Investment Awards and was impressed by the recognition given to platforms like Tiger Brokers and Superhero.

I work with Stake, an Australian investment platform with 500,000+ users, and I'm interested in understanding how companies are considered for these awards.

Could you share:
• Eligibility criteria for participation
• Nomination or application process
• Key dates for the 2026 awards
• Who's best to discuss this with

We'd love to explore participation in future programs.

Thanks for your time,
[Your Name]`
            },
            guidanceSteps: [
                {
                    icon: '🤝',
                    title: 'Relationship-Building Approach',
                    description: 'The goal is to learn about the awards program, understand eligibility requirements, and build a relationship for future participation. This is a humble inquiry, not a demand for inclusion.'
                }
            ],
            actionPlan: [
                'Send humble inquiry email to contact above',
                'Ask about nomination/application process',
                'Request information about eligibility criteria',
                'Build relationship for future opportunities'
            ]
        }
    }
];

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = gaps;
}
