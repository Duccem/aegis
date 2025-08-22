import { Button } from "@/contexts/shared/ui/components/shadcn/button";
import { ChevronRight, CirclePlay } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HeroHeader } from "./header";

export default function HeroSection() {
  return (
    <>
      <HeroHeader />
      <main className="overflow-hidden h-screen">
        <section className="bg-linear-to-b to-muted from-background h-full">
          <div className="relative py-36">
            <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
              <div className="md:w-1/2">
                <div>
                  <h1 className="max-w-md text-balance text-5xl font-medium md:text-6xl">
                    Simple and powerful AI tools for your team
                  </h1>
                  <p className="text-muted-foreground my-8 max-w-2xl text-balance text-xl">
                    AI ERP is a comprehensive platform designed to streamline your business
                    operations with advanced AI capabilities, making it easier to manage tasks,
                    analyze data, and enhance productivity.
                  </p>

                  <div className="flex items-center gap-3">
                    <Button asChild size="lg" className="pr-4.5">
                      <Link href="#link">
                        <span className="text-nowrap">Get Started</span>
                        <ChevronRight className="opacity-50" />
                      </Link>
                    </Button>
                    <Button key={2} asChild size="lg" variant="outline" className="pl-5">
                      <Link href="#link">
                        <CirclePlay className="fill-primary/25 stroke-primary" />
                        <span className="text-nowrap">Watch video</span>
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="mt-10">
                  <p className="text-muted-foreground">Trusted by teams at :</p>
                  <div className="mt-6 grid max-w-sm grid-cols-3 gap-6">
                    <div className="flex h-16">
                      <img className="object-contain" src="/images/github.png" alt="Column Logo" />
                    </div>
                    <div className="flex h-16">
                      <img className="object-contain" src="/images/nvidia.png" alt="Nvidia Logo" />
                    </div>
                    <div className="flex h-16">
                      <img className="object-contain" src="/images/asus.png" alt="Nvidia Logo" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="perspective-near mt-24 translate-x-12 md:absolute md:-right-6 md:bottom-16 md:left-1/2 md:top-40 md:mt-0 md:translate-x-0">
              <div className="before:border-foreground/5 before:bg-foreground/5 relative h-full before:absolute before:-inset-x-4 before:bottom-7 before:top-0 before:skew-x-6  before:border">
                <div className="bg-background  shadow-foreground/10 ring-foreground/5 relative h-full -translate-y-12 skew-x-6 overflow-hidden border border-transparent shadow-md ring-1">
                  <Image
                    src="/images/hero.png"
                    alt="app screen"
                    width="2880"
                    height="1842"
                    className="object-top-left size-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
