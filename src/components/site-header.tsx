import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="content-grid flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Lumen Press
        </Link>
        <nav className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link href="/blog" className="transition hover:text-foreground">
            Blog
          </Link>
          <Button variant="secondary" size="sm">
            Subscribe
          </Button>
        </nav>
      </div>
    </header>
  );
}
