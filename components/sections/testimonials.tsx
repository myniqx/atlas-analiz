"use client";

import { useState, useEffect } from "react";
import { ImageFallback } from "@/components/image-fallback";
import { User, ChevronLeft, ChevronRight } from "lucide-react";
import { ColoredHeader } from "@/components/colored-header";
import { siteColors, testimonials } from "@/data/site-content";

export function Testimonials() {
  const content = testimonials;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and on resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Autoplay functionality
  useEffect(() => {
    if (!isAutoplay) return;

    const interval = setInterval(() => {
      setActiveIndex(
        (current) =>
          (current + 1) %
          (isMobile
            ? content.items.length
            : Math.ceil(content.items.length / 2)),
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoplay, content.items.length, isMobile]);

  // Pause autoplay on hover
  const handleMouseEnter = () => setIsAutoplay(false);
  const handleMouseLeave = () => setIsAutoplay(true);

  const goToPrevious = () => {
    setActiveIndex((current) => {
      const totalSlides = isMobile
        ? content.items.length
        : Math.ceil(content.items.length / 2);
      return (current - 1 + totalSlides) % totalSlides;
    });
  };

  const goToNext = () => {
    setActiveIndex((current) => {
      const totalSlides = isMobile
        ? content.items.length
        : Math.ceil(content.items.length / 2);
      return (current + 1) % totalSlides;
    });
  };

  // Prepare testimonials based on device
  const prepareTestimonials = () => {
    if (isMobile) {
      // For mobile, show one testimonial per slide
      return content.items.map((item, index) => (
        <div key={index} className="w-full flex-shrink-0 px-4">
          {renderTestimonial(item)}
        </div>
      ));
    } else {
      // For desktop, show two testimonials per slide
      const pairs = [];
      for (let i = 0; i < content.items.length; i += 2) {
        const pair = [content.items[i]];
        if (i + 1 < content.items.length) {
          pair.push(content.items[i + 1]);
        }
        pairs.push(pair);
      }

      return pairs.map((pair, pairIndex) => (
        <div key={pairIndex} className="w-full flex-shrink-0 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
            {pair.map((item, itemIndex) => (
              <div key={itemIndex}>{renderTestimonial(item)}</div>
            ))}
          </div>
        </div>
      ));
    }
  };

  // Render a single testimonial
  const renderTestimonial = (item: (typeof content.items)[0]) => (
    <>
      <div className="bg-white p-8 rounded-lg shadow-sm relative">
        {/* Speech bubble pointer */}
        <div className="absolute -bottom-4 left-16 w-8 h-8 bg-white transform rotate-45"></div>

        {/* Comment */}
        <p className="text-gray-700 italic mb-4">"{item.comment}"</p>
      </div>

      {/* Avatar */}
      <div className="flex items-center mt-8 ml-8 gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
          {item.avatar ? (
            <ImageFallback
              src={item.avatar || "/placeholder.svg"}
              alt={item.name}
              width={48}
              height={48}
              className="object-cover"
            />
          ) : (
            <User className="h-6 w-6 text-gray-400" />
          )}
        </div>
        <div className="flex flex-col pb-1">
          <p className="font-semibold" style={{ color: siteColors.accent }}>
            {item.name}
          </p>
          <p className="text-sm text-gray-500">
            {item.service}
          </p>
        </div>
      </div>
    </>
  );

  // Calculate total slides
  const totalSlides = isMobile
    ? content.items.length
    : Math.ceil(content.items.length / 2);

  return (
    <section
      id="testimonials"
      className="min-h-screen p-16 md:py-24 flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="container mx-auto px-4">
        <ColoredHeader h={2} className="text-3xl font-bold text-center my-12">
          {content.title}
        </ColoredHeader>

        <div className="relative max-w-4xl mx-auto">
          {/* Carousel navigation */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Testimonials carousel */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {prepareTestimonials()}
            </div>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full ${index === activeIndex ? "bg-black" : "bg-gray-300"}`}
                aria-label={`Testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
