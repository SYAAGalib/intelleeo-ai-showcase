# Contact Form Email Setup - Quick Start

## ✅ What's Already Done

✓ EmailJS library installed (`@emailjs/browser`)
✓ Contact form integrated with EmailJS
✓ Error handling implemented
✓ Environment variables configured
✓ Loading states and success messages added

## 🚀 What You Need to Do

### Step 1: Create EmailJS Account (5 minutes)

1. Go to **https://www.emailjs.com/**
2. Click "Sign Up" (free account - 200 emails/month)
3. Verify your email address

### Step 2: Set Up Email Service (3 minutes)

1. In EmailJS dashboard, click "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail recommended):
   - Select "Gmail"
   - Click "Connect Account"
   - Sign in with your Gmail (hello@intelleeo.com or any Gmail)
   - Allow EmailJS access
4. Copy your **Service ID** (looks like: `service_abc1234`)

### Step 3: Create Email Template (5 minutes)

1. Go to "Email Templates"
2. Click "Create New Template"
3. Fill in:
   - **Template Name**: "Contact Form"
   - **Subject**: `New Contact from {{from_name}}`
   - **Content**: Copy this template:

```
Hello intelleeo Team,

You have a new contact form submission!

From: {{from_name}}
Email: {{from_email}}
Project Type: {{project_type}}

Message:
{{message}}

---
Sent from intelleeo.com
```

4. Click "Save"
5. Copy your **Template ID** (looks like: `template_xyz5678`)

### Step 4: Get Your Public Key (1 minute)

1. Go to "Account" in the sidebar
2. Click "General" tab
3. Copy your **Public Key** (looks like: `abcXYZ123456789`)

### Step 5: Add Credentials to .env File (2 minutes)

1. Open the `.env` file in your project root
2. Fill in your credentials:

```env
VITE_EMAILJS_SERVICE_ID=service_abc1234
VITE_EMAILJS_TEMPLATE_ID=template_xyz5678
VITE_EMAILJS_PUBLIC_KEY=abcXYZ123456789
```

3. Save the file

### Step 6: Restart Your Server (1 minute)

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

### Step 7: Test It! (2 minutes)

1. Go to http://localhost:8080/contact
2. Fill out the contact form:
   - Name: Test User
   - Email: test@example.com
   - Project Type: Web Application
   - Message: This is a test message
3. Click "Send Message"
4. Check your Gmail inbox - you should receive the email!

## 🎉 Done!

Your contact form is now sending real emails!

## 📧 Where Emails Will Be Sent

- **To**: The Gmail account you connected to EmailJS
- **From**: The form submitter's email
- **Reply-To**: The form submitter's email (so you can reply directly)

## 💡 Tips

- **Test mode**: If you haven't set up EmailJS yet, the form will show a friendly error message
- **Rate limiting**: Free EmailJS accounts have 200 emails/month
- **Spam protection**: EmailJS includes basic spam protection
- **Multiple recipients**: You can add CC/BCC in the EmailJS template

## 🆘 Need Help?

1. **EmailJS Documentation**: https://www.emailjs.com/docs/
2. **Video Tutorial**: Search "EmailJS React tutorial" on YouTube
3. **Support**: hello@intelleeo.com

## 🔒 Security Notes

- ✓ Your `.env` file is in `.gitignore` (credentials are safe)
- ✓ EmailJS public key is safe to expose (it's client-side)
- ✓ No backend server needed
- ✓ HTTPS recommended for production

---

**Estimated Total Time**: 15-20 minutes

Good luck! 🚀
