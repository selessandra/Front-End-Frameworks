import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { sendEmail } from "../services/emailService.js";

const prisma = new PrismaClient();

/* 1️⃣ - ENVIAR CÓDIGO PARA O EMAIL */
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const usuario = await prisma.usuario.findUnique({
            where: { email },
        });

        if (!usuario) {
            return res.status(404).json({ error: "Email não cadastrado." });
        }

        // Código de 6 dígitos
        const token = String(Math.floor(100000 + Math.random() * 900000));
        console.log(token)

        // Expiração (15 min)
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

        // Salva no banco
        await prisma.resetToken.create({
            data: {
                token,
                expiresAt,
                usuarioId: usuario.id_usuario,
            },
        });

        // Envia email via Brevo
        await sendEmail({
            to: email,
            subject: "Código para redefinir sua senha",
            html: `
  <div style="
      background:#1a1832;
      padding:40px;
      border-radius:20px;
      font-family:Segoe UI, Arial, sans-serif;
      color:white;
      max-width:480px;
      margin:auto;
      border:1px solid #eeeeee22;
  ">
      <h1 style="
          text-align:center;
          margin:0;
          margin-bottom:10px;
          font-size:40px;
          letter-spacing:2px;
          text-shadow:3px 3px 6px #450693;
      ">
          Veasy
      </h1>

      <p style="
          text-align:center;
          color:#cccccc;
          margin-top:0;
          margin-bottom:30px;
          font-size:18px;
      ">
          Esse código expira em 15 minutos
      </p>

      <p style="
          background:#211951;
          padding:20px;
          border-radius:16px;
          border:1px solid #eeeeee33;
          text-align:center;
          font-size:22px;
      ">
          <strong> Esse é seu codigo ${token} 🎉</strong>
      </p>

      <p style="
          text-align:center;
          margin-top:30px;
          color:#bbbbbb;
          font-size:14px;
      ">
          Caso não tenha solicitado este e-mail, basta ignorar.<br><br>
          <strong style="color:white">Veasy</strong>
      </p>
  </div>
  `,
            text: "email mandado"
        });

        return res.json({ message: "Código enviado ao email." });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Erro ao gerar código." });
    }
};


/* 2️⃣ - VERIFICAR CÓDIGO */
export const verifyCode = async (req, res) => {
    try {
        const { email, token } = req.body;

        const usuario = await prisma.usuario.findUnique({ where: { email } });
        if (!usuario) {
            return res.status(404).json({ error: "Email não cadastrado." });
        }

        const resetToken = await prisma.resetToken.findFirst({
            where: {
                usuarioId: usuario.id_usuario,
                token,
            },
        });

        if (!resetToken) {
            return res.status(400).json({ error: "Código inválido." });
        }

        if (resetToken.expiresAt < new Date()) {
            return res.status(400).json({ error: "Código expirado." });
        }

        return res.json({ message: "Código válido." });
    } catch {
        return res.status(500).json({ error: "Erro ao validar código." });
    }
};


/* 3️⃣ - RESETAR SENHA */
export const resetPassword = async (req, res) => {
    try {
        const { email, token, newPassword } = req.body;

        const usuario = await prisma.usuario.findUnique({ where: { email } });
        if (!usuario) {
            return res.status(404).json({ error: "Email não cadastrado." });
        }

        const resetToken = await prisma.resetToken.findFirst({
            where: {
                usuarioId: usuario.id_usuario,
                token,
            },
        });

    


        if (!resetToken) {
            return res.status(400).json({ error: "Código inválido." });
        }

        if (resetToken.expiresAt < new Date()) {
            return res.status(400).json({ error: "Código expirado." });
        }

        // Atualiza senha
        const hash = await bcrypt.hash(newPassword, 10);

        await prisma.usuario.update({
            where: { id_usuario: usuario.id_usuario },
            data: { senha: hash },
        });

        // Apaga token
        await prisma.resetToken.delete({
            where: { id: resetToken.id },
        });

        return res.json({ message: "Senha atualizada com sucesso!" });
    } catch {
        return res.status(500).json({ error: "Erro ao redefinir senha." });
    }
};
