// src/services/emailService.js
import Brevo from "@getbrevo/brevo";

// Instancia API
const apiInstance = new Brevo.TransactionalEmailsApi();

// Carrega API KEY
apiInstance.setApiKey(
  Brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

// Função para envio de e-mail
export async function sendEmail({ to, subject, html, text }) {
  try {
    const sendSmtpEmail = {
      sender: {
        name: process.env.BREVO_SENDER_NAME,
        email: process.env.BREVO_SENDER_EMAIL,
      },
      to: [{ email: to }],
      subject,
      htmlContent: html || "",
      textContent: text || "",
    };

    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log("Email enviado! Message ID:", result.messageId);

    return { success: true, result };
  } catch (error) {
    console.error("❌ Erro ao enviar email:", error);
    return { success: false, error };
  }
}
