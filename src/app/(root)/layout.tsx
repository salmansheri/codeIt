import Navbar from "@/components/navbar";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/auth");
  }
  return (
    <main className="bg-gradient-to-b from-gray-800 to-black min-h-screen text-gray-100 ">
      <Navbar currentUser={currentUser} />
      {children}
    </main>
  );
}
