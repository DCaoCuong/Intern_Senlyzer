import { headers } from 'next/headers';

export default async function TestHeadersPage() {
    const requestHeaders = await headers();
    const userAgent = requestHeaders.get('user-agent');
    const acceptLanguage = requestHeaders.get('accept-language');
    const customHeader = requestHeaders.get('x-custom-test-header');

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif', lineHeight: '1.6' }}>
            <h1>Custom Header Test Page</h1>
            <p>
                This page demonstrates how to access incoming HTTP headers in a Next.js App Router component.
                Below are some headers received with your request:
            </p>

            <h2>Received Headers:</h2>
            <ul>
                <li><strong>User-Agent:</strong> {userAgent || 'N/A'}</li>
                <li><strong>Accept-Language:</strong> {acceptLanguage || 'N/A'}</li>
                <li><strong>X-Custom-Test-Header:</strong> {customHeader || 'N/A (Try adding this header!)'}</li>
            </ul>

            <p>
                <strong>How to test:</strong>
            </p>
            <ol>
                <li>
                    Open your browser's developer tools (F12), go to the Network tab, and refresh this page.
                    Inspect the request for this page to see all headers sent by your browser.
                </li>
                <li>
                    Use a tool like `curl` to send a request with a custom header:
                    <pre>
                        <code>
                            curl -H "X-Custom-Test-Header: MyValue123" http://localhost:3000/test-headers
                        </code>
                    </pre>
                </li>
                <li>
                    You can also use browser extensions (e.g., "ModHeader" for Chrome) to add custom headers
                    to your browser requests and see them reflected here.
                </li>
            </ol>

            <p>
                This setup is useful for scenarios like A/B testing, internationalization, or custom authentication
                where information is passed via request headers.
            </p>
        </div>
    );
}
