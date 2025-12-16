'use client';

import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function UpgradePage() {
    const router = useRouter();

    const handleUpgrade = () => {
        Cookies.set('isPremium', 'true', { expires: 7, path: '/' });
        router.push('/premium');
    }

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Please upgrade to premium</h1>
            <button
                onClick={handleUpgrade}
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    backgroundColor: '#0070f3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginTop: '20px'
                }}
            >
                Upgrade to Premium
            </button>
        </div>
    );

}