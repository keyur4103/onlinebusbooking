import React from "react";
import "./demo.css";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

function Demo({ onPaymentSuccess }) {
  async function showRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    console.log(res);
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const data = await fetch(`${import.meta.env.VITE_LIVE_SERVER}/razorpay`, {
      method: "POST",
    }).then((t) => t.json());

    console.log(data);

    const options = {
      key: "rzp_test_aDFeGpVYi4510h",
      currency: data.currency,
      amount: data.amount.toString(),
      order_id: data.id,
      name: "booking payment",
      description: "Thank you for nothing. Please give us some money",
      handler: function (response) {
        // Call the provided callback function when payment is successful
        onPaymentSuccess();
      },
      prefill: {
        name: "keyur",
        email: "fataniyakeyur50@gmail.com",
        phone_number: "8238135039",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <>
      <div>
        <button
          className="App-link"
          onClick={showRazorpay}
          target="_blank"
          rel="noopener noreferrer"
          type="submit"
        >
          Pay now
        </button>
      </div>
    </>
  );
}

export default Demo;
