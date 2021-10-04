/** Sanitizes an email address
 *
 * Returns the sanitized version of the provided email address.
 * Removes '.' characters and any substring after '+' characters.
 * Returns null if the email is not valid
 */
export default function emailSanitizer(email: string) {
  const trimmedEmail = email.trim();
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(trimmedEmail)) return null;

  const [username, domain] = trimmedEmail.split("@");
  const sanitizedUsername = username.replaceAll(".", "").split("+", 2)[0];
  return `${sanitizedUsername}@${domain}`;
}
