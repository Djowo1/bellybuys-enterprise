import emailjs from '@emailjs/browser';
import { createOrder } from './firebase';

export async function sendOrderEmail(formData) {
  try {
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      service: formData.service,
      event_date: formData.eventDate || 'Not specified',
      message: formData.message,
      to_email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL
    };

    const response = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      templateParams,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    );

    if (response.status === 200) {
      // Create order in database
      const orderData = {
        customerName: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        message: formData.message,
        eventDate: formData.eventDate || null
      };
      
      await createOrder(orderData);

      // Prepare WhatsApp message
      const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace('+', '');
      const whatsappMsg = `Hi BellyBuys! I've sent an order request.\n\nName: ${formData.name}\nService: ${formData.service}\n\nLooking forward to hearing from you!`;
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;
      
      // Redirect after 3 seconds
      setTimeout(() => {
        window.location.href = whatsappUrl;
      }, 3000);

      return { success: true };
    }

    return { success: false, error: 'Failed to send email' };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error: error.message };
  }
}

export async function sendContactEmail(formData) {
  try {
    const response = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject || 'New Contact Form Submission',
        message: formData.message,
        to_email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL
      },
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    );

    return { success: response.status === 200 };
  } catch (error) {
    console.error('Contact email error:', error);
    return { success: false, error: error.message };
  }
}