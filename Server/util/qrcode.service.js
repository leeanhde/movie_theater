const QRCode = require("qrcode");

const generateQRCode = async (text) => {
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(text);
    return qrCodeDataUrl;
  } catch (err) {
    throw err;
  }
};
module.exports = { generateQRCode };
