# 🚀 Deploy to Vercel with EmailJS

## Quick Deploy Steps

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### Step 2: Deploy on Vercel

1. Go to **https://vercel.com/**
2. Click **"Add New Project"**
3. Import your GitHub repository: `SYAAGalib/intelleeo-ai-showcase`
4. **IMPORTANT**: Before clicking "Deploy", configure environment variables!

### Step 3: Add Environment Variables in Vercel

In the Vercel deployment page, scroll down to **"Environment Variables"** section:

Add these 3 variables:

| Name | Value |
|------|-------|
| `VITE_EMAILJS_SERVICE_ID` | Your Service ID (e.g., `service_abc1234`) |
| `VITE_EMAILJS_TEMPLATE_ID` | Your Template ID (e.g., `template_xyz5678`) |
| `VITE_EMAILJS_PUBLIC_KEY` | Your Public Key (e.g., `abcXYZ123456789`) |

**How to add them:**
1. Enter `VITE_EMAILJS_SERVICE_ID` in the "Key" field
2. Enter your actual Service ID in the "Value" field
3. Click "Add"
4. Repeat for the other two variables

### Step 4: Deploy

Click **"Deploy"** button and wait for deployment to complete (usually 1-2 minutes)


## If You Already Deployed Without Environment Variables

### Option A: Add Environment Variables in Vercel Dashboard

1. Go to your project on Vercel: https://vercel.com/dashboard
2. Click on your project: **intelleeo-ai-showcase**
3. Go to **"Settings"** tab
4. Click **"Environment Variables"** in the left sidebar
5. Add the 3 variables:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
6. Click **"Save"**
7. Go to **"Deployments"** tab
8. Click the **"⋮"** menu on the latest deployment
9. Click **"Redeploy"**

### Option B: Use Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link to your project
vercel link

# Add environment variables
vercel env add VITE_EMAILJS_SERVICE_ID
# (paste your Service ID and press Enter)

vercel env add VITE_EMAILJS_TEMPLATE_ID
# (paste your Template ID and press Enter)

vercel env add VITE_EMAILJS_PUBLIC_KEY
# (paste your Public Key and press Enter)

# Redeploy
vercel --prod
```


## Verify It Works

1. Visit your Vercel deployment URL (e.g., `https://your-site.vercel.app`)
2. Go to `/contact` page
3. Fill out the form
4. Submit
5. Check your email inbox!


## Troubleshooting

### Issue: "Email service not configured" error on Vercel

**Solution:**

### Issue: Environment variables not showing up

**Solution:**

### Issue: CORS errors

**Solution:**

### Issue: Test works locally but not on Vercel

**Checklist:**
1. ✅ Environment variables added in Vercel dashboard
2. ✅ Variable names match exactly (including `VITE_` prefix)
3. ✅ Redeployed after adding variables
4. ✅ No typos in the values
5. ✅ EmailJS account is active


## Alternative: Hardcode Keys (Not Recommended)

If you want to avoid environment variables entirely (NOT SECURE for public repos):

1. Open `src/pages/Contact.tsx`
2. Replace lines 73-75:

```typescript
// Replace this:
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// With this:
const serviceId = 'service_abc1234';     // Your actual Service ID
const templateId = 'template_xyz5678';   // Your actual Template ID
const publicKey = 'abcXYZ123456789';     // Your actual Public Key
```

3. Commit and push
4. Vercel will auto-deploy

⚠️ **Warning:** This exposes your keys in your public GitHub repo!


## Environment Variables Cheat Sheet

### Local Development (.env file):
```env
VITE_EMAILJS_SERVICE_ID=service_abc1234
VITE_EMAILJS_TEMPLATE_ID=template_xyz5678
VITE_EMAILJS_PUBLIC_KEY=abcXYZ123456789
```

### Vercel Dashboard:


## Quick Deploy Command

```bash
# One-line deploy (if Vercel CLI is installed)
vercel --prod
```


## Need Help?

1. **Vercel Docs**: https://vercel.com/docs/concepts/projects/environment-variables
2. **EmailJS Docs**: https://www.emailjs.com/docs/
3. **Check Vercel Logs**: https://vercel.com/dashboard → Your Project → Deployments → Click deployment → View logs


**Your site will be live at:** `https://your-project-name.vercel.app` 🎉
