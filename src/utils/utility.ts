export const formatDate = (date: string) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const base64toBlob = (base64: string) => {
  const contentType = "application/pdf";
  const bytes = atob(base64);
  let length = bytes.length;
  const out = new Uint8Array(length);
  while (length--) {
    out[length] = bytes.charCodeAt(length);
  }
  const f = new Blob([out], { type: contentType });
  return URL.createObjectURL(f);
};
