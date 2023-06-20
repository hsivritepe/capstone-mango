import Link from 'next/link';

export default function Dashboard() {
    return (
        <>
            <div className="p-6">
                <h1>Dashboard</h1>
                <Link href="/mango/homes">Homes</Link>
            </div>
        </>
    );
}
