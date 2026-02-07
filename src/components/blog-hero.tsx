import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function BlogHero() {
  return (
    <section className="py-4 sm:py-[18px] pb-2 sm:pb-[10px]">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-[18px]">
        <div
          className="border rounded-blog2 overflow-hidden"
          style={{
            borderColor: "var(--stroke)",
            background: "var(--card-soft)",
            boxShadow: "var(--shadow-blog)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-[1.35fr_.85fr] gap-3 sm:gap-4 p-3 sm:p-4 items-stretch">
            <div
              className="border rounded-[16px] sm:rounded-[20px] p-3 sm:p-[18px] flex flex-col justify-between min-h-[240px] sm:min-h-[260px]"
              style={{
                borderColor: "rgba(42,46,53,.10)",
                background: "rgba(255,255,255,.80)",
                boxShadow: "0 10px 20px rgba(42,46,53,.06)",
              }}
            >
              <div>
                <div
                  className="inline-flex items-center gap-1.5 sm:gap-2.5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full border font-extrabold text-[10px] sm:text-xs w-max"
                  style={{
                    borderColor: "rgba(42,46,53,.12)",
                    background: "rgba(255,255,255,.72)",
                    color: "rgba(42,46,53,.82)",
                  }}
                >
                  <span
                    className="w-[7px] h-[7px] sm:w-[9px] sm:h-[9px] rounded-full"
                    style={{ background: "rgba(63,127,114,.85)" }}
                  />
                  RE Minds
                </div>
                <h1 className="mt-2.5 sm:mt-3.5 mb-1 sm:mb-1.5 text-2xl sm:text-[34px] leading-[1.06] tracking-[-0.6px] font-bold">
                  Practical guides for{" "}
                  <span style={{ color: "var(--green)" }}>academic success</span>.
                </h1>
                <p
                  className="m-0 mb-2.5 sm:mb-3.5 font-[650] leading-[1.45] max-w-[60ch] text-sm sm:text-base"
                  style={{ color: "rgba(42,46,53,.72)" }}
                >
                  From desk rejection prevention to journal selection and
                  AI/similarity management—actionable insights to strengthen
                  your submission strategy.
                </p>
              </div>
              <div
                className="mt-2 sm:mt-3 rounded-[14px] sm:rounded-[18px] border p-2 sm:p-3"
                style={{
                  borderColor: "rgba(42,46,53,.10)",
                  background: "rgba(233,227,213,.32)",
                }}
              >
                <div
                  className="w-full bg-gradient-to-br from-[var(--sky)] to-[var(--sage-blog)] rounded-[12px] sm:rounded-[14px] p-4 sm:p-8 text-center text-sm"
                  style={{ color: "var(--muted-blog)" }}
                >
                  <p className="text-xs sm:text-sm">Blog roadmap visualization</p>
                </div>
              </div>
            </div>
            <div
              className="border rounded-[16px] sm:rounded-[20px] bg-[rgba(255,255,255,.82)] p-3 sm:p-[18px] flex flex-col"
              style={{
                borderColor: "rgba(42,46,53,.10)",
                boxShadow: "0 10px 20px rgba(42,46,53,.06)",
              }}
            >
              <h3 className="m-0 mb-2 text-base sm:text-lg">Get updates</h3>
              <ul
                className="m-0 mb-2 sm:mb-3 pl-3 sm:pl-[18px] font-[650] text-sm sm:text-base"
                style={{ color: "rgba(42,46,53,.74)" }}
              >
                <li>New guides weekly</li>
                <li>Journal selection tips</li>
                <li>Rejection prevention</li>
              </ul>
              <div className="field mt-2 sm:mt-2.5">
                <label
                  htmlFor="blog-email"
                  className="block text-[10px] sm:text-xs font-extrabold mb-1 sm:mb-1.5"
                  style={{ color: "rgba(42,46,53,.72)" }}
                >
                  Email
                </label>
                <Input
                  id="blog-email"
                  type="email"
                  placeholder="your.email@example.com"
                  className="w-full px-3 sm:px-3.5 py-2 sm:py-3 rounded-full border bg-white text-sm focus:shadow-[0_0_0_6px_rgba(63,127,114,.10)] focus:border-[rgba(63,127,114,.35)]"
                  style={{ borderColor: "rgba(42,46,53,.14)" }}
                />
                <p
                  className="mt-2 sm:mt-2.5 text-[10px] sm:text-xs font-[750]"
                  style={{ color: "rgba(42,46,53,.62)" }}
                >
                  Unsubscribe anytime · Privacy-respectful
                </p>
              </div>
              <Button
                type="button"
                className="mt-2.5 sm:mt-3.5 border-0 rounded-full px-3 sm:px-4 py-2 sm:py-3 text-white font-extrabold cursor-pointer w-full text-sm sm:text-base hover:brightness-[1.02]"
                style={{
                  background: "rgba(63,127,114,.92)",
                  boxShadow: "0 14px 22px rgba(63,127,114,.16)",
                }}
              >
                Notify me
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
