# Profile Avatar Rotation Setup

## How It Works

Your profile picture now automatically rotates through multiple images every 5 seconds with a smooth fade transition.

## Adding Your Images

1. **Prepare your images:**
   - Name them: `my-avatar-2.png`, `my-avatar-3.png`, etc.
   - Keep the original `my-avatar.png` as the first image
   - Recommended size: 400x400px or larger (square)
   - Format: PNG or WebP

2. **Upload to the images folder:**
   ```
   /assets/images/my-avatar.png     (existing - keep this)
   /assets/images/my-avatar-2.png   (add this)
   /assets/images/my-avatar-3.png   (add this)
   /assets/images/my-avatar-4.png   (optional)
   ```

3. **Update the script:**
   - Open `assets/js/script.js`
   - Find the `avatarImages` array at the top (lines 4-8)
   - Add more image paths:
   ```javascript
   const avatarImages = [
     './assets/images/my-avatar.png',
     './assets/images/my-avatar-2.png',
     './assets/images/my-avatar-3.png',
     './assets/images/my-avatar-4.png'  // Add as many as you want
   ];
   ```

4. **Update service worker cache:**
   - Open `sw.js`
   - Add new images to the `urlsToCache` array:
   ```javascript
   './assets/images/my-avatar-2.png',
   './assets/images/my-avatar-3.png',
   ```
   - Increment cache version (e.g., v4 → v5)

## Customization

### Change rotation speed
In `assets/js/script.js`, find line ~26:
```javascript
setInterval(rotateAvatar, 5000); // 5000ms = 5 seconds
```
Change `5000` to any milliseconds value:
- 3000 = 3 seconds (faster)
- 10000 = 10 seconds (slower)

### Change fade duration
In `assets/css/style.css`, find line ~433:
```javascript
transition: opacity 0.3s ease-in-out;
```
Change `0.3s` to adjust fade speed.

Also update the timeout in `script.js` line ~18 to match:
```javascript
setTimeout(() => {
  avatarElement.src = avatarImages[currentAvatarIndex];
  avatarElement.style.opacity = '1';
}, 300); // Must match CSS transition time in milliseconds
```

## Testing

1. Upload at least 2 images (my-avatar.png and my-avatar-2.png)
2. Update the `avatarImages` array in script.js
3. Clear browser cache or hard refresh (Ctrl+F5)
4. Watch the image rotate every 5 seconds with smooth fade

## Disable Rotation

To disable, simply keep only one image in the `avatarImages` array:
```javascript
const avatarImages = [
  './assets/images/my-avatar.png'
];
```
The script automatically detects single images and skips rotation.
