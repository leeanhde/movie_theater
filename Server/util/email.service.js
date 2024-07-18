const nodemailer = require("nodemailer");
const { generateQRCode } = require("./qrcode.service");
const { uploadProductImageToCloudinary } = require("./cloudinary.service");
const createTransporter = () => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "lytieulong2j2@gmail.com",
      pass: "ngmm pgqt gknn ldbk",
    },
  });
  return transporter;
};

const sendEmailService = async (to, emailSubject, emailBody) => {
  const transporter = createTransporter();
  const mainOptions = {
    from: "JEWELRYSHOP",
    to: to,
    subject: emailSubject,
    text: "You received a message",
    html: emailBody,
  };
  try {
    const info = await transporter.sendMail(mainOptions);
    return info;
  } catch (error) {
    throw error;
  }
};
const orderSendEmailService = async (email, orderId) => {
  const emailSubject = "Bạn mới đặt một đơn hàng";

  // Generate QR code for the order ID
  const qrCodeUrl = await generateQRCode(orderId);
  const img_url = await uploadProductImageToCloudinary(qrCodeUrl);

  const emailBody = `
      <p>Cảm ơn bạn đã lựa chọn dịch vụ của chúng tôi.</p>
      <p>From Movie Theater with love!</p>
      <p>Here is your QR code:</p>
      <img src="${img_url}" alt="QR Code"/>
    `;
  await sendEmailService(email, emailSubject, emailBody);
};

module.exports = { orderSendEmailService };
