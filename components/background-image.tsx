import { images } from "@/data/site-content";
import { ImageFallback } from "./image-fallback";


export function BackgroundImage() {
  return (
    <div className="fixed inset-0 w-screen h-screen -z-10 pointer-events-none">
      <div className="absolute inset-0 bg-white/0 z-10"></div>
      <ImageFallback
        src={images.background || "/placeholder.svg"}
        alt="Background"
        fill
        className="object-cover"
      />
    </div>
  );
}
