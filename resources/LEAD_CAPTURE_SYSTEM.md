# Lead Capture System Documentation

## Overview

A lead generation system built for Fokal to capture qualified leads from marketing campaigns. The first campaign is the "Australian AI GEO/SEO Tactic" - a lead magnet promoting an exclusive GEO/SEO tip for Australian AI startups.

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USER JOURNEY                                 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  LinkedIn Post ──► Landing Page ──► Form Submit ──► Homepage + Toast │
│                                                                      │
│  (with UTM params)   /resources/     POST /api/     ?lead_success=   │
│                      australian-     leads/capture  australian-ai-   │
│                      ai-geo-tactic                  geo-tactic       │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Components

### 1. Landing Page (Frontend)

**URL**: `https://www.fokal.com/resources/australian-ai-geo-tactic`

**File**: `fokal-static-site/resources/australian-ai-geo-tactic.html`

**Features**:
- Dark theme matching Fokal brand (purple accent for exclusivity)
- Uses shared header (`/components/header.js`, `/components/header.css`)
- Uses shared footer (`/components/footer.js`, `/components/footer.css`)
- Mobile responsive design
- `noindex, nofollow` meta tags (keeps page off search engines for exclusivity)

**Content Sections**:
1. **Hero**: "The GEO/SEO Tactic Every Australian AI Startup Should Know"
2. **Benefits**: 5 bullet points (trust signals, AI relevance, Australian authority, etc.)
3. **Time Highlight**: "Takes just 2 minutes to implement" (green badge)
4. **Who This Is For**: Australian AI startups, founders, service providers
5. **Not For**: SEO/GEO agencies (explicit exclusion messaging)
6. **Registration Form**: Lead capture with validation

**Form Fields**:
| Field | Required | Type | Validation |
|-------|----------|------|------------|
| First Name | Yes | text | - |
| Last Name | No | text | - |
| Work Email | Yes | email | Email format |
| Company Name | Yes | text | - |
| Website Domain | Yes | text | Domain format |
| Phone | No | tel | - |
| Role | No | select | founder, growth, product, technical, other |
| Agency Confirmation | Yes | checkbox | Must confirm NOT an agency |

**UTM Tracking**:
The page automatically captures UTM parameters from the URL:
- `utm_source` (e.g., linkedin)
- `utm_medium` (e.g., social)
- `utm_campaign` (e.g., jeremy-geo-tactic)

**Example URL with tracking**:
```
https://www.fokal.com/resources/australian-ai-geo-tactic?utm_source=linkedin&utm_medium=social&utm_campaign=jeremy-geo-tactic
```

---

### 2. Backend API

**Endpoint**: `POST https://snoops-ai-backend.onrender.com/api/leads/capture`

**File**: `snoops-ai-backend/routes/leads.js`

**Mounted in**: `snoops-ai-backend/index.js` at line 783

**Security Features**:
- **Rate Limiting**: 5 submissions per IP per 15 minutes (prevents spam)
- **Email Validation**: Basic regex check
- **Domain Validation**: Cleans and validates domain format
- **Duplicate Prevention**: Same email + campaign can't submit twice (returns success silently to prevent email enumeration)
- **No Authentication**: Public endpoint for marketing (no CSRF needed)

**Request Body**:
```json
{
  "campaign_slug": "australian-ai-geo-tactic",
  "first_name": "John",
  "last_name": "Smith",
  "email": "john@company.com",
  "phone": "+61 400 000 000",
  "company": "Company Name",
  "domain": "company.com",
  "role": "founder",
  "is_agency": false,
  "source": "website",
  "utm_source": "linkedin",
  "utm_medium": "social",
  "utm_campaign": "jeremy-geo-tactic"
}
```

**Response (Success)**:
```json
{
  "success": true,
  "message": "Submission successful",
  "leadId": 1,
  "timestamp": "2025-12-04T08:11:20.778Z"
}
```

**Response (Duplicate)**:
```json
{
  "success": true,
  "message": "Submission received",
  "alreadySubmitted": true
}
```

---

### 3. Database Schema

**Table**: `lead_captures`

**Location**: PostgreSQL on Render (snoops-ai-db)

```sql
CREATE TABLE lead_captures (
    id SERIAL PRIMARY KEY,
    campaign_slug VARCHAR(100) NOT NULL,      -- e.g., 'australian-ai-geo-tactic'
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),
    domain VARCHAR(255),                       -- Cleaned domain (no https://, www.)
    role VARCHAR(100),                         -- founder, growth, product, technical, other
    is_agency BOOLEAN DEFAULT false,
    source VARCHAR(50) DEFAULT 'website',
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(100),
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),

    UNIQUE(email, campaign_slug)              -- One submission per email per campaign
);
```

**Query to view leads**:
```sql
SELECT * FROM lead_captures
WHERE campaign_slug = 'australian-ai-geo-tactic'
ORDER BY created_at DESC;
```

---

### 4. Success Flow (Homepage Toast)

After successful form submission, the user is redirected to:
```
https://www.fokal.com?lead_success=australian-ai-geo-tactic
```

**Homepage Changes** (`fokal-static-site/index.html`):

1. **Toast Styles**: Added CSS for `.success-toast` component (lines 1941-2033)
2. **Toast HTML**: Added toast element with checkmark icon (lines 3189-3205)
3. **Toast Script**: Detects `lead_success` param, shows toast, cleans URL (lines 3207-3238)

**Toast Behavior**:
- Appears 500ms after page load
- Shows: "You're on the list! We'll be in touch shortly with the walkthrough."
- Auto-dismisses after 8 seconds
- User can click X to close early
- URL parameter is removed from address bar (clean URL)

---

### 5. Render Configuration

**File**: `fokal-static-site/render.yaml`

**Route Rewrite** (line 61-62):
```yaml
- type: rewrite
  source: /resources/australian-ai-geo-tactic
  destination: /resources/australian-ai-geo-tactic.html
```

---

## File Summary

| File | Repository | Purpose |
|------|------------|---------|
| `resources/australian-ai-geo-tactic.html` | fokal-static-site | Landing page |
| `index.html` | fokal-static-site | Homepage (toast notification) |
| `render.yaml` | fokal-static-site | Route configuration |
| `routes/leads.js` | snoops-ai-backend | API endpoint |
| `index.js` | snoops-ai-backend | Router mounting |

---

## Current Campaign Data

**Campaign Slug**: `australian-ai-geo-tactic`

**Leads Captured** (as of Dec 4, 2025):

| # | Name | Company | Domain | Email | Role | Time (UTC) |
|---|------|---------|--------|-------|------|------------|
| 1 | Patrick Gallagher | Altair Innovations | fokal.com | patrick@snoops.ai | founder | 08:11 |
| 2 | Jonas Whitgift | Tern Visa | ternvisa.com | jonas@ternvisa.com | founder | 11:28 |
| 3 | Nick Davenport | Vozi | vozi.com.au | hello@vozi.com.au | founder | 11:40 |
| 4 | Jeremy Cabral | Jeremy Cabral | jeremycabral.com | advisory@jeremycabral.com | founder | 11:41 |

---

## Future Enhancements

### Automated Response System (TODO)

Currently, leads are captured but responses must be sent manually. Planned automation:

1. **Email Notification**: Send email to admin when new lead arrives
2. **Auto-Response Email**: Send the tactic/walkthrough automatically to new leads via Postmark
3. **Slack Notification**: Post to Slack channel when new lead arrives
4. **CRM Integration**: Push leads to external CRM if needed

### Adding New Campaigns

The system is designed to be reusable. To add a new campaign:

1. Create new landing page in `/resources/` directory
2. Use a unique `campaign_slug` in the form
3. Add route rewrite to `render.yaml`
4. Query leads by `campaign_slug` to segment

---

## Monitoring

**View all leads**:
```sql
SELECT * FROM lead_captures ORDER BY created_at DESC;
```

**Count by campaign**:
```sql
SELECT campaign_slug, COUNT(*) as leads
FROM lead_captures
GROUP BY campaign_slug;
```

**Leads with UTM attribution**:
```sql
SELECT first_name, company, utm_source, utm_medium, utm_campaign, created_at
FROM lead_captures
WHERE utm_source IS NOT NULL
ORDER BY created_at DESC;
```
