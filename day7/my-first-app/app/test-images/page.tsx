import Image from 'next/image'

export default function TestImages() {
    return (
        <div>
            <h1>External Images Test</h1>

            <Image
                src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0"
                alt="Test"
                width={800}
                height={600}
                priority
            />

            <Image
                src="https://picsum.photos/800/600"
                alt="Random"
                width={800}
                height={600}
            />
        </div>
    )
}