/** Returns a list of e-mails parsed from a file
 *
 * Supports `.txt` and `.csv` files. Returns null to all others.
 */
export default function parser(fileName: string, fileContent: string) {
  const fileExtension = fileName.split(".").slice(-1)[0];
  console.log(fileExtension);
  switch (fileExtension) {
    case "txt":
      return parseTxt(fileContent);
    case "csv":
      return parseCsv(fileContent);
    default:
      return null;
  }
}

function parseTxt(fileContent: string) {
  return fileContent.split("\n").map(line => line.trim());
}

function parseCsv(fileContent: string) {
  const [header, ...lines] = fileContent.split("\n").map(line => line.trim().split(","));

  const emailHeader = header.find(value => ["email", "emails", "e-mail", "e-mails"].includes(value.toLowerCase()));
  if (!emailHeader) return [];
  const emailHeaderIndex = header.indexOf(emailHeader);

  return lines.map(line => line[emailHeaderIndex]);
}
