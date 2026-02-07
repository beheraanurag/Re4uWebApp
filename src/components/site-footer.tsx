export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="content-grid flex flex-col gap-4 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Lumen Press. All rights reserved.</p>
        <p>Powered by Next.js, Directus, and shadcn/ui.</p>
      </div>
    </footer>
  );
}
