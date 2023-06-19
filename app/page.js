import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
    return (
        <>
            <div className="p-12 flex items-center flex-col gap-6 justify-center text-3xl font-bold">
                <h1>Mango</h1>
                <h2 className="text-lg">Next.js + Tailwind CSS</h2>
            </div>
            <div className="flex justify-center items-center">
                <Link href="/mango/dashboard">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Dashboard
                    </button>
                </Link>
            </div>
        </>
    );
}
