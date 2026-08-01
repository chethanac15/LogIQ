import { useState, type ReactNode } from "react";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "./Sidebar";

interface AppLayoutProps {
  title: string;
  description: string;
  headerActions?: ReactNode;
  children: ReactNode;
}

export function AppLayout({
  title,
  description,
  headerActions,
  children,
}: AppLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <div className="flex min-h-screen flex-1 flex-col lg:pl-0">
          <Navbar
            title={title}
            description={description}
            onMenuClick={() => setIsSidebarOpen(true)}
            actions={headerActions}
          />

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
