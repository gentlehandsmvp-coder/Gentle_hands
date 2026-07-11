// ============================================================
// Gentle Hands Zambia - Main JavaScript
// Brand: Soft Teal, Warm Terracotta, Blush Pink, Sage Green
// ============================================================

// ===== Brand Color Palette =====
const BRAND_COLORS = {
    teal: '#6BA2A0',
    tealDeep: '#3E6F6C',
    terracotta: '#D97A5C',
    blush: '#E8A2A6',
    cream: '#F5F0E1',
    creamLight: '#FCFBF8',
    sage: '#AFC8B8',
    charcoal: '#4A4A4A',
    grayLight: '#E7ECEB',
    success: '#4CAF50',
    warning: '#F4A261',
    error: '#E76F51',
    info: '#5B8DEF'
};

// ============================================================
// DOMContentLoaded - Initialize all components
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            mobileMenu.classList.toggle('open');
            // Update toggle button text
            this.textContent = mobileMenu.classList.contains('open') ? '✕' : '☰';
        });
    }

    // --- Close mobile menu on link click ---
    if (mobileMenu) {
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active', 'open');
                if (menuToggle) {
                    menuToggle.textContent = '☰';
                }
            });
        });
    }

    // --- Add notification styles dynamically ---
    addNotificationStyles();

    // --- Auto-initialize file previews ---
    document.querySelectorAll('input[type="file"][data-preview]').forEach(input => {
        const previewId = input.dataset.preview;
        input.addEventListener('change', function() {
            previewFile(this.id, previewId);
        });
    });
});

// ============================================================
// Notification System
// ============================================================

/**
 * Show a styled notification toast
 * @param {string} message - The message to display
 * @param {string} type - 'success', 'error', 'warning', 'info'
 */
function showNotification(message, type = 'success') {
    // Define colors based on brand palette
    const colors = {
        success: {
            bg: 'rgba(76, 175, 80, 0.12)',
            text: '#2E7D32',
            border: '#4CAF50',
            icon: '✅'
        },
        error: {
            bg: 'rgba(231, 111, 81, 0.12)',
            text: '#C0392B',
            border: '#E76F51',
            icon: '❌'
        },
        warning: {
            bg: 'rgba(244, 162, 97, 0.15)',
            text: '#C77D3A',
            border: '#F4A261',
            icon: '⚠️'
        },
        info: {
            bg: 'rgba(91, 141, 239, 0.12)',
            text: '#2C5F8A',
            border: '#5B8DEF',
            icon: 'ℹ️'
        }
    };

    const colorSet = colors[type] || colors.success;

    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 24px;
        right: 24px;
        padding: 1rem 1.5rem;
        border-radius: 14px;
        background: rgba(255, 255, 255, 0.92);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        color: ${colorSet.text};
        font-family: "Nunito", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-weight: 600;
        font-size: 0.95rem;
        box-shadow: 0 20px 60px rgba(62, 111, 108, 0.18);
        z-index: 9999;
        max-width: 420px;
        min-width: 280px;
        border: 1px solid rgba(107, 162, 160, 0.12);
        border-left: 4px solid ${colorSet.border};
        animation: slideIn 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
        display: flex;
        align-items: center;
        gap: 0.75rem;
        transition: opacity 0.3s ease, transform 0.3s ease;
    `;

    // Add icon
    const icon = document.createElement('span');
    icon.textContent = colorSet.icon;
    icon.style.cssText = 'font-size: 1.2rem; flex-shrink: 0;';
    notification.appendChild(icon);

    // Add message
    const text = document.createElement('span');
    text.textContent = message;
    notification.appendChild(text);

    document.body.appendChild(notification);

    // Auto-dismiss after 5 seconds
    const dismissTimeout = setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(40px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 350);
    }, 5000);

    // Allow click to dismiss
    notification.addEventListener('click', function() {
        clearTimeout(dismissTimeout);
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(40px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 350);
    });
}

// ============================================================
// File Upload Preview
// ============================================================

/**
 * Preview uploaded file (image or document)
 * @param {string} inputId - ID of the file input element
 * @param {string} previewId - ID of the preview container element
 */
function previewFile(inputId, previewId) {
    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);
    
    if (!input || !preview) return;
    
    const file = input.files[0];
    if (!file) {
        preview.innerHTML = '';
        return;
    }

    const fileSize = (file.size / 1024).toFixed(1);

    if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.innerHTML = `
                <div style="
                    margin-top: 0.5rem;
                    padding: 0.6rem 0.8rem;
                    background: rgba(107, 162, 160, 0.06);
                    border-radius: 10px;
                    border: 1px solid rgba(107, 162, 160, 0.12);
                    display: flex;
                    align-items: center;
                    gap: 0.8rem;
                ">
                    <img src="${e.target.result}" alt="Preview" style="
                        width: 60px;
                        height: 60px;
                        border-radius: 8px;
                        object-fit: cover;
                        border: 1px solid rgba(107, 162, 160, 0.12);
                    ">
                    <div style="
                        font-size: 0.85rem;
                        color: #4A4A4A;
                    ">
                        <strong style="color: #3E6F6C;">${file.name}</strong>
                        <br>
                        <span style="color: #6B7A78;">${fileSize} KB</span>
                    </div>
                </div>
            `;
        };
        reader.readAsDataURL(file);
    } else {
        // For non-image files (PDF, etc.)
        preview.innerHTML = `
            <div style="
                margin-top: 0.5rem;
                padding: 0.6rem 0.8rem;
                background: rgba(107, 162, 160, 0.06);
                border-radius: 10px;
                border: 1px solid rgba(107, 162, 160, 0.12);
                display: flex;
                align-items: center;
                gap: 0.8rem;
            ">
                <span style="font-size: 1.5rem;">📄</span>
                <div style="
                    font-size: 0.85rem;
                    color: #4A4A4A;
                ">
                    <strong style="color: #3E6F6C;">${file.name}</strong>
                    <br>
                    <span style="color: #6B7A78;">${fileSize} KB</span>
                </div>
            </div>
        `;
    }
}

// ============================================================
// Admin Functions
// ============================================================

/**
 * Approve a nurse registration
 * @param {string|number} nurseId - The ID of the nurse to approve
 */
function approveNurse(nurseId) {
    if (!confirm('Are you sure you want to approve this nurse?')) return;
    showNotification(`✅ Nurse #${nurseId} approved successfully!`, 'success');
    // In production: send API request
    // setTimeout(() => location.reload(), 1500);
}

/**
 * Match a client with a nurse
 * @param {string|number} clientId - The ID of the client
 * @param {string|number} nurseId - The ID of the nurse
 */
function matchClient(clientId, nurseId) {
    if (!confirm('Match this client with the selected nurse?')) return;
    showNotification(`✅ Client #${clientId} matched with Nurse #${nurseId}!`, 'success');
    // In production: send API request
    // setTimeout(() => location.reload(), 1500);
}

// ============================================================
// Form Submission Handlers
// ============================================================

/**
 * Submit a client care request
 * @param {FormData|Object} formData - The form data to submit
 */
function submitClientRequest(formData) {
    console.log('📋 Client Request Submitted:', formData);
    showNotification('✅ Care request submitted successfully! You will receive a confirmation email shortly.', 'success');
    // In production: send API request with formData
    // setTimeout(() => { window.location.href = '/'; }, 3000);
}

/**
 * Submit a nurse registration
 * @param {FormData|Object} formData - The form data to submit
 */
function submitNurseRegistration(formData) {
    console.log('👩‍⚕️ Nurse Registration Submitted:', formData);
    showNotification('✅ Registration submitted successfully! You will be notified once your credentials are verified.', 'success');
    // In production: send API request with formData
    // setTimeout(() => { window.location.href = '/'; }, 3000);
}

// ============================================================
// Dynamic Styles Injection
// ============================================================

/**
 * Inject notification animation styles into the document
 */
function addNotificationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(60px) scale(0.95);
            }
            to {
                opacity: 1;
                transform: translateX(0) scale(1);
            }
        }

        /* Mobile menu active state */
        .mobile-menu.active,
        .mobile-menu.open {
            display: flex !important;
        }

        /* Notification responsive */
        @media (max-width: 480px) {
            .notification-toast {
                top: 16px;
                right: 16px;
                left: 16px;
                max-width: none !important;
                min-width: auto !important;
                padding: 0.8rem 1rem !important;
                font-size: 0.85rem !important;
            }
        }

        /* Subtle pulse for pending badges */
        @keyframes pulse-dot {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(0.85); }
        }
    `;
    document.head.appendChild(style);
}

// ============================================================
// Expose functions globally for HTML onclick attributes
// ============================================================
window.showNotification = showNotification;
window.previewFile = previewFile;
window.approveNurse = approveNurse;
window.matchClient = matchClient;
window.submitClientRequest = submitClientRequest;
window.submitNurseRegistration = submitNurseRegistration;

// ============================================================
// Console branding (optional)
// ============================================================
console.log('%c🌿 Gentle Hands Zambia', 'font-size: 24px; font-weight: bold; color: #3E6F6C;');
console.log('%cProfessional in-home care delivered with kindness and dignity.', 'font-size: 14px; color: #6B7A78;');
console.log('💚 Trusted healthcare · 🧡 Compassionate care · 🌿 Home-based support');