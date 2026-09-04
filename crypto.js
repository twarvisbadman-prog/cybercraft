// ============================================
// CRYPTOGRAPHY FUNCTIONS - 20+ Features
// ============================================

// ---------- SYMMETRIC ENCRYPTION ----------

// 1. AES-CBC Encryption
async function aesCbcEncrypt(text, password) {
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
        'raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']
    );
    const key = await crypto.subtle.deriveKey(
        { name: 'PBKDF2', salt: enc.encode('aes-salt'), iterations: 100000, hash: 'SHA-256' },
        keyMaterial,
        { name: 'AES-CBC', length: 256 },
        false,
        ['encrypt']
    );
    const iv = crypto.getRandomValues(new Uint8Array(16));
    const encrypted = await crypto.subtle.encrypt(
        { name: 'AES-CBC', iv: iv },
        key,
        enc.encode(text)
    );
    const result = new Uint8Array(iv.length + encrypted.byteLength);
    result.set(iv, 0);
    result.set(new Uint8Array(encrypted), iv.length);
    return btoa(String.fromCharCode(...result));
}

// 2. AES-CBC Decryption
async function aesCbcDecrypt(encryptedData, password) {
    try {
        const raw = Uint8Array.from(atob(encryptedData), c => c.charCodeAt(0));
        const iv = raw.slice(0, 16);
        const encrypted = raw.slice(16);
        const enc = new TextEncoder();
        const keyMaterial = await crypto.subtle.importKey(
            'raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']
        );
        const key = await crypto.subtle.deriveKey(
            { name: 'PBKDF2', salt: enc.encode('aes-salt'), iterations: 100000, hash: 'SHA-256' },
            keyMaterial,
            { name: 'AES-CBC', length: 256 },
            false,
            ['decrypt']
        );
        const decrypted = await crypto.subtle.decrypt(
            { name: 'AES-CBC', iv: iv },
            key,
            encrypted
        );
        return new TextDecoder().decode(decrypted);
    } catch (e) {
        return '❌ Decryption failed: ' + e.message;
    }
}

// 3. AES-GCM Encryption
async function aesGcmEncrypt(text, password) {
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
        'raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']
    );
    const key = await crypto.subtle.deriveKey(
        { name: 'PBKDF2', salt: enc.encode('gcm-salt'), iterations: 100000, hash: 'SHA-256' },
        keyMaterial,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt']
    );
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv: iv },
        key,
        enc.encode(text)
    );
    const result = new Uint8Array(iv.length + encrypted.byteLength);
    result.set(iv, 0);
    result.set(new Uint8Array(encrypted), iv.length);
    return btoa(String.fromCharCode(...result));
}

// 4. AES-GCM Decryption
async function aesGcmDecrypt(encryptedData, password) {
    try {
        const raw = Uint8Array.from(atob(encryptedData), c => c.charCodeAt(0));
        const iv = raw.slice(0, 12);
        const encrypted = raw.slice(12);
        const enc = new TextEncoder();
        const keyMaterial = await crypto.subtle.importKey(
            'raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']
        );
        const key = await crypto.subtle.deriveKey(
            { name: 'PBKDF2', salt: enc.encode('gcm-salt'), iterations: 100000, hash: 'SHA-256' },
            keyMaterial,
            { name: 'AES-GCM', length: 256 },
            false,
            ['decrypt']
        );
        const decrypted = await crypto.subtle.decrypt(
            { name: 'AES-GCM', iv: iv },
            key,
            encrypted
        );
        return new TextDecoder().decode(decrypted);
    } catch (e) {
        return '❌ Decryption failed: ' + e.message;
    }
}

// 5. Triple DES (3DES) Encryption
async function tripleDesEncrypt(text, password) {
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
        'raw', enc.encode(password.padEnd(24, '0').slice(0, 24)), 
        'PBKDF2', false, ['deriveKey']
    );
    const key = await crypto.subtle.deriveKey(
        { name: 'PBKDF2', salt: enc.encode('3des-salt'), iterations: 100000, hash: 'SHA-256' },
        keyMaterial,
        { name: 'DES-CBC', length: 192 },
        false,
        ['encrypt']
    );
    const iv = crypto.getRandomValues(new Uint8Array(8));
    const encrypted = await crypto.subtle.encrypt(
        { name: 'DES-CBC', iv: iv },
        key,
        enc.encode(text)
    );
    const result = new Uint8Array(iv.length + encrypted.byteLength);
    result.set(iv, 0);
    result.set(new Uint8Array(encrypted), iv.length);
    return btoa(String.fromCharCode(...result));
}

// 6. Triple DES Decryption
async function tripleDesDecrypt(encryptedData, password) {
    try {
        const raw = Uint8Array.from(atob(encryptedData), c => c.charCodeAt(0));
        const iv = raw.slice(0, 8);
        const encrypted = raw.slice(8);
        const enc = new TextEncoder();
        const keyMaterial = await crypto.subtle.importKey(
            'raw', enc.encode(password.padEnd(24, '0').slice(0, 24)),
            'PBKDF2', false, ['deriveKey']
        );
        const key = await crypto.subtle.deriveKey(
            { name: 'PBKDF2', salt: enc.encode('3des-salt'), iterations: 100000, hash: 'SHA-256' },
            keyMaterial,
            { name: 'DES-CBC', length: 192 },
            false,
            ['decrypt']
        );
        const decrypted = await crypto.subtle.decrypt(
            { name: 'DES-CBC', iv: iv },
            key,
            encrypted
        );
        return new TextDecoder().decode(decrypted);
    } catch (e) {
        return '❌ Decryption failed: ' + e.message;
    }
}

// ---------- HASHING (One-Way) ----------

// 7. SHA-256 Hash
async function sha256Hash(text) {
    const msgBuffer = new TextEncoder().encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// 8. SHA-512 Hash
async function sha512Hash(text) {
    const msgBuffer = new TextEncoder().encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-512', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// 9. SHA-1 Hash
async function sha1Hash(text) {
    const msgBuffer = new TextEncoder().encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-1', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// 10. MD5 Hash (Using CryptoJS CDN)
function md5Hash(text) {
    if (typeof CryptoJS === 'undefined') {
        return '⚠️ CryptoJS library not loaded. Please add CDN link.';
    }
    return CryptoJS.MD5(text).toString();
}

// ---------- CLASSIC CIPHERS ----------

// 11. ROT13
function rot13(text) {
    return text.replace(/[a-zA-Z]/g, c => {
        const base = c <= 'Z' ? 65 : 97;
        return String.fromCharCode((c.charCodeAt(0) - base + 13) % 26 + base);
    });
}

// 12. Caesar Cipher (any shift)
function caesarCipher(text, shift) {
    shift = parseInt(shift) || 3;
    return text.replace(/[a-zA-Z]/g, c => {
        const base = c <= 'Z' ? 65 : 97;
        return String.fromCharCode((c.charCodeAt(0) - base + shift + 26) % 26 + base);
    });
}

// 13. Vigenère Cipher
function vigenereCipher(text, key) {
    if (!key) return text;
    let result = '';
    let keyIndex = 0;
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char.match(/[a-zA-Z]/)) {
            const base = char <= 'Z' ? 65 : 97;
            const shift = key[keyIndex % key.length].toUpperCase().charCodeAt(0) - 65;
            result += String.fromCharCode((char.charCodeAt(0) - base + shift) % 26 + base);
            keyIndex++;
        } else {
            result += char;
        }
    }
    return result;
}

// 14. Vigenère Decipher
function vigenereDecipher(text, key) {
    if (!key) return text;
    let result = '';
    let keyIndex = 0;
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char.match(/[a-zA-Z]/)) {
            const base = char <= 'Z' ? 65 : 97;
            const shift = key[keyIndex % key.length].toUpperCase().charCodeAt(0) - 65;
            result += String.fromCharCode((char.charCodeAt(0) - base - shift + 26) % 26 + base);
            keyIndex++;
        } else {
            result += char;
        }
    }
    return result;
}

// 15. XOR Cipher
function xorCipher(text, key) {
    if (!key) return text;
    let result = '';
    for (let i = 0; i < text.length; i++) {
        result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return btoa(result);
}

// 16. XOR Decipher
function xorDecipher(encodedText, key) {
    try {
        const decoded = atob(encodedText);
        let result = '';
        for (let i = 0; i < decoded.length; i++) {
            result += String.fromCharCode(decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length));
        }
        return result;
    } catch {
        return '❌ Invalid XOR encoded data';
    }
}

// 17. Rail Fence Cipher
function railFenceCipher(text, rails) {
    rails = parseInt(rails) || 3;
    if (rails <= 1) return text;
    const fence = Array(rails).fill().map(() => []);
    let rail = 0;
    let direction = 1;
    for (let i = 0; i < text.length; i++) {
        fence[rail].push(text[i]);
        rail += direction;
        if (rail === rails - 1 || rail === 0) direction *= -1;
    }
    return fence.flat().join('');
}

// 18. Rail Fence Decipher
function railFenceDecipher(text, rails) {
    rails = parseInt(rails) || 3;
    if (rails <= 1) return text;
    const fence = Array(rails).fill().map(() => []);
    let rail = 0;
    let direction = 1;
    for (let i = 0; i < text.length; i++) {
        fence[rail].push(i);
        rail += direction;
        if (rail === rails - 1 || rail === 0) direction *= -1;
    }
    const flat = fence.flat();
    const result = Array(text.length);
    for (let i = 0; i < text.length; i++) {
        result[flat[i]] = text[i];
    }
    return result.join('');
}

// ---------- ENCODING/DECODING ----------

// 19. Base64 Encode
function base64Encode(text) {
    return btoa(unescape(encodeURIComponent(text)));
}

// 20. Base64 Decode
function base64Decode(text) {
    try {
        return decodeURIComponent(escape(atob(text)));
    } catch {
        return '❌ Invalid Base64 string';
    }
}

// 21. URL Encode
function urlEncode(text) {
    return encodeURIComponent(text);
}

// 22. URL Decode
function urlDecode(text) {
    try {
        return decodeURIComponent(text);
    } catch {
        return '❌ Invalid URL encoding';
    }
}

// 23. Hex Encode
function hexEncode(text) {
    return Array.from(text).map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join(' ');
}

// 24. Hex Decode
function hexDecode(hex) {
    try {
        return hex.split(' ').map(h => String.fromCharCode(parseInt(h, 16))).join('');
    } catch {
        return '❌ Invalid hex string';
    }
}

// 25. Binary Encode
function binaryEncode(text) {
    return Array.from(text).map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
}

// 26. Binary Decode
function binaryDecode(binary) {
    try {
        return binary.split(' ').map(b => String.fromCharCode(parseInt(b, 2))).join('');
    } catch {
        return '❌ Invalid binary string';
    }
}

// 27. HTML Entity Encode
function htmlEncode(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 28. HTML Entity Decode
function htmlDecode(text) {
    const div = document.createElement('div');
    div.innerHTML = text;
    return div.textContent;
}

// 29. JWT Decode (without verification)
function jwtDecode(token) {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) return '❌ Invalid JWT';
        const payload = JSON.parse(atob(parts[1]));
        return JSON.stringify(payload, null, 2);
    } catch {
        return '❌ Invalid JWT format';
    }
}
