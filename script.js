// Shared utility functions

// Copy to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Copied to clipboard! ✅');
    }).catch(() => {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('Copied to clipboard! ✅');
    });
}

// Toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(0, 212, 255, 0.9);
        color: #fff;
        padding: 1rem 2rem;
        border-radius: 10px;
        font-weight: 600;
        z-index: 9999;
        animation: slideIn 0.3s ease;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5);
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateY(100px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
`;
document.head.appendChild(style);

// Base64 functions
function encodeBase64(text) {
    return btoa(unescape(encodeURIComponent(text)));
}

function decodeBase64(text) {
    try {
        return decodeURIComponent(escape(atob(text)));
    } catch {
        return '❌ Invalid Base64 string';
    }
}

// ROT13
function rot13(text) {
    return text.replace(/[a-zA-Z]/g, c => {
        const base = c <= 'Z' ? 65 : 97;
        return String.fromCharCode((c.charCodeAt(0) - base + 13) % 26 + base);
    });
}

// URL Encode/Decode
function encodeURL(text) {
    return encodeURIComponent(text);
}

function decodeURL(text) {
    try {
        return decodeURIComponent(text);
    } catch {
        return '❌ Invalid URL encoding';
    }
}

// Hex to Text / Text to Hex
function textToHex(text) {
    return Array.from(text).map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join(' ');
}

function hexToText(hex) {
    try {
        return hex.split(' ').map(h => String.fromCharCode(parseInt(h, 16))).join('');
    } catch {
        return '❌ Invalid hex string';
    }
}

// Binary to Text / Text to Binary
function textToBinary(text) {
    return Array.from(text).map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
}

function binaryToText(binary) {
    try {
        return binary.split(' ').map(b => String.fromCharCode(parseInt(b, 2))).join('');
    } catch {
        return '❌ Invalid binary string';
    }
}

// Caesar Cipher
function caesarCipher(text, shift) {
    shift = parseInt(shift) || 0;
    return text.replace(/[a-zA-Z]/g, c => {
        const base = c <= 'Z' ? 65 : 97;
        return String.fromCharCode((c.charCodeAt(0) - base + shift) % 26 + base);
    });
}

// Detect active page and highlight nav
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});
