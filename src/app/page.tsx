"use client";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Moon, Sun } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function HomePage() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  const isDark = theme === "dark";
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <header className="w-full px-6 md:px-12 py-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2 text-xl font-semibold">
          <Image src="/docuflow.png" alt="DocuFlow" height={50} width={100} />
        </div>
        <nav className="flex items-center gap-4">
          <LoginLink>
            <Button
              variant="default"
              className="bg-blue-500 hover:bg-blue-600 cursor-pointer"
            >
              Sign In
            </Button>
          </LoginLink>
          <div className="flex items-center justify-center gap-2">
            <Sun className="h-5 w-5" />
            <Switch
              checked={isDark}
              onCheckedChange={(checked) =>
                setTheme(checked ? "dark" : "light")
              }
            />
            <Moon className="h-5 w-5" />
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-grow flex items-center justify-center px-6 md:px-12">
        <div className="max-w-5xl mx-auto text-center py-24">
          <motion.div
            className="flex flex-col md:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight md:mb-6">
              Welcome to
            </h1>
            <Image
              src="/docuflow.png"
              alt="DocuFlow"
              height={0}
              width={350}
              className="mb-5 md:mb-0"
            />
          </motion.div>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Visualize, draw, and document your ideas in one powerful workspace.
            Save when you're ready — your flow, your control.
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <RegisterLink>
              <Button size="lg" variant="secondary">
                First time here?
              </Button>
            </RegisterLink>

            <Button size="lg" onClick={() => router.push("/dashboard")}>
              Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full px-6 md:px-12 py-6 border-t text-sm text-muted-foreground flex items-center justify-between">
        <span>
          © {new Date().getFullYear()} DocuFlow. All rights reserved.
        </span>
        <div className="flex gap-4">
          <Link href="#">Privacy</Link>
          <Link href="#">Terms</Link>
          <a
            href="https://github.com/ashkankhan786/DocuFlow"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
