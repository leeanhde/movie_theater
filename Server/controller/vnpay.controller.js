const crypto = require('crypto');
const querystring = require('querystring');

const vnp_TmnCode = 'YOUR_VNPAY_TMN_CODE'; // Thay YOUR_VNPAY_TMN_CODE bằng mã TMN Code thực tế
const vnp_HashSecret = 'YOUR_VNPAY_HASH_SECRET'; // Thay YOUR_VNPAY_HASH_SECRET bằng mã Hash Secret thực tế
const vnp_Url = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
const vnp_ReturnUrl = 'http://localhost:3000/payment-return';

const createPaymentUrl = (req, res) => {
    const { amount, orderInfo } = req.body;

    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = vnp_TmnCode;
    vnp_Params['vnp_Locale'] = 'vn';
    vnp_Params['vnp_CurrCode'] = 'VND';
    vnp_Params['vnp_TxnRef'] = Date.now().toString();  // Unique transaction reference
    vnp_Params['vnp_OrderInfo'] = orderInfo || 'Order Info';  // Default orderInfo nếu không có
    vnp_Params['vnp_OrderType'] = 'other';
    vnp_Params['vnp_Amount'] = (amount).toString();  // Amount in VND (convert to string)
    vnp_Params['vnp_ReturnUrl'] = vnp_ReturnUrl;
    vnp_Params['vnp_IpAddr'] = req.ip;
    vnp_Params['vnp_CreateDate'] = new Date().toISOString().replace(/T/, '').replace(/\..+/, '');

    vnp_Params = sortObject(vnp_Params);

    const signData = vnp_HashSecret + querystring.stringify(vnp_Params, { encode: false });
    const secureHash = crypto.createHmac('sha512', vnp_HashSecret).update(signData).digest('hex');

    vnp_Params['vnp_SecureHash'] = secureHash;
    const vnpUrl = vnp_Url + '?' + querystring.stringify(vnp_Params, { encode: false });

    res.json({ vnpUrl });
};

function sortObject(obj) {
    const sorted = {};
    Object.keys(obj).sort().forEach(key => {
        sorted[key] = obj[key];
    });
    return sorted;
}

const paymentReturn = (req, res) => {
    let vnp_Params = req.query;
    let secureHash = vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);
    const signData = vnp_HashSecret + querystring.stringify(vnp_Params, { encode: false });
    const checkSum = crypto.createHmac('sha512', vnp_HashSecret).update(signData).digest('hex');

    if (secureHash === checkSum) {
        res.json({ RspCode: '00', Message: 'Success' });
    } else {
        res.json({ RspCode: '97', Message: 'Fail checksum' });
    }
};

module.exports = {
    createPaymentUrl,
    paymentReturn
};
