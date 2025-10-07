# Email Integration Setup Guide

Your contact form is now configured to send real emails! Here are the setup instructions for different email services:

## Option 1: EmailJS (Recommended - Easy Setup) ⭐

EmailJS allows you to send emails directly from the browser without a backend server.

### Setup Steps:

1. **Create an EmailJS Account**
   - Go to [https://www.emailjs.com/](https://www.emailjs.com/)
   - Sign up for a free account (up to 200 emails/month)

2. **Create an Email Service**
   - In the EmailJS dashboard, go to "Email Services"
   - Click "Add New Service"
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow the authentication steps
   - Note your **Service ID**

3. **Create an Email Template**
   - Go to "Email Templates"
   - Click "Create New Template"
   - Use this template structure:

   ```
   Subject: New Contact Form Submission from {{from_name}}

   You have received a new message from your website!

   Name: {{from_name}}
   Email: {{from_email}}
   Project Type: {{project_type}}

   Message:
   {{message}}

   ---
   This message was sent from intelleeo.com contact form
   ```

   - Template variables to use:
     * `{{from_name}}` - Sender's name
     * `{{from_email}}` - Sender's email
     * `{{project_type}}` - Project type selected
     * `{{message}}` - Message content
     * `{{to_email}}` - Your email (hello@intelleeo.com)

   - Note your **Template ID**

4. **Get Your Public Key**
   - Go to "Account" → "General"
   - Copy your **Public Key**

5. **Configure Environment Variables**
   - Create a `.env` file in your project root:

   ```env
   VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
   VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
   VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
   ```

   - Replace the values with your actual EmailJS credentials

6. **Test the Contact Form**
   - Restart your development server: `npm run dev`
   - Fill out the contact form and submit
   - Check your email for the message!

### EmailJS Pricing:
- **Free**: 200 emails/month
- **Personal**: $7/month for 1,000 emails
- **Business**: $15/month for 5,000 emails

---

## Option 2: Resend (Modern API)

Resend offers a modern email API with great deliverability.

### Setup Steps:

1. **Create a Resend Account**
   - Go to [https://resend.com](https://resend.com)
   - Sign up for free (3,000 emails/month)

2. **Get API Key**
   - Go to API Keys in your dashboard
   - Create a new API key
   - Copy the key

3. **Add to Environment Variables**
   ```env
   VITE_RESEND_API_KEY=re_xxxxxxxxxxxxx
   ```

4. **Update Contact.tsx** (I can provide this code if you choose Resend)

### Resend Pricing:
- **Free**: 3,000 emails/month
- **Pro**: $20/month for 50,000 emails

---

## Option 3: Custom Backend (Full Control)

For more control, you can create a backend API endpoint.

### Quick Setup with Express.js:

1. Create a simple backend server:
   ```bash
   mkdir backend
   cd backend
   npm init -y
   npm install express nodemailer cors dotenv
   ```

2. Create `server.js`:
   ```javascript
   const express = require('express');
   const nodemailer = require('nodemailer');
   const cors = require('cors');
   require('dotenv').config();

   const app = express();
   app.use(cors());
   app.use(express.json());

   app.post('/api/contact', async (req, res) => {
     const { name, email, projectType, message } = req.body;

     const transporter = nodemailer.createTransport({
       service: 'gmail',
       auth: {
         user: process.env.EMAIL_USER,
         pass: process.env.EMAIL_PASSWORD
       }
     });

     const mailOptions = {
       from: email,
       to: 'hello@intelleeo.com',
       subject: `New Contact Form Submission from ${name}`,
       html: `
         <h2>New Contact Form Submission</h2>
         <p><strong>Name:</strong> ${name}</p>
         <p><strong>Email:</strong> ${email}</p>
         <p><strong>Project Type:</strong> ${projectType}</p>
         <p><strong>Message:</strong></p>
         <p>${message}</p>
       `
     };

     try {
       await transporter.sendMail(mailOptions);
       res.json({ success: true });
     } catch (error) {
       res.status(500).json({ success: false, error: error.message });
     }
   });

   app.listen(3000, () => console.log('Server running on port 3000'));
   ```

3. Update your frontend to call this API endpoint

---

## Recommended Approach

**For Quick Deployment:** Use **EmailJS** (Option 1)
- No backend needed
- Easy setup
- Works immediately
- Perfect for portfolios and small websites

**For Production:** Use **Resend** (Option 2) or **Custom Backend** (Option 3)
- Better deliverability
- More control
- Professional setup

---

## Testing

After setup, test your contact form:

1. Fill out all fields
2. Click "Send Message"
3. Check your email inbox
4. Verify the email contains all the form data

---

## Troubleshooting

### "Email service not configured" error
- Make sure you created the `.env` file
- Verify all three environment variables are set
- Restart your development server

### Emails not arriving
- Check your spam folder
- Verify your EmailJS template is activated
- Check the EmailJS dashboard for delivery status

### CORS errors (with custom backend)
- Make sure your backend has CORS enabled
- Add your frontend URL to allowed origins

---

## Current Configuration

The contact form is already integrated with EmailJS. You just need to:

1. Create an EmailJS account
2. Set up a service and template
3. Add credentials to `.env` file
4. Restart the dev server

That's it! Your contact form will start sending real emails. 📧

---

## Support

If you need help setting this up, feel free to:
- Check EmailJS documentation: https://www.emailjs.com/docs/
- Contact me for assistance
- Use the fallback email: hello@intelleeo.com
