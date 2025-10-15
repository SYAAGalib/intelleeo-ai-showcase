# 🔧 How to Add Environment Variables in Vercel

## Method 1: During Initial Deployment (Easiest)

When you first deploy your project on Vercel:

1. Connect your GitHub repo
2. Before clicking "Deploy", scroll down
3. Find "Environment Variables" section
4. Add your variables:

```
Key: VITE_EMAILJS_SERVICE_ID
Value: service_abc1234
[Add] button

Key: VITE_EMAILJS_TEMPLATE_ID  
Value: template_xyz5678
[Add] button

Key: VITE_EMAILJS_PUBLIC_KEY
Value: abcXYZ123456789
[Add] button
```

5. Click "Deploy"

---

## Method 2: After Deployment (Most Common Issue)

If you already deployed and EmailJS isn't working:

### Step-by-Step:

1. **Go to Vercel Dashboard**
   - URL: https://vercel.com/dashboard
   - Login if needed

2. **Select Your Project**
   - Click on "intelleeo-ai-showcase" (or your project name)

3. **Open Settings**
   - Click "Settings" tab at the top

4. **Navigate to Environment Variables**
   - Click "Environment Variables" in the left sidebar menu

5. **Add Each Variable**
   
   **Variable 1:**
   - Key: `VITE_EMAILJS_SERVICE_ID`
   - Value: (paste your EmailJS Service ID)
   - Environments: Check all ✅ Production ✅ Preview ✅ Development
   - Click "Save"

   **Variable 2:**
   - Key: `VITE_EMAILJS_TEMPLATE_ID`
   - Value: (paste your EmailJS Template ID)
   - Environments: Check all ✅ Production ✅ Preview ✅ Development
   - Click "Save"

   **Variable 3:**
   - Key: `VITE_EMAILJS_PUBLIC_KEY`
   - Value: (paste your EmailJS Public Key)
   - Environments: Check all ✅ Production ✅ Preview ✅ Development
   - Click "Save"

6. **Redeploy Your Site**
   - Go to "Deployments" tab
   - Find your latest deployment
   - Click the "..." (three dots) menu
   - Click "Redeploy"
   - Click "Redeploy" again to confirm

7. **Wait for Deployment**
   - Usually takes 30 seconds to 2 minutes
   - Watch the logs to ensure it completes successfully

8. **Test It!**
   - Visit your site: `https://your-site.vercel.app/contact`
   - Fill out the contact form
   - Submit
   - Check your email inbox

---

## Method 3: Using Vercel CLI (For Developers)

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Navigate to your project folder
cd /home/syaagalib/intelleeo-ai-showcase-main

# Link to your Vercel project (one-time)
vercel link

# Add environment variables
vercel env add VITE_EMAILJS_SERVICE_ID production
# When prompted, paste your Service ID and press Enter

vercel env add VITE_EMAILJS_TEMPLATE_ID production
# When prompted, paste your Template ID and press Enter

vercel env add VITE_EMAILJS_PUBLIC_KEY production
# When prompted, paste your Public Key and press Enter

# Deploy to production
vercel --prod
```

---

## Common Mistakes ❌

### 1. Wrong Variable Names
❌ `EMAILJS_SERVICE_ID`
✅ `VITE_EMAILJS_SERVICE_ID`

**Important:** Must start with `VITE_` for Vite projects!

### 2. Forgot to Redeploy
- Adding variables doesn't automatically update the live site
- You MUST redeploy after adding environment variables

### 3. Wrong Environment Selected
- Make sure to check "Production" when adding variables
- Or check all three: Production, Preview, Development

### 4. Typos in Values
- Double-check your Service ID, Template ID, and Public Key
- Copy directly from EmailJS dashboard to avoid typos

---

## How to Get Your EmailJS Credentials

### Service ID:
1. Go to https://dashboard.emailjs.com/admin/services
2. Click on your email service
3. Copy the "Service ID" (e.g., `service_abc1234`)

### Template ID:
1. Go to https://dashboard.emailjs.com/admin/templates
2. Click on your template
3. Copy the "Template ID" (e.g., `template_xyz5678`)

### Public Key:
1. Go to https://dashboard.emailjs.com/admin/account
2. Look for "Public Key" section
3. Copy your public key (e.g., `abcXYZ123456789`)

---

## Verification Checklist ✅

After adding environment variables:

- [ ] All 3 variables added to Vercel
- [ ] Variable names start with `VITE_`
- [ ] Variable names match exactly (case-sensitive)
- [ ] Values are correct (no extra spaces)
- [ ] "Production" environment is selected
- [ ] Site has been redeployed
- [ ] Waited for deployment to complete (check status)
- [ ] Tested contact form on live site
- [ ] Received email successfully

---

## Still Not Working?

### Check Vercel Build Logs:
1. Go to Deployments tab
2. Click on your latest deployment
3. Check the "Building" logs
4. Look for any errors related to environment variables

### Check Browser Console:
1. Open your live site
2. Press F12 (Developer Tools)
3. Go to Console tab
4. Try submitting the form
5. Look for any error messages

### Check EmailJS Dashboard:
1. Go to https://dashboard.emailjs.com/admin/logs
2. Check if emails are being sent
3. Check for any error logs

---

## Pro Tip: Preview Deployments

Vercel creates preview deployments for each commit/PR. To test environment variables in preview:

1. Make sure variables are added to "Preview" environment too
2. Push a new commit
3. Vercel will create a preview deployment
4. Test on the preview URL

---

## Need More Help?

- **Vercel Support**: https://vercel.com/support
- **EmailJS Support**: https://www.emailjs.com/docs/
- **Check This Video**: Search "Vercel environment variables tutorial" on YouTube

---

**Remember:** Environment variables = secrets that shouldn't be in your code! 🔐
