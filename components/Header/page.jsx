import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
    return (
        <>
            <div className="navbar justify-between bg-white border-b-4">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label
                            tabIndex={0}
                            className="btn btn-ghost lg:hidden"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            <li>
                                <Link
                                    href="/mango/dashboard"
                                    className="font-medium text-base"
                                >
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/mango/homes"
                                    className="font-medium text-base"
                                >
                                    Homes
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/mango/bookings"
                                    className="font-medium text-base"
                                >
                                    Bookings
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/mango/contacts"
                                    className="font-medium text-base"
                                >
                                    Contacts
                                </Link>
                            </li>
                            {/* <li>
                                <a>Parent</a>
                                <ul className="p-2">
                                    <li>
                                        <a>Submenu 1</a>
                                    </li>
                                    <li>
                                        <a>Submenu 2</a>
                                    </li>
                                </ul>
                            </li> */}
                        </ul>
                    </div>
                    <Link
                        href="/"
                        className="btn btn-ghost normal-case text-xl font-medium text-base"
                    >
                        <Image
                            src="/img/mango-logo-transparent.png"
                            alt="Landscape picture"
                            width={120}
                            height={120}
                        />
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <Link
                                href="/mango/dashboard"
                                className="font-medium text-base"
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/mango/homes"
                                className="font-medium text-base"
                            >
                                Homes
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/mango/bookings"
                                className="font-medium text-base"
                            >
                                Bookings
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/mango/contacts"
                                className="font-medium text-base"
                            >
                                Contacts
                            </Link>
                        </li>
                        {/* <li tabIndex={0}>
                            <details>
                                <summary>Parent</summary>
                                <ul className="p-2">
                                    <li>
                                        <a>Submenu 1</a>
                                    </li>
                                    <li>
                                        <a>Submenu 2</a>
                                    </li>
                                </ul>
                            </details>
                        </li> */}
                    </ul>
                </div>
            </div>
        </>
    );
}
