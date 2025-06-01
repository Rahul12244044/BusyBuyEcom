import nodemailer from "nodemailer";

export const sendOrderConfirmationEmail = async (userEmail, orderDetails) => {
    console.log("userEmail: "+userEmail);
    console.log("orderinfooooooooooooooooooooooooooooooooooooooo");
    console.log("orderDetails: "+orderDetails);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "rahuljajoria2412@gmail.com",
      pass: "opazryfiqsuqtbnk", // Use app password if using Gmail
    },
  });

  const mailOptions = {
    from: "rahuljajoria2412@gmail.com",
    to: userEmail,
    subject: "Your Order Confirmation",
    html: `
      <h2>Thank you for your purchase!</h2>
      <p>Delivery take about 5 to 6 days.</p>
      <p>Name: ${orderDetails.nameUser}</p>
      <p>PhoneNo: ${orderDetails.userPhoneNumber}</p>
      <p>Address: ${orderDetails.userAddress}</p>
      <p><strong>Total Price:</strong> ₹${orderDetails.totalPrice}/-</p>
      <p><strong>Items:</strong></p>
      <ul>
        ${orderDetails.items.map((item) => `<li>${item.elm.name} - ₹${item.elm.price}</li>`).join("")}
      </ul>
    `,
  };
  try{
  await transporter.sendMail(mailOptions);
  }catch(err){
    console.log("emailErorr");
    console.log(err);
  }
};

