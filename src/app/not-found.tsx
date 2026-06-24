import Link from "next/link";
import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FFFDF2] flex items-center justify-center px-4">
      <div className="text-center flex flex-col items-center gap-6 max-w-md">
        {/* Big 404 */}
        <div
          style={{ boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)" }}
          className="border-4 border-black rounded-2xl bg-[#FF6B6B] px-10 py-6"
        >
          <p className="font-black text-8xl leading-none">404</p>
        </div>

        <div>
          <h1 className="font-black text-3xl uppercase">Halaman Hilang!</h1>
          <p className="font-semibold text-gray-600 mt-2">
            Macam mana halaman ini boleh hilang? Mungkin detektif kena selesaikan misi dulu! 🕵️
          </p>
        </div>

        <div className="flex gap-3">
          <Link href="/">
            <Button variant="primary" size="lg">Balik ke Rumah 🏠</Button>
          </Link>
          <Link href="/play">
            <Button variant="mint" size="lg">Main Sekarang 🎮</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
