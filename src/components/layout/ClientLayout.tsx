'use client';

import MainLayout from "@/components/layout/MainLayout";
import { Toaster } from "@/components/ui/sonner";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MainLayout>{children}</MainLayout>
      <Toaster position="top-right" />
    </>
  );
} 