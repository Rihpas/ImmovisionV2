export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Par exemple : ulysse.poirot@etud.univ-jfc.fr
      pass: process.env.EMAIL_PASS, // Mot de passe d'application (ou token)
    },
  });

  const mailOptions = {
    from: email,
    to: 'ulysse.poirot@etud.univ-jfc.fr',
    subject: `Message de ${name}`,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Échec de l’envoi.' }, { status: 500 });
  }
}
