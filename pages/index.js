import Link from 'next/link';

export default function Home() {
    return (
        <div>
            <h1>Welcome to Event Registration</h1>
            <Link href="/register">
                <button>Register for Event</button>
            </Link>
        </div>
    );
}
