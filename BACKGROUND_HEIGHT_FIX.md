# 🔧 Background Height Fix - iOS

## ❌ Masalah: Background Bawah Putih/Terang

**Symptom:**
- Background **atas** (hero) terlihat bagus ✅
- Background **bawah** (menu section) jadi putih/terang ❌
- Terjadi di **semua halaman**
- Terjadi di **iOS**

**Penyebab:**
- `body::before` dan `body::after` hanya cover `100vh` (viewport pertama)
- Tidak extend ke seluruh halaman saat scroll
- `height: 100%` tidak bekerja karena body height tidak full

---

## ✅ Solusi: Dynamic Height dengan JavaScript

### 1. CSS Variable
Tambah variable `--body-height` di `:root`:
```css
:root {
    --body-height: 100vh; /* Default, will be updated by JS */
}
```

### 2. Update Pseudo-Elements
Gunakan variable untuk height:
```css
body::before,
body::after {
    height: var(--body-height); /* Use JS-calculated height */
    min-height: 100vh;
}
```

### 3. JavaScript Function
Hitung dan update height secara dinamis:
```javascript
function fixBackgroundHeight() {
    const bodyHeight = document.body.scrollHeight;
    document.documentElement.style.setProperty('--body-height', `${bodyHeight}px`);
}

// Run on load and resize
window.addEventListener('load', fixBackgroundHeight);
window.addEventListener('resize', fixBackgroundHeight);
```

---

## 📄 File yang Diupdate:

1. ✅ `style.css` - CSS variable & pseudo-elements
2. ✅ `assets/js/main.js` - Dynamic height function

---

## 🧪 Testing:

### Before Fix:
- ✅ Background atas terlihat
- ❌ Background bawah putih/terang
- ❌ Tidak konsisten

### After Fix:
- ✅ Background atas terlihat
- ✅ Background bawah terlihat
- ✅ Konsisten di seluruh halaman
- ✅ Extend sampai footer

---

## 📱 Cara Test:

1. **Buka di iOS**
2. **Scroll ke bawah**
3. **Check**: Background tetap terlihat sampai bawah?
4. **Check**: Tidak ada area putih/terang?

---

## ✅ Expected Result:

- Background gradient **terlihat** dari atas sampai bawah
- **Tidak ada** area putih/terang
- **Konsisten** di semua halaman
- **Smooth** saat scroll

---

**Deploy file yang sudah diupdate ke Netlify untuk test!** 🚀
