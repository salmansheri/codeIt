import AuthModal from "@/components/modal/auth-modal";
import Navbar from "@/components/navbar";
import { ModalProvider } from "@/components/providers/modal-provider";

export default function authLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-gradient-to-b from-gray-600 to-black h-screen relative">
      <div className="max-w-7xl mx-auto">
        <Navbar />
        <ModalProvider />
        {children}
      </div>
    </section>
  );
}
