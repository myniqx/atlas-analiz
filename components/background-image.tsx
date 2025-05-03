import { ImageFallback } from "./image-fallback"

interface BackgroundImageProps {
  src: string
}

export function BackgroundImage({ src }: BackgroundImageProps) {
  return (
    <div className="fixed inset-0 w-screen h-screen -z-10 pointer-events-none">
      <div className="absolute inset-0 bg-white/70 z-10"></div>
      <ImageFallback src={src || "/placeholder.svg"} alt="Background" fill className="object-cover opacity-30" />
    </div>
  )
}
