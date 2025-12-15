import QRForm from "./components/QRForm";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black p-4">
      <main className="flex w-full flex-col items-center justify-start max-w-5xl">
        <div className="text-center mb-10 mt-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-4">
            Tạo QR Code
          </h1>
        </div>
        <QRForm />
      </main>
    </div>
  );
}
