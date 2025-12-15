async function verifyGetProducts() {
    try {
        const response = await fetch('http://localhost:3000/api/products');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('GET /api/products Result:', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Verification failed:', error);
        console.log('Note: Make sure your Next.js server is running on http://localhost:3000');
    }
}

verifyGetProducts();

async function verifyPostProducts() {
    try {
        const response = await fetch('http://localhost:3000/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: 'Product 1',
                price: '100',
                category: 'Category 1',
            }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('POST /api/products Result:', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Verification failed:', error);
        console.log('Note: Make sure your Next.js server is running on http://localhost:3000');
    }
}

verifyPostProducts();

async function verifyDeleteProducts() {
    try {
        const response = await fetch('http://localhost:3000/api/products/1', {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('DELETE /api/products Result:', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Verification failed:', error);
        console.log('Note: Make sure your Next.js server is running on http://localhost:3000');
    }
}

verifyDeleteProducts();