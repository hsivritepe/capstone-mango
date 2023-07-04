import Image from 'next/image';

export default function HomePage() {
    return (
        <section className="flex">
            <div className="flex-1">
                <div className="flex flex-col justify-center items-center h-[93vh]">
                    <h1 className="text-5xl font-bold text-gray-800">
                        Tech Stack
                    </h1>
                    <br />
                    <h2 className="font-bold text-gray-600 leading-relaxed">
                        Frontend
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex justify-end">
                            <Image
                                src={'/img/logo-react.png'}
                                alt={`React Logo`}
                                width={25} // Adjust width and height according to your needs
                                height={25}
                                className="object-contain"
                            />
                        </div>
                        <div className="right-side text-2xl leading-normal">
                            React
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex justify-end">
                            <Image
                                src={'/img/logo-next.png'}
                                alt={`NextJS logo`}
                                width={45} // Adjust width and height according to your needs
                                height={25}
                                className="object-contain"
                            />
                        </div>
                        <div className="right-side text-2xl leading-normal">
                            Next.js 13
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex justify-end">
                            <Image
                                src={'/img/logo-tailwind.png'}
                                alt={`TailwindCSS logo`}
                                width={30} // Adjust width and height according to your needs
                                height={25}
                                className="object-contain"
                            />
                        </div>
                        <div className="right-side text-2xl leading-normal">
                            TailwindCSS
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex justify-end">
                            <Image
                                src={'/img/logo-antdesign.png'}
                                alt={`Ant Design logo`}
                                width={30} // Adjust width and height according to your needs
                                height={25}
                                className="object-contain"
                            />
                        </div>
                        <div className="right-side text-2xl leading-normal">
                            Ant Design 5.0
                        </div>
                    </div>
                    <br />
                    <h2 className="text-4xl font-bold text-gray-600 leading-relaxed">
                        Backend
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex justify-end">
                            <Image
                                src={'/img/logo-mysql.png'}
                                alt={`Node.js Logo`}
                                width={50} // Adjust width and height according to your needs
                                height={50}
                                className="object-contain"
                            />
                        </div>
                        <div className="right-side text-2xl leading-normal">
                            MySQL
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex justify-end">
                            <Image
                                src={'/img/logo-nodejs.png'}
                                alt={`Node.js Logo`}
                                width={70} // Adjust width and height according to your needs
                                height={70}
                                className="object-contain"
                            />
                        </div>
                        <div className="right-side text-2xl leading-normal">
                            Node.js
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex justify-end">
                            <Image
                                src={'/img/logo-expressjs.png'}
                                alt={`Express Logo`}
                                width={70} // Adjust width and height according to your needs
                                height={70}
                                className="object-contain"
                            />
                        </div>
                        <div className="right-side text-2xl leading-normal">
                            Express.js
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex justify-end">
                            <Image
                                src={'/img/logo-knex.png'}
                                alt={`Node.js Logo`}
                                width={25} // Adjust width and height according to your needs
                                height={25}
                                className="object-contain"
                            />
                        </div>
                        <div className="right-side text-2xl leading-normal">
                            Knex.js
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

//                     <h2 className="text-4xl font-bold text-gray-600 leading-relaxed">
//                         Backend
//                     </h2>
//                     <ul className="text-2xl text-center leading-normal">
//                         <li>Node.js</li>
//                         <li>Express.js (Built REST API)</li>
//                         <li>Knex.js (Query Builder)</li>
