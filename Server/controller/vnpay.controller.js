const crypto = require('crypto');
const querystring = require('qs');
// const vnp_TmnCode = '7IP7E1UP'; // Thay YOUR_VNPAY_TMN_CODE bằng mã TMN Code thực tế
// const vnp_HashSecret = 'ZDDRRVYIDEIUHLSNOWVVTGWBJCFOUZYJ'; // Thay YOUR_VNPAY_HASH_SECRET bằng mã Hash Secret thực tế
// const vnp_Url = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
// const vnp_ReturnUrl = 'http://localhost:3000/payment-return';
const BookingController = require('../controller/booking.controller'); 
const { orderSendEmailService } = require('../util/email.service');
const createPaymentUrl = async (req, res) => {
    var ipAddr =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  var tmnCode = "7IP7E1UP";
  var secretKey = "ZDDRRVYIDEIUHLSNOWVVTGWBJCFOUZYJ";
  var vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
  var returnUrl = "http://localhost:9999/api/vnpay/payment_return";
  const dateFormat = await import('dateformat').then(module => module.default);
  var date = new Date();
  var createDate = dateFormat(date, "yyyymmddHHmmss");
  var orderId =  req.body.orderId;
  console.log("🚀 ~ createPaymentUrl ~ orderId:", orderId)
  var amount = req.body.amount;
  var bankCode = "VNBANK";

  const randomId = Math.floor(Math.random() * 10000); 
    const orderInfo = `Order #${randomId}`;
  var orderType = "billpayment";
  var locale = "vn";
  if (locale === null || locale === "") {
    locale = "vn";
  }
  var currCode = "VND";
  var vnp_Params = {};
  vnp_Params["vnp_Version"] = "2.1.0";
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_TmnCode"] = tmnCode;
  // vnp_Params['vnp_Merchant'] = ''
  vnp_Params["vnp_Locale"] = locale;
  vnp_Params["vnp_CurrCode"] = currCode;
  vnp_Params["vnp_TxnRef"] = orderId;
  vnp_Params["vnp_OrderInfo"] = orderInfo;
  vnp_Params["vnp_OrderType"] = orderType;
  vnp_Params["vnp_Amount"] = amount * 100;
  vnp_Params["vnp_ReturnUrl"] = returnUrl;
  vnp_Params["vnp_IpAddr"] = ipAddr;
  vnp_Params["vnp_CreateDate"] = createDate;
  if (bankCode !== null && bankCode !== "") {
    vnp_Params["vnp_BankCode"] = bankCode;
  }

  vnp_Params = sortObject(vnp_Params);

  var signData = querystring.stringify(vnp_Params, { encode: false });
  var hmac = crypto.createHmac("sha512", secretKey);
  var signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
  vnp_Params["vnp_SecureHash"] = signed;
  vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });
  console.log("🚀 ~ vnpUrl:", vnpUrl)

  res.json({vnpUrl});
};

function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        str.push(encodeURIComponent(key));
      }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
      sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
  }

const paymentReturn = async (req, res) => {
  let vnp_Params = req.query;

  let secureHash = vnp_Params["vnp_SecureHash"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  vnp_Params = sortObject(vnp_Params);

  let tmnCode = "7IP7E1UP";
  let secretKey = "ZDDRRVYIDEIUHLSNOWVVTGWBJCFOUZYJ";

  let signData = querystring.stringify(vnp_Params, { encode: false });
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");

  if (secureHash === signed) {
    const booked = await BookingController.updateBooking(vnp_Params.vnp_TxnRef, {isPaid : true})
    const email = booked.userId.email;
    console.log("🚀 ~ paymentReturn ~ email:", email)
   await orderSendEmailService(email,vnp_Params.vnp_TxnRef);
    res.redirect("http://localhost:3000/yourticket");
  } else {
  }
};

module.exports = {
    createPaymentUrl,
    paymentReturn
};
