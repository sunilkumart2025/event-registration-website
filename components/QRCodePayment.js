import { QRCodeCanvas } from "qrcode.react";

export default function QRCodePayment({ amount, upiId }) {
    const upiString = `upi://pay?pa=${upiId}&pn=SKY-Gateway&mc=&tid=&tr=&tn=Event Payment&am=${amount}&cu=INR`;
    
    return (
        <div>
            <h2>Scan & Pay</h2>
            <QRCodeCanvas value={upiString} size={256} />
            <p>Amount: ₹{amount}</p>
            <p>UPI ID: {upiId}</p>
        </div>
    );
}
