// export const formatDate = (date: string) => {
//   const d = new Date(date);
//   const year = d.getFullYear();
//   const month = String(d.getMonth() + 1).padStart(2, "0");
//   const day = String(d.getDate()).padStart(2, "0");
//   return `${year}-${month}-${day}`;
// };

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

export function formatDate(dateStr: string) {
  if (!dateStr) return null;

  // Split the input string into date and time parts
  const [datePart] = dateStr.split(" ");

  // Split the date part into day, month, and year
  const [day, month, year] = datePart.split("-").map(Number);

  // Map for month names
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Format the date as DD-MMM-YYYY
  return `${String(day).padStart(2, "0")}-${monthNames[month - 1]}-${year}`;
}

export function fIndianCurrency(number: number) {
  const format = number ? number : "";
  return format.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    currency: "INR",
  });
}
