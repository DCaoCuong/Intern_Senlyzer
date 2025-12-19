export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-gray-200 bg-gray-50">
            <div className="container mx-auto px-10 py-6">
                <div className="flex items-center justify-center">
                    <p className="text-sm text-gray-600">
                        © {currentYear} QR Bank - DCC.
                    </p>
                </div>
            </div>
        </footer>
    );
}
