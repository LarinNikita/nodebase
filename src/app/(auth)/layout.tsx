import AuthLayout from "@/app/features/auth/components/AuthLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>;
}
