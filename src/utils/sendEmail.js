// Função para enviar e-mail de confirmação
import nodemailer from 'nodemailer';

export const sendConfirmationEmail = (email, token) => {
  // Configurar o serviço de e-mail (exemplo usando nodemailer)
  const transporter = nodemailer.createTransport({
    // Configurações de e-mail (SMTP, etc.)
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD, 
    }
  });

  // Configurar o corpo do e-mail
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Confirme seu endereço de e-mail',
    html: `
        <h1><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwf6xHhj7luWu3LjLseT56ZLKZBSuZVbo_mxd-OnHos-RQTqKTHB7ZeB-0-7Nse536FEY&usqp=CAU" alt="Logo" width="100" height="50">
        </h1>
        <p>Olá,</p>
        <p>Clique no link abaixo para confirmar seu e-mail:</p>
        <a href="${process.env.BASE_URL}/users/confirm/${token}" style="padding: 10px; background-color: #4CAF50; color: white; text-decoration: none; display: inline-block; border-radius: 5px;">Confirmar E-mail</a>
        <br>
        <img src="${process.env.BASE_URL}/images/logo.svg" alt="Logo" width="100" height="50">

      `,
  };

  // Enviar e-mail
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Erro ao enviar e-mail de confirmação:', error);
    } else {
      console.log('E-mail de confirmação enviado:', info.response);
    }
  });
}

