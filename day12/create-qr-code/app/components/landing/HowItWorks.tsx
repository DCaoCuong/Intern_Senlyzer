export default function HowItWorks() {
    const steps = [
        {
            number: "01",
            title: "Select Bank",
            description: "Choose from over 40 Vietnamese banks supporting VietQR",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            ),
        },
        {
            number: "02",
            title: "Enter Information",
            description: "Fill in account number, amount, and transfer description (optional)",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            ),
        },
        {
            number: "03",
            title: "Get QR Code",
            description: "Download or share the QR code via link to receive payment",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
            ),
        },
    ];

    return (
        <section id="how-it-works" className="section bg-white">
            <div className="container mx-auto px-4">
                <h2 className="section-title text-gray-900">How It Works</h2>
                <p className="section-subtitle">
                    Just 3 simple steps to create a bank transfer QR code
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {steps.map((step, index) => (
                        <div
                            key={step.number}
                            className="relative group"
                        >
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-gray-200 to-transparent" />
                            )}

                            <div className="card text-center group-hover:border-[#F37221]/50 transition-all duration-300">
                                <div className="text-[#F37221] text-5xl font-bold opacity-20 mb-4">
                                    {step.number}
                                </div>

                                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-[#F37221]/10 flex items-center justify-center text-[#F37221] group-hover:bg-[#F37221]/20 transition-colors">
                                    {step.icon}
                                </div>

                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* API Documentation */}
                <div className="mt-20 max-w-4xl mx-auto">
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 border border-gray-200">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#F37221] to-[#d96316] rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">API Integration</h3>
                                <p className="text-gray-600 text-sm">Integrate into your system via simple URL</p>
                            </div>
                        </div>

                        <p className="text-gray-700 mb-8">
                            Integrate QR Bank into your system through simple URL API. Perfect for websites, mobile apps, or automated payment systems.
                        </p>

                        <div className="space-y-6">
                            {/* Step 1 */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F37221] to-[#d96316] flex items-center justify-center text-white font-bold flex-shrink-0">
                                        1
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-lg font-semibold text-gray-900 mb-2">Create URL with required parameters</h4>
                                        <p className="text-gray-600 text-sm mb-4">
                                            Build URL with query parameters to generate QR code. Just pass bank and account information:
                                        </p>

                                        {/* Code Example */}
                                        <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                                            <pre className="text-xs sm:text-sm font-mono">
                                                <code>
                                                    <span className="text-blue-400">const</span> <span className="text-white">qrUrl</span> = <span className="text-yellow-300">`</span><span className="text-green-300">/view-qr?</span>{'\n'}
                                                    <span className="text-green-300">  bankBin=</span><span className="text-yellow-300">{'${'}</span><span className="text-orange-300">bankBin</span><span className="text-yellow-300">{'}'}</span><span className="text-green-300">&accountNumber=</span><span className="text-yellow-300">{'${'}</span><span className="text-orange-300">accountNumber</span><span className="text-yellow-300">{'}'}</span>{'\n'}
                                                    <span className="text-green-300">  &amount=</span><span className="text-yellow-300">{'${'}</span><span className="text-orange-300">amount</span><span className="text-yellow-300">{'}'}</span><span className="text-green-300">&description=</span><span className="text-yellow-300">{'${'}</span><span className="text-orange-300">description</span><span className="text-yellow-300">{'}'}</span><span className="text-yellow-300">`</span>;
                                                </code>
                                            </pre>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F37221] to-[#d96316] flex items-center justify-center text-white font-bold flex-shrink-0">
                                        2
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-lg font-semibold text-gray-900 mb-2">Use URL in your application</h4>
                                        <p className="text-gray-600 text-sm mb-4">
                                            Integrate URL into payment button, create share link, or display QR directly:
                                        </p>

                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-xs font-semibold text-gray-500 mb-2">• Use in HTML:</p>
                                                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                                                    <code className="text-xs sm:text-sm font-mono block">
                                                        <span className="text-gray-400">&lt;!-- Payment button --&gt;</span><br />
                                                        <span className="text-blue-400">&lt;a</span> <span className="text-orange-300">href</span>=<span className="text-green-300">"/view-qr?bankBin=970415&accountNumber=..."</span><br />
                                                        &nbsp;&nbsp;&nbsp;<span className="text-orange-300">target</span>=<span className="text-green-400">"_blank"</span><span className="text-blue-400">&gt;</span><br />
                                                        <span className="text-green-400">&nbsp;&nbsp;Pay Now</span><br />
                                                        <span className="text-blue-400">&lt;/a&gt;</span>
                                                    </code>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F37221] to-[#d96316] flex items-center justify-center text-white font-bold flex-shrink-0">
                                        3
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-lg font-semibold text-gray-900 mb-2">Customer scans QR and pays</h4>
                                        <p className="text-gray-600 text-sm mb-4">
                                            QR code page will automatically display with full information. Customer just needs to scan with bank app to pay.
                                        </p>

                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                            <p className="text-sm text-blue-900 mb-2 font-medium">Complete URL example:</p>
                                            <code className="text-xs font-mono text-[#F37221] break-all">
                                                https://yoursite.com/view-qr?bankBin=970415&accountNumber=1234567890&amount=100000&description=Order#12345
                                            </code>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* URL Parameters */}
                        <div className="mt-8 bg-white rounded-2xl p-6">
                            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-[#F37221]" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                                URL Parameters:
                            </h4>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                    <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded">Required</span>
                                    <div>
                                        <p className="font-mono text-sm font-semibold text-gray-900">bankBin</p>
                                        <p className="text-xs text-gray-600">Bank identification number (BIN code of the bank)</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                    <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded">Required</span>
                                    <div>
                                        <p className="font-mono text-sm font-semibold text-gray-900">accountNumber</p>
                                        <p className="text-xs text-gray-600">Bank account number or account nickname/alias (if bank supports it)</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">Optional</span>
                                    <div>
                                        <p className="font-mono text-sm font-semibold text-gray-900">amount</p>
                                        <p className="text-xs text-gray-600">Transfer amount in VND</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">Optional</span>
                                    <div>
                                        <p className="font-mono text-sm font-semibold text-gray-900">description</p>
                                        <p className="text-xs text-gray-600">Transfer description/note</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Use Cases */}
                        <div className="mt-6 p-4 bg-gradient-to-r from-[#F37221]/5 to-purple-500/5 rounded-xl border border-[#F37221]/20">
                            <p className="text-sm font-semibold text-gray-900 mb-2">Use Cases:</p>
                            <ul className="text-sm text-gray-700 space-y-1">
                                <li className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-[#F37221]" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Automatic payment invoices
                                </li>
                                <li className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-[#F37221]" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    E-commerce checkout
                                </li>
                                <li className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-[#F37221]" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Charity donations
                                </li>
                                <li className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-[#F37221]" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Service payments
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
