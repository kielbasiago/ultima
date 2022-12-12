export function downloadByteArray(fileName: string, bytes: Uint8Array) {
  var blob = new Blob([bytes], { type: "application/pdf" });
  var link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
}
