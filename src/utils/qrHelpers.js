import QRCode from 'qrcode';

export const generateQRCode = async (data) => {
    try {
      const url = await QRCode.toDataURL(data, {
        width: 120,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        },
        errorCorrectionLevel: 'M'
      });
      return url;
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };