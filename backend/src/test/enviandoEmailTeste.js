// src/test/enviandoEmailTeste.js
import "dotenv/config";
import { sendEmail } from "../services/emailService.js";

async function runTest() {
  console.log("\nIniciando teste de envio de e-mail (Veasy)...\n");

  const htmlTemplate = `
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
          Teste de envio de e-mail
      </p>

      <p style="
          background:#211951;
          padding:20px;
          border-radius:16px;
          border:1px solid #eeeeee33;
          text-align:center;
          font-size:22px;
      ">
          <strong>Seu e-mail de teste chegou com sucesso! 🎉</strong>
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
  `;

  const resposta = await sendEmail({
    to: "musicastop90@gmail.com",
    subject: "📩 Teste de Email - Veasy",
    html: htmlTemplate,
    text: "Seu e-mail de teste do Veasy chegou!"
  });

  console.log("Resultado do envio:\n");
  console.dir(resposta, { depth: null });

  console.log("\nTeste finalizado.\n");
}

runTest();
