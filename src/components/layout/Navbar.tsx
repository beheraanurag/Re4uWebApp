"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services", hasDropdown: true },
  { href: "/blog", label: "RE Minds" },
  { href: "/case-studies", label: "Case stories" },
  { href: "/contact", label: "Contact" },
];

const servicesSubItems = [
  { href: "/services", label: "All Services" },
  { href: "/services/editing-support", label: "Editing Support" },
  { href: "/services/data-services", label: "Data Services" },
  { href: "/services/research-planning", label: "Research Planning" },
  { href: "/services/presentations", label: "Presentations" },
];

export function Navbar() {
  const pathname = usePathname();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollAnimation = () => {
      const maxScroll = container.scrollWidth - container.clientWidth;
      if (maxScroll > 0) {
        setTimeout(() => {
          container.scrollTo({ left: maxScroll, behavior: "smooth" });
        }, 2000);
        setTimeout(() => {
          container.scrollTo({ left: 0, behavior: "smooth" });
        }, 4000);
      }
    };
    const timer = setTimeout(scrollAnimation, 1000);
    const interval = setInterval(scrollAnimation, 8000);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <header className="sticky top-0 z-20">
      <div className="border-b border-[rgba(209,213,219,0.8)] bg-[#f9fafb] text-[0.78rem] text-[#6b7280]">
        <div className="mx-auto max-w-[1180px] px-4 sm:px-6">
          <div className="flex h-auto flex-wrap items-center justify-between gap-3 py-2 sm:h-10 sm:gap-6 sm:py-0">
            <div className="flex flex-wrap gap-1 text-[0.7rem] sm:gap-1.5 sm:text-[0.78rem]">
              <span className="whitespace-nowrap">Trusted by 4051+ researchers</span>
              <span className="before:mx-1 before:content-['·'] sm:before:mx-1.5 whitespace-nowrap">200+ accepted papers</span>
              <span className="before:mx-1 before:content-['·'] sm:before:mx-1.5 whitespace-nowrap">95% satisfaction</span>
            </div>
            <div className="flex flex-wrap gap-2 text-[0.7rem] sm:gap-5 sm:text-[0.78rem]">
              <span className="hidden whitespace-nowrap sm:inline">Mon–Sat: 10:00–19:00 IST</span>
              <span className="before:mx-1 before:content-['·'] sm:before:mx-1.5 hidden whitespace-nowrap sm:inline">Email: support@researchedit4u.in</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200/90 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.07)]">
        <div className="mx-auto max-w-[1180px] px-4 sm:px-6">
          <div className="flex h-[70px] items-center justify-between gap-3 md:gap-5">
            <Link href="/" className="flex min-w-0 flex-shrink-0 items-center gap-2.5 md:gap-3">
              <div className="flex h-[40px] w-[40px] flex-shrink-0 items-center justify-center overflow-hidden rounded-[10px] border border-slate-300/60 bg-gradient-to-br from-blue-50 to-white md:h-[42px] md:w-[42px]">
                <div className="flex flex-col items-center justify-center">
                  <div className="flex items-center gap-0.5">
                    <span className="text-base font-bold text-[#0b3c71] md:text-lg">R</span>
                    <span className="relative">
                      <span className="text-base font-bold text-[#0b3c71] md:text-lg">E</span>
                    </span>
                  </div>
                  <div className="mt-0.5 text-[6px] leading-tight text-[#0b3c71]">
                    <div>Research</div>
                    <div>Edit4U</div>
                  </div>
                </div>
              </div>
              <div className="hidden min-w-0 flex-col sm:block">
                <span className="text-[0.95rem] font-semibold leading-tight text-[#111827] whitespace-nowrap md:text-[1.05rem]">ResearchEdit4U Solution</span>
                <span className="hidden text-[0.75rem] leading-tight text-[#6b7280] lg:block md:text-[0.8rem]">Research paper editing & publication support</span>
              </div>
            </Link>

            <nav className="hidden flex-1 justify-center text-[0.9rem] text-[#6b7280] xl:flex max-w-2xl items-center gap-5 lg:gap-6">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.hasDropdown && pathname?.startsWith(item.href));

                if (item.hasDropdown) {
                  return (
                    <DropdownMenu key={item.href}>
                      <DropdownMenuTrigger asChild>
                        <button
                          className={`relative inline-flex whitespace-nowrap items-center gap-1 pb-0.5 transition-colors ${
                            isActive
                              ? "font-semibold text-[#111827]"
                              : "hover:text-[#111827]"
                          }`}
                        >
                          {item.label}
                          <ChevronDown className="w-3 h-3" />
                          {isActive && (
                            <span className="absolute -bottom-1 left-0 h-0.5 w-[18px] rounded-full bg-[#1d4ed8]" />
                          )}
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="min-w-[200px]">
                        {servicesSubItems.map((subItem) => (
                          <DropdownMenuItem key={subItem.href} asChild>
                            <Link
                              href={subItem.href}
                              className={`w-full ${pathname === subItem.href ? "bg-slate-100 font-semibold" : ""}`}
                            >
                              {subItem.label}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative whitespace-nowrap pb-0.5 transition-colors ${
                      isActive
                        ? "font-semibold text-[#111827]"
                        : "hover:text-[#111827]"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 h-0.5 w-[18px] rounded-full bg-[#1d4ed8]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="flex flex-shrink-0 items-center gap-1.5 md:gap-2">
              <Button
                variant="outline"
                size="icon"
                aria-label="Open search"
                className="hidden h-8 w-8 rounded-full border-slate-300/80 bg-[#f9fafb] hover:bg-slate-100 sm:flex md:h-9 md:w-9"
              >
                <Search className="h-4 w-4 text-slate-600" />
              </Button>

              <div
                ref={scrollContainerRef}
                className="-mx-4 flex flex-1 min-w-0 max-w-[calc(100vw-120px)] snap-x snap-mandatory scroll-smooth items-center gap-2 overflow-x-auto px-4 md:hidden"
                style={{ scrollbarWidth: "none" }}
              >
                <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>
                <div className="flex items-center gap-2.5">
                  <Button
                    asChild
                    variant="outline"
                    className="flex-shrink-0 snap-start rounded-lg border-green-600/50 bg-[#f0fdf4] px-3 py-1.5 text-[0.75rem] font-semibold text-[#166534] hover:bg-green-50 whitespace-nowrap"
                  >
                    <Link href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                      WhatsApp Support
                    </Link>
                  </Button>
                  <Button
                    asChild
                    className="flex-shrink-0 snap-start rounded-lg bg-[#1d4ed8] px-3 py-1.5 text-[0.75rem] font-semibold text-white shadow-[0_10px_24px_rgba(37,99,235,0.35)] hover:shadow-[0_14px_32px_rgba(37,99,235,0.45)] whitespace-nowrap"
                  >
                    <Link href="/contact">Book 1:1 Expert Call</Link>
                  </Button>
                </div>
              </div>

              <div className="hidden items-center gap-2 md:flex">
                <Button
                  asChild
                  variant="outline"
                  className="rounded-lg border-green-600/50 bg-[#f0fdf4] px-4 py-2 text-[0.8rem] font-semibold text-[#166534] hover:bg-green-50 whitespace-nowrap"
                >
                  <Link href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                    WhatsApp Support
                  </Link>
                </Button>
                <Button
                  asChild
                  className="rounded-lg bg-[#1d4ed8] px-4 py-2 text-[0.8rem] font-semibold text-white shadow-[0_10px_24px_rgba(37,99,235,0.35)] hover:shadow-lg hover:shadow-[0_14px_32px_rgba(37,99,235,0.45)] whitespace-nowrap"
                >
                  <Link href="/contact">Book 1:1 Expert Call</Link>
                </Button>
              </div>

              <div className="xl:hidden">
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Toggle menu"
                      className="h-9 w-9 flex-shrink-0"
                    >
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-72">
                    <div className="mt-6 flex flex-col gap-4">
                      {navItems.map((item) => (
                        <div key={item.href}>
                          <SheetClose asChild>
                            <Link
                              href={item.href}
                              className={`block text-base font-medium ${
                                pathname === item.href
                                  ? "font-semibold text-[#111827]"
                                  : "text-slate-700"
                              }`}
                            >
                              {item.label}
                            </Link>
                          </SheetClose>
                          {item.hasDropdown && (
                            <div className="ml-4 mt-2 flex flex-col gap-2">
                              {servicesSubItems.map((subItem) => (
                                <SheetClose key={subItem.href} asChild>
                                  <Link
                                    href={subItem.href}
                                    className={`text-sm ${
                                      pathname === subItem.href ||
                                      (subItem.href === "/services" &&
                                        pathname.startsWith("/services") &&
                                        !pathname.includes("/services/"))
                                        ? "font-semibold text-[#111827]"
                                        : "text-slate-600"
                                    }`}
                                  >
                                    {subItem.label}
                                  </Link>
                                </SheetClose>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
