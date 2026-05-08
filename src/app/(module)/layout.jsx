import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";

export default function DashboardLayout({ children }) {
    return (
        <div className="min-h-screen bg-background">
            <Sidebar />
            <div className="ml-60">
                <Header />
                {/* ── Page content — offset by header height ──────── */}
                <main className="mt-16 p-6 min-h-[calc(100vh-4rem)]">
                    {children}
                </main>

            </div>
        </div>
    );
}