import Link from "next/link";
import { auth } from "@/auth";
import UserMenu from "../UserMenu";
import HeaderClient from "./HeaderClient";

export default async function Header() {
    const session = await auth();

    return (
        <HeaderClient>
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-[#F37221] to-[#d96316] rounded-lg flex items-center justify-center">
                    <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                        />
                    </svg>
                </div>
                <span className="text-xl font-bold text-gray-900">QR Bank</span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-1">
                <Link
                    href="#home"
                    className="group relative px-4 py-2 text-gray-600 hover:text-[#F37221] transition-colors text-sm font-medium flex items-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span>Home</span>
                    {/* Animated underline */}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#F37221] to-orange-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link
                    href="#how-it-works"
                    className="group relative px-4 py-2 text-gray-600 hover:text-[#F37221] transition-colors text-sm font-medium flex items-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>How it works</span>
                    {/* Animated underline */}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#F37221] to-orange-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link
                    href="#pricing"
                    className="group relative px-4 py-2 text-gray-600 hover:text-[#F37221] transition-colors text-sm font-medium flex items-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <span>Pricing</span>
                    {/* Animated underline */}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#F37221] to-orange-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
            </div>

            {/* Auth Section */}
            <div className="flex items-center gap-3">
                {session?.user ? (
                    <UserMenu user={session.user} />
                ) : (
                    <Link
                        href="/auth/signin"
                        className="btn btn-primary text-sm"
                    >
                        Sign In
                    </Link>
                )}
            </div>
        </HeaderClient>
    );
}
