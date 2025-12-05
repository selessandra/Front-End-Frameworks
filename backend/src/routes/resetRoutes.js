import express from "express";
import crypto from "crypto";
import { sendEmail } from "../services/emailService.js";

const router = express.Router();

// Armazenamento temporário (em produção, use Redis ou banco de dados)
const resetCodes = new Map();

// Função para gerar código de 6 dígitos
function generateCode() {
  return crypto.randomInt(100000, 999999).toString();
}

// Rota para solicitar código de redefinição
router.post("/request-code", async (req, res) => {
  try {
    const { email } = req.body;

    // Validação básica
    if (!email) {
      return res.status(400).json({ error: "Email é obrigatório" });
    }

    // Verificar se o email existe no banco de dados
    // Aqui você deve adicionar a lógica para verificar se o email está cadastrado
    // Por enquanto, vamos assumir que está válido

    // Gerar código
    const code = generateCode();
    
    // Armazenar código com timestamp
    resetCodes.set(email, {
      code,
      timestamp: Date.now(),
      verified: false
    });

    // Configurar conteúdo do email
    const subject = "Seu código de recuperação - ClashHub";
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(45deg, #6a11cb 0%, #2575fc 100%); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">CLASHHUB</h1>
        </div>
        <div style="padding: 30px; background-color: #f9f9f9;">
          <h2 style="color: #333;">Recuperação de Senha</h2>
          <p style="color: #666; line-height: 1.6;">
            Você solicitou a redefinição de senha para sua conta ClashHub.
          </p>
          <div style="background-color: white; border: 2px dashed #6a11cb; padding: 20px; text-align: center; margin: 30px 0;">
            <h3 style="color: #333; margin-bottom: 10px;">Seu código de verificação:</h3>
            <div style="font-size: 32px; font-weight: bold; color: #6a11cb; letter-spacing: 5px;">
              ${code}
            </div>
            <p style="color: #999; font-size: 12px; margin-top: 10px;">
              Este código expira em 15 minutos
            </p>
          </div>
          <p style="color: #666; font-size: 14px;">
            Se você não solicitou esta redefinição, ignore este email.
          </p>
          <p style="color: #999; font-size: 12px; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
            © 2024 ClashHub. Todos os direitos reservados.
          </p>
        </div>
      </div>
    `;

    const text = `Seu código de recuperação ClashHub é: ${code}. Este código expira em 15 minutos.`;

    // Enviar email
    const result = await sendEmail({
      to: email,
      subject,
      html,
      text
    });

    if (result.success) {
      console.log(`Código ${code} enviado para ${email}`);
      
      // Remover código após 15 minutos
      setTimeout(() => {
        resetCodes.delete(email);
      }, 15 * 60 * 1000);

      res.json({ 
        success: true, 
        message: "Código enviado com sucesso!" 
      });
    } else {
      res.status(500).json({ 
        error: "Erro ao enviar email", 
        details: result.error 
      });
    }

  } catch (error) {
    console.error("Erro no servidor:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Rota para verificar código
router.post("/verify-code", (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ error: "Email e código são obrigatórios" });
    }

    const resetData = resetCodes.get(email);

    if (!resetData) {
      return res.status(404).json({ error: "Código expirado ou não encontrado" });
    }

    // Verificar se o código expirou (15 minutos)
    const now = Date.now();
    const codeAge = now - resetData.timestamp;
    const FIFTEEN_MINUTES = 15 * 60 * 1000;

    if (codeAge > FIFTEEN_MINUTES) {
      resetCodes.delete(email);
      return res.status(400).json({ error: "Código expirado" });
    }

    // Verificar se o código está correto
    if (resetData.code !== code) {
      return res.status(400).json({ error: "Código inválido" });
    }

    // Marcar como verificado
    resetData.verified = true;
    resetCodes.set(email, resetData);

    res.json({ 
      success: true, 
      message: "Código verificado com sucesso!" 
    });

  } catch (error) {
    console.error("Erro na verificação:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Rota para redefinir senha (após código verificado)
router.post("/reset-password", (req, res) => {
  try {
    const { email, newPassword, code } = req.body;

    if (!email || !newPassword || !code) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    const resetData = resetCodes.get(email);

    if (!resetData || !resetData.verified || resetData.code !== code) {
      return res.status(400).json({ error: "Código inválido ou não verificado" });
    }

    // Aqui você deve adicionar a lógica para atualizar a senha no banco de dados
    // Exemplo: await User.updatePassword(email, newPassword);

    // Remover código após uso
    resetCodes.delete(email);

    res.json({ 
      success: true, 
      message: "Senha redefinida com sucesso!" 
    });

  } catch (error) {
    console.error("Erro ao redefinir senha:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

export default router;