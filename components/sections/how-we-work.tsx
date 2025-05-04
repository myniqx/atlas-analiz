import { ColoredHeader } from "@/components/colored-header";
import { howWeWork } from "@/data/site-content";
import { Search, Shield, Zap, Users } from "lucide-react";

export function HowWeWork() {
  const content = howWeWork;
  // Array of icons to use for steps
  const icons = [
    <Search key={0} className="h-8 w-8 text-black" />,
    <Shield key={1} className="h-8 w-8 text-black" />,
    <Zap key={2} className="h-8 w-8 text-black" />,
    <Users key={3} className="h-8 w-8 text-black" />,
  ];

  return (
    <section
      id="how-we-work"
      className="min-h-screen flex items-center justify-center"
    >
      <div className="container mx-auto px-4">
        <ColoredHeader h={2} className="text-3xl font-bold text-center mb-16">
          {content.title}
        </ColoredHeader>

        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          {content.steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center max-w-xs"
            >
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                {icons[index % icons.length]}
              </div>
              <ColoredHeader h={3} className="text-lg font-semibold mb-2">
                {step.title}
              </ColoredHeader>
              <p className="text-gray-600 text-sm">{step.description}</p>

              {index < content.steps.length - 1 && (
                <div className="hidden md:block h-0.5 w-16 bg-gray-300 absolute left-[calc(50%+4rem)] top-1/2 transform -translate-y-1/2"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
