'use server';

import { Resend } from 'resend';

type Values = {
  firstName: string;
  lastName: string;
  email: string;
  socialMedia: string;
  bio: string;
};

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (values: Values) => {
  // if any of the values are empty, return early
  if (Object.values(values).some((value) => !value)) {
    throw new Error('All fields are required');
  }

  // trim all of the values
  const trimmedValues = Object.fromEntries(
    Object.entries(values).map(([key, value]) => [key, value.trim()])
  );

  try {
    await resend.emails.send({
      from: 'AthleteTurned <onboarding@resend.dev>',
      to: ['obi.j.obialo@gmail.com'],
      subject: 'hello world',
      text: JSON.stringify(trimmedValues, null, 2),
    });
    return { success: 'Email sent successfully!' };
  } catch (error) {
    console.log(error);
    return { error: 'An error occurred while sending the email' };
  }
};
