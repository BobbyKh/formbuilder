import Link from "next/link";

export default function Landing() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex items-center justify-center">
        <h1 className="text-4xl font-bold absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">Forma.AI</h1>
      </div>
      <div className="flex items-center justify-center mt-12">
        <Link href="/builder" className="p-4 bg-black border-2  hover:bg-gray-500 text-white rounded-lg shadow-lg transition">Get Started</Link>
      </div>
    </div>
  );
}
