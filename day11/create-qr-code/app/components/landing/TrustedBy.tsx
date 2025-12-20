export default function TrustedBy() {
    const banks = [
        "Vietcombank",
        "Viettinbank",
        "Techcombank",
        "MB Bank",
        "AC Bank",
    ];

    return (
        <section className="py-12 border-y border-gray-200 bg-gray-50">
            <div className="container mx-auto px-4">
                <p className="text-center text-sm text-gray-600 mb-8">
                    Supporting all banks in VietQR system
                </p>
                <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
                    {banks.map((bank, index) => (
                        <div
                            key={bank}
                            className="text-gray-500 hover:text-[#F37221] transition-colors duration-300 text-lg font-semibold"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {bank}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
