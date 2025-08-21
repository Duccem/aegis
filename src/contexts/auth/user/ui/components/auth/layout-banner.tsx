import { Logo } from "@/components/shared/logo";

export interface Testimonial {
  avatarSrc: string;
  name: string;
  handle: string;
  text: string;
}
const sampleTestimonials: Testimonial[] = [
  {
    avatarSrc: "https://randomuser.me/api/portraits/women/57.jpg",
    name: "Sarah Chen",
    handle: "@sarahdigital",
    text: "Amazing platform! The user experience is seamless and the features are exactly what I needed.",
  },
  {
    avatarSrc: "https://randomuser.me/api/portraits/men/64.jpg",
    name: "Marcus Johnson",
    handle: "@marcustech",
    text: "This service has transformed how I work. Clean design, powerful features, and excellent support.",
  },
  {
    avatarSrc: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "David Martinez",
    handle: "@davidcreates",
    text: "I've tried many platforms, but this one stands out. Intuitive, reliable, and genuinely helpful for productivity.",
  },
];
const LayoutBanner = () => {
  return (
    <div className="animate-slide-right delay-300 absolute inset-4  bg-cover bg-center bg-card">
      <div className="flex items-center justify-end  space-x-2 p-4">
        <Logo className="size-16" />
        <p className="text-2xl">Aegis</p>
      </div>
      {sampleTestimonials.length > 0 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 px-8 w-full justify-center">
          <TestimonialCard testimonial={sampleTestimonials[0]} delay="delay-1000" />
          {sampleTestimonials[1] && (
            <div className="hidden xl:flex">
              <TestimonialCard testimonial={sampleTestimonials[1]} delay="delay-1200" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LayoutBanner;

const TestimonialCard = ({ testimonial, delay }: { testimonial: Testimonial; delay: string }) => (
  <div
    className={`animate-testimonial ${delay} flex items-start gap-3  bg-card/40 dark:bg-zinc-800/40 backdrop-blur-xl border border-white/10 p-5 w-full`}
  >
    <img src={testimonial.avatarSrc} className="h-10 w-10 object-cover rounded-2xl" alt="avatar" />
    <div className="text-sm leading-snug">
      <p className="flex items-center gap-1 font-medium">{testimonial.name}</p>
      <p className="text-muted-foreground">{testimonial.handle}</p>
      <p className="mt-1 text-foreground/80">{testimonial.text}</p>
    </div>
  </div>
);
