import QRCode from "qrcode";

export const generateQRCode = async (data) => {
  try {
    return await QRCode.toDataURL(data, {
      width: 120,
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
      errorCorrectionLevel: "M",
    });
  } catch (error) {
    console.error("Error generating QR code:", error);
    return "";
  }
};