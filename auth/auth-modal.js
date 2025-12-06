// Auth Modal JavaScript
// This file handles all authentication logic for the Fokal static site

// Configuration - can be overridden by setting window.AUTH_SOURCE before loading this script
const AUTH_SOURCE = window.AUTH_SOURCE || 'static_site';

// Load auth modal HTML
async function loadAuthModal() {
    try {
        const response = await fetch('/auth/auth-modal.html');
        const html = await response.text();
        const container = document.getElementById('auth-modal-container');
        if (container) {
            container.innerHTML = html;
        }
    } catch (error) {
        console.error('Failed to load auth modal:', error);
    }
}

// Show/hide auth modal functions
function showAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) {
        document.body.style.overflow = 'hidden';
        modal.classList.add('active');

        // Track modal view
        trackEvent('Auth Modal Viewed', {
            source: AUTH_SOURCE
        });
    }
}

function closeAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        document.getElementById('emailForm').style.display = 'none';
        document.getElementById('authButtons').style.display = 'block';
        document.getElementById('successMessage').style.display = 'none';
    }
}

// Store OAuth2 client for popup flow
let googleOAuth2Client = null;

// Initialize Google Sign-In
function initializeGoogleSignIn() {
    if (window.google && window.google.accounts && window.google.accounts.id) {
        // Initialize Google Identity Services (for One Tap)
        window.google.accounts.id.initialize({
            client_id: '1054697872150-e2fkcro4f3og26go8pu2fsctq3vvhoud.apps.googleusercontent.com',
            callback: handleGoogleCallback,
            auto_select: false,
            cancel_on_tap_outside: true
        });

        // Initialize OAuth2 client (for popup fallback)
        if (window.google.accounts.oauth2) {
            googleOAuth2Client = window.google.accounts.oauth2.initCodeClient({
                client_id: '1054697872150-e2fkcro4f3og26go8pu2fsctq3vvhoud.apps.googleusercontent.com',
                scope: 'email profile openid',
                ux_mode: 'popup',
                callback: async (response) => {
                    console.log('OAuth2 callback received:', response);
                    if (response.code) {
                        await handleOAuth2Callback(response.code);
                    } else if (response.error) {
                        console.error('OAuth2 error:', response.error);
                        alert('Google sign-in failed. Please try again.');
                    }
                },
            });
            console.log('OAuth2 client initialized');
        }

        console.log('Google Sign-In initialized');
    } else {
        // Retry if SDK not loaded yet
        setTimeout(initializeGoogleSignIn, 100);
    }
}

// Helper function to get CSRF token from cookie
function getCsrfToken() {
    const match = document.cookie.match(/csrf_token=([^;]+)/);
    return match ? match[1] : '';
}

// Initialize CSRF token on page load
async function initCsrfToken() {
    try {
        await fetch('https://backend.fokal.com/api/csrf-token', {
            credentials: 'include'
        });
        console.log('CSRF token initialized');
    } catch (error) {
        console.error('Failed to initialize CSRF token:', error);
    }
}

// Sanitize URL to remove sensitive query parameters
function sanitizeUrl(url) {
    try {
        const parsed = new URL(url);
        // Remove sensitive parameters
        const sensitiveParams = ['token', 'auth', 'session', 'key', 'secret', 'password', 'credential'];
        sensitiveParams.forEach(param => parsed.searchParams.delete(param));
        return parsed.pathname + (parsed.search || '');
    } catch {
        return url.split('?')[0]; // Fallback: just return path
    }
}

// Initialize Mixpanel analytics
function initMixpanel() {
    try {
        if (window.mixpanel) {
            mixpanel.init('2f758f6e4c1f3912f7953dd44464bd91', {
                debug: false,
                track_pageview: false,
                persistence: 'localStorage'
            });
            console.log('Mixpanel initialized');

            // Track page view (sanitized - no sensitive query params)
            mixpanel.track('Page Viewed', {
                page: AUTH_SOURCE,
                path: window.location.pathname,
                referrer_path: sanitizeUrl(document.referrer),
                timestamp: new Date().toISOString()
            });
        }
    } catch (error) {
        console.error('Failed to initialize Mixpanel:', error);
    }
}

// Capture GCLID for Google Ads conversion tracking
function captureGCLID() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const gclid = urlParams.get('gclid');

        if (gclid) {
            // Store GCLID in localStorage with timestamp
            localStorage.setItem('gclid', gclid);
            localStorage.setItem('gclid_timestamp', Date.now().toString());

            // Track ad click in Mixpanel (sanitized - no full URLs)
            if (window.mixpanel) {
                mixpanel.track('Ad Click Landed', {
                    gclid: gclid,
                    landing_path: window.location.pathname,
                    referrer_domain: document.referrer ? new URL(document.referrer).hostname : null,
                    timestamp: new Date().toISOString()
                });
            }

            console.log('GCLID captured');
        }
    } catch (error) {
        console.error('Failed to capture GCLID:', error);
    }
}

// Utility function to track events
function trackEvent(eventName, properties = {}) {
    try {
        if (window.mixpanel) {
            mixpanel.track(eventName, {
                ...properties,
                timestamp: new Date().toISOString(),
                source: AUTH_SOURCE
            });
        }
    } catch (error) {
        console.error('Failed to track event:', error);
    }
}

// Handle Google OAuth callback (for One Tap flow)
async function handleGoogleCallback(response) {
    console.log('Google sign-in successful (One Tap)');

    try {
        const csrfToken = getCsrfToken();

        // Send credential to backend
        const res = await fetch('https://backend.fokal.com/api/auth/google', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrfToken
            },
            credentials: 'include',
            body: JSON.stringify({ credential: response.credential })
        });

        const data = await res.json();

        if (res.ok && data.user) {
            // Track successful sign-in
            trackEvent('Sign In Successful', {
                method: 'google',
                flow: 'one_tap',
                has_brand: !!data.user.brandId,
                next_step: data.user.brandId ? 'dashboard' : 'onboarding'
            });

            // Redirect to dashboard or onboarding
            if (data.user.brandId) {
                window.location.href = `https://app.fokal.com/brand/${data.user.brandId}/greatness`;
            } else {
                window.location.href = 'https://app.fokal.com/onboarding';
            }
        } else {
            // Track sign-in failure
            trackEvent('Sign In Failed', {
                method: 'google',
                flow: 'one_tap',
                error: data.error || 'unknown'
            });

            alert('Sign in failed. Please try again.');
        }
    } catch (error) {
        // Track sign-in error
        trackEvent('Sign In Error', {
            method: 'google',
            flow: 'one_tap',
            error: error.message
        });

        console.error('Error during Google sign-in:', error);
        alert('Sign in failed. Please try again.');
    }
}

// Handle OAuth2 callback (for popup flow)
async function handleOAuth2Callback(code) {
    console.log('Google sign-in successful (OAuth2 popup)');

    try {
        const csrfToken = getCsrfToken();

        // Send authorization code to backend
        const res = await fetch('https://backend.fokal.com/api/auth/google/code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrfToken
            },
            credentials: 'include',
            body: JSON.stringify({ code: code })
        });

        const data = await res.json();

        if (res.ok && data.user) {
            // Track successful sign-in
            trackEvent('Sign In Successful', {
                method: 'google',
                flow: 'oauth2_popup',
                has_brand: !!data.user.brandId,
                next_step: data.user.brandId ? 'dashboard' : 'onboarding'
            });

            // Redirect to dashboard or onboarding
            if (data.user.brandId) {
                window.location.href = `https://app.fokal.com/brand/${data.user.brandId}/greatness`;
            } else {
                window.location.href = 'https://app.fokal.com/onboarding';
            }
        } else {
            // Track sign-in failure
            trackEvent('Sign In Failed', {
                method: 'google',
                flow: 'oauth2_popup',
                error: data.error || 'unknown'
            });

            alert('Sign in failed. Please try again.');
        }
    } catch (error) {
        // Track sign-in error
        trackEvent('Sign In Error', {
            method: 'google',
            flow: 'oauth2_popup',
            error: error.message
        });

        console.error('Error during Google OAuth2 sign-in:', error);
        alert('Sign in failed. Please try again.');
    }
}

function signInWithGoogle() {
    // Track Google sign-in click
    trackEvent('Auth Button Clicked', {
        method: 'google',
        location: 'modal'
    });

    console.log('signInWithGoogle called');

    // Try OAuth2 popup flow (more reliable)
    if (googleOAuth2Client) {
        console.log('Using OAuth2 popup flow');
        googleOAuth2Client.requestCode();
    }
    // Fallback to One Tap if OAuth2 not available
    else if (window.google && window.google.accounts && window.google.accounts.id) {
        console.log('Using One Tap flow');
        window.google.accounts.id.prompt((notification) => {
            console.log('One Tap notification:', notification);
            if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
                console.log('One Tap not displayed, reason:', notification.getNotDisplayedReason() || notification.getSkippedReason());
                // If One Tap fails and we have OAuth2 client, try that
                if (googleOAuth2Client) {
                    console.log('One Tap failed, falling back to OAuth2 popup');
                    googleOAuth2Client.requestCode();
                }
            }
        });
    } else {
        console.error('Google Sign-In not properly initialized');
        alert('Google Sign-In is still loading. Please try again in a moment.');
    }
}

function showEmailForm() {
    // Track email form view
    trackEvent('Auth Button Clicked', {
        method: 'email',
        location: 'modal'
    });

    document.getElementById('authButtons').style.display = 'none';
    document.getElementById('emailForm').style.display = 'block';
}

function backToAuthOptions() {
    document.getElementById('emailForm').style.display = 'none';
    document.getElementById('authButtons').style.display = 'block';
    document.getElementById('successMessage').style.display = 'none';
    document.getElementById('emailInput').value = '';
}

async function sendMagicLink(e) {
    e.preventDefault();
    const email = document.getElementById('emailInput').value;
    const submitBtn = document.getElementById('submitEmailBtn');
    const btnText = submitBtn.querySelector('.btn-text');

    if (!email || !email.includes('@')) {
        alert('Please enter a valid email address');
        return;
    }

    // Track magic link request
    trackEvent('Magic Link Requested', {
        email_domain: email.split('@')[1]
    });

    submitBtn.disabled = true;
    btnText.textContent = 'Sending...';

    try {
        const csrfToken = getCsrfToken();

        const response = await fetch('https://backend.fokal.com/api/auth/magic-link/request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrfToken
            },
            credentials: 'include',
            body: JSON.stringify({ email })
        });

        if (response.ok) {
            // Track successful send
            trackEvent('Magic Link Sent', {
                email_domain: email.split('@')[1]
            });

            document.getElementById('emailForm').style.display = 'none';
            document.getElementById('successMessage').style.display = 'block';
            document.getElementById('userEmail').textContent = email;
        } else {
            // Track failure
            trackEvent('Magic Link Failed', {
                email_domain: email.split('@')[1],
                status: response.status
            });

            alert('Failed to send magic link. Please try again.');
        }
    } catch (error) {
        // Track error
        trackEvent('Magic Link Error', {
            error: error.message
        });

        alert('Network error. Please try again.');
    } finally {
        submitBtn.disabled = false;
        btnText.textContent = 'Send Magic Link';
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Load the auth modal HTML first
    loadAuthModal().then(() => {
        // Initialize Google Sign-In
        initializeGoogleSignIn();

        // Initialize CSRF token
        initCsrfToken();

        // Initialize Mixpanel analytics
        initMixpanel();

        // Capture GCLID for Google Ads tracking
        captureGCLID();

        // Show auth modal on page load if requested
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('showAuth') === 'true') {
            showAuthModal();
            window.history.replaceState({}, document.title, window.location.pathname);
        }

        // Close modal when clicking outside
        const modal = document.getElementById('authModal');
        if (modal) {
            modal.addEventListener('click', function(e) {
                if (e.target === modal) closeAuthModal();
            });
        }
    });
});

// Also initialize if script is loaded after DOMContentLoaded
if (document.readyState === 'loading') {
    // Already set up listener above
} else {
    // DOM already loaded, initialize now
    loadAuthModal().then(() => {
        initializeGoogleSignIn();
        initCsrfToken();
        initMixpanel();
        captureGCLID();
    });
}
