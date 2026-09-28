// Dev stub: logs emails. Swap the body for Resend/SMTP in Phase 4.
export async function sendEmail(to: string, subject: string, text: string) {
  console.log(`[email] to=${to} subject="${subject}"\n${text}`);
}
