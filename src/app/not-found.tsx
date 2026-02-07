import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="py-16 md:py-24">
      <div className="container flex flex-col items-start gap-4 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold">Page not found</h1>
        <p className="text-slate-600">
          The page you are looking for does not exist.
        </p>
        <Button asChild>
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </section>
  );
}
