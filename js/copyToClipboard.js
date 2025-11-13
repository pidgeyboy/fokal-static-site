// Copy to Clipboard Functionality

function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error('Element not found:', elementId);
        return;
    }

    // Get the text content
    const text = element.innerText || element.textContent;

    // Try using the modern clipboard API first
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('Copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy:', err);
            fallbackCopy(text);
        });
    } else {
        // Fallback for older browsers or non-secure contexts
        fallbackCopy(text);
    }
}

function fallbackCopy(text) {
    // Create a temporary textarea
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);

    // Select and copy
    textarea.select();
    textarea.setSelectionRange(0, 99999); // For mobile devices

    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showToast('Copied to clipboard!');
        } else {
            showToast('Copy failed. Please try manually.', 'error');
        }
    } catch (err) {
        console.error('Fallback copy failed:', err);
        showToast('Copy failed. Please try manually.', 'error');
    }

    document.body.removeChild(textarea);
}

function showToast(message, type = 'success') {
    // Remove any existing toasts
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    // Create new toast
    const toast = document.createElement('div');
    toast.className = 'toast';
    if (type === 'error') {
        toast.style.background = 'rgba(255, 95, 87, 0.95)';
    }
    toast.textContent = message;

    document.body.appendChild(toast);

    // Remove after 2 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
        }
    }, 2000);
}

// Attach copy listeners to all copy buttons
function attachCopyListeners() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const copyId = this.getAttribute('data-copy');
            if (copyId) {
                copyToClipboard(copyId);
            }
        });
    });
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        copyToClipboard,
        showToast,
        attachCopyListeners
    };
}
