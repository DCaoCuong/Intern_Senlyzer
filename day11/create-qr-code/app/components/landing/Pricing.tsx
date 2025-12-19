import Link from "next/link";

export default function Pricing() {
    const plans = [
        {
            name: "Starter",
            description: "For simple personal projects",
            price: "$0",
            period: "/month",
            discount: null,
            requests: "100 requests/month",
            features: [
                "100 QR generations/month",
                "Standard QR codes",
                "PNG download",
                "Community support",
            ],
            cta: "Get started",
            href: "/auth/signin",
            popular: false,
        },
        {
            name: "Pro",
            description: "Suitable for growing businesses",
            originalPrice: "$6",
            price: "$3",
            period: "/month",
            discount: "50% OFF",
            requests: "1,000 requests/month",
            features: [
                "1,000 QR generations/month",
                "Custom branded QR codes",
                "PNG & SVG formats",
                "Priority support",
                "API access",
            ],
            cta: "Get started",
            href: "/checkout",
            popular: true,
        },
        {
            name: "Business",
            description: "For professional businesses",
            originalPrice: "$40",
            price: "$19",
            period: "/month",
            discount: "50% OFF",
            requests: "10,000 requests/month",
            features: [
                "10,000 QR generations/month",
                "All Pro features",
                "Analytics & tracking",
                "White-label options",
                "Dedicated support",
            ],
            cta: "Get started",
            href: "/checkout",
            popular: false,
        },
        {
            name: "Enterprise",
            description: "Dedicated support and infrastructure",
            originalPrice: null,
            price: "Contact us",
            period: "",
            discount: null,
            requests: "Unlimited requests",
            features: [
                "Unlimited QR generations",
                "Custom integrations",
                "SLA guarantee",
                "Dedicated account manager",
                "Custom billing",
            ],
            cta: "Contact sales",
            href: "#",
            popular: false,
        },
    ];

    return (
        <section id="pricing" className="section bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="section-title text-gray-900">Flexible Pricing</h2>
                <p className="section-subtitle">
                    Choose the plan that fits your needs
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mt-12">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`relative bg-white rounded-2xl p-6 transition-all duration-300 flex flex-col h-full ${plan.popular
                                ? "border-2 border-[#F37221] shadow-xl scale-105"
                                : "border border-gray-200 hover:border-gray-300 hover:shadow-lg"
                                }`}
                        >
                            {/* Popular Badge */}
                            {plan.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                    <div className="bg-[#F37221] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                                        Most Popular
                                    </div>
                                </div>
                            )}

                            {/* Icon */}
                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${plan.popular
                                ? "bg-orange-100"
                                : "bg-gray-100"
                                }`}>
                                {plan.name === "Starter" && (
                                    <svg className="w-7 h-7 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                )}
                                {plan.name === "Pro" && (
                                    <svg className="w-7 h-7 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                )}
                                {plan.name === "Business" && (
                                    <svg className="w-7 h-7 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                                    </svg>
                                )}
                                {plan.name === "Enterprise" && (
                                    <svg className="w-7 h-7 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </div>

                            {/* Plan Name */}
                            <h3 className="text-2xl font-bold text-gray-900 mb-1">
                                {plan.name}
                            </h3>
                            <p className="text-sm text-gray-500 mb-4">
                                {plan.description}
                            </p>

                            {/* Price */}
                            <div className="mb-6">
                                {plan.originalPrice && (
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-sm text-gray-400 line-through">
                                            {plan.originalPrice}
                                        </span>
                                        {plan.discount && (
                                            <span className="px-2 py-0.5 bg-orange-100 text-[#F37221] text-xs font-bold rounded">
                                                {plan.discount}
                                            </span>
                                        )}
                                    </div>
                                )}
                                <div className="flex items-baseline gap-1">
                                    <span className={`text-4xl font-bold ${plan.popular ? "text-[#F37221]" : "text-gray-900"
                                        }`}>
                                        {plan.price}
                                    </span>
                                    {plan.period && (
                                        <span className="text-gray-500 text-sm">
                                            {plan.period}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Requests */}
                            <div className="mb-6 p-3 bg-gray-50 rounded-lg">
                                <p className="text-sm font-semibold text-gray-900">
                                    {plan.requests}
                                </p>
                            </div>

                            {/* Features */}
                            <ul className="space-y-3 mb-6 flex-grow">
                                {plan.features.map((feature) => (
                                    <li
                                        key={feature}
                                        className="flex items-start gap-2 text-sm text-gray-600"
                                    >
                                        <svg
                                            className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Button */}
                            <Link
                                href={plan.href}
                                className={`w-full inline-block text-center py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${plan.popular
                                    ? "bg-[#F37221] hover:bg-[#d96316] text-white shadow-lg hover:shadow-xl"
                                    : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                                    }`}
                            >
                                {plan.cta}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
