export default function exportFile(fileName: string, fileContent: string) {
  // Generates the file as Blob
  const file = new Blob([fileContent], { type: "text/plain" });

  // Adds the file as href of an anchor element
  const element = document.createElement("a");
  element.href = URL.createObjectURL(file);
  element.download = fileName;

  // Appends to document.body and triggers the download
  document.body.appendChild(element);
  element.click();

  // Clean-up
  element.remove();
}
