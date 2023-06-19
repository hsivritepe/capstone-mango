import Image from 'next/image';

export default function Home() {
    return (
        <>
            <div className="p-12 flex items-center flex-col gap-6 justify-center text-3xl font-bold">
                <h1>Mango</h1>
                <h2 className="text-lg">Next.js + Tailwind CSS</h2>
            </div>
        </>
    );
}
