"use client"

export const YoyoVideo = ({ heroVideo }: { heroVideo: string }) => {
  return (
    <video
      className="absolute inset-0 w-full h-full object-cover z-0"
      src={heroVideo}
      autoPlay
      loop
      muted
      playsInline
    />
  )
}
