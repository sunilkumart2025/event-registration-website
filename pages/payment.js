import QRCodePayment from '../components/QRCodePayment';

export default function Payment() {
    return (
        <div>
            <h1>Event Registration Payment</h1>
            <QRCodePayment amount="499" upiId="your-upi-id@upi" />
        </div>
    );
}
