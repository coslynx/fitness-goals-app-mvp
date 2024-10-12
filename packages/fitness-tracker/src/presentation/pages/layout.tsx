"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useStore } from "@/presentation/hooks/useStore";
import Header from "@/presentation/components/organisms/Header";
import Sidebar from "@/presentation/components/organisms/Sidebar";
import Footer from "@/presentation/components/organisms/Footer";

/**
 * @file packages/fitness-tracker/src/presentation/pages/layout.tsx
 * @description The main layout component for all pages in the application.
 * @author CosLynxAI
 */
export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const { goals, workouts } = useStore();

  return (
    <div className="flex h-screen">
      {/* Sidebar component, only shown on larger screens (above md breakpoint) */}
      <Sidebar className="hidden md:block w-64 bg-gray-800 text-white" />
      {/* Main content area */}
      <main className="flex flex-col flex-1 bg-gray-100 overflow-auto">
        {/* Header component */}
        <Header />
        {/* Main content area */}
        <div className="p-4 flex flex-1 flex-col">
          {children}
        </div>
        {/* Footer component */}
        <Footer className="mt-auto" />
      </main>
    </div>
  );
}