'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform login logic here
        // console.log(`Email: ${email}`);
        // console.log(`Password: ${password}`);
        router.push('/mango/dashboard');
    };

    return (
        <div className="flex items-center justify-center h-screen flex-col">
            <div className="p-12 flex items-center flex-col gap-6 justify-center text-3xl font-bold">
                <Image
                    src="/img/mango-logo-transparent.png"
                    alt="Mango Logo"
                    width={200}
                    height={200}
                />
                <h2 className="text-lg">Next.js + Tailwind CSS</h2>
            </div>
            <form className="w-full max-w-sm" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-lg font-medium text-gray-700"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-blue-500"
                        // value={email}
                        value="admin@example.com"
                        onChange={handleEmailChange}
                    />
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-lg font-medium text-gray-700"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-blue-500"
                        // value={password}
                        value="asdG345#@gD1"
                        onChange={handlePasswordChange}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="px-4 py-2 text-lg font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
