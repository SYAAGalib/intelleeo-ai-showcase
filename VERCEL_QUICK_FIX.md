# 🚀 QUICK REFERENCE: Vercel + EmailJS

## The Problem
✗ EmailJS works locally  
✗ Doesn't work on Vercel  
✗ "Email service not configured" error

## The Solution
You forgot to add environment variables in Vercel!

---

## Quick Fix (5 minutes)

### 1. Get Your Keys from EmailJS
- Service ID: `service_XXXXX`
- Template ID: `template_XXXXX`  
- Public Key: `XXXXXXXXXXXXXX`

### 2. Add to Vercel
1. Go to https://vercel.com/dashboard
2. Click your project
3. Settings → Environment Variables
4. Add these 3 variables:

| Name | Your Value |
|------|------------|
| `VITE_EMAILJS_SERVICE_ID` | service_XXXXX |
| `VITE_EMAILJS_TEMPLATE_ID` | template_XXXXX |
| `VITE_EMAILJS_PUBLIC_KEY` | XXXXXXXXXXXXXX |

### 3. Redeploy
1. Deployments tab
2. Click "..." on latest deployment
3. Click "Redeploy"

### 4. Test
- Visit your site: `https://your-site.vercel.app/contact`
- Submit the form
- Check your email!

---

## Important Notes

✅ **Must start with `VITE_`** - Vite requires this prefix  
✅ **Must redeploy** - Variables don't work until you redeploy  
✅ **Check all environments** - Production + Preview + Development  
✅ **No quotes needed** - Just paste the value directly  

---

## Alternative: Hardcode (Not Recommended)

If you want to skip environment variables:

Edit `src/pages/Contact.tsx` line 73-75:

```typescript
const serviceId = 'service_abc1234';
const templateId = 'template_xyz5678';
const publicKey = 'abcXYZ123456789';
```

⚠️ Warning: This exposes keys in your public repo!

---

## Full Guides Available

- `VERCEL_DEPLOYMENT.md` - Complete deployment guide
- `VERCEL_ENV_SETUP.md` - Detailed environment variable setup
- `EMAIL_SETUP_GUIDE.md` - EmailJS setup instructions

---

**Need help?** Check the guides above! 📚
