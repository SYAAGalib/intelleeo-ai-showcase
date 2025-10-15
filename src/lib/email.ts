import emailjs from '@emailjs/browser';

// Initialize EmailJS once at startup using inline constants (like your other project)
// Note: EmailJS public key is safe to expose on the client; service and template IDs are not secrets.
const serviceId: string = 'service_ykjqhwx';
const templateId: string = 'template_jimyz9p';
const publicKey: string = 'oFWfmVYrfd9GxkZzB';

export function initEmail() {
  try {
    emailjs.init({ publicKey });
  } catch (e) {
    // Safe to ignore double-inits
    console.debug('EmailJS init notice:', e);
  }
}

export async function sendContactEmail(params: {
  name: string;
  email: string;
  phone?: string;
  project_type?: string;
  message: string;
}) {
  if (!serviceId || !templateId || !publicKey) {
    throw new Error('EmailJS is not configured correctly.');
  }

  // Align with your template variable names
  const templateParams: Record<string, string> = {
    from_name: params.name,
    from_email: params.email,
    message: params.message,
    project_type: params.project_type || 'Not specified',
  };

  if (params.phone) templateParams.phone = params.phone;
  templateParams.name = params.name;
  templateParams.time = new Date().toLocaleString();

  return emailjs.send(serviceId, templateId, templateParams);
}

export { emailjs };
