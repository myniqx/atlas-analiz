"use client"

import { useState } from "react"
import Image, { type ImageProps } from "next/image"
import { ImageIcon } from "lucide-react"

type ImageFallbackProps = ImageProps & {
  fallbackClassName?: string
}

export function ImageFallback({ src, alt, fallbackClassName, className, ...props }: ImageFallbackProps) {
  const [error, setError] = useState(false)

  return error ? (
    <div
      className={`flex items-center justify-center bg-gray-100 ${fallbackClassName || className}`}
      style={{ width: props.width, height: props.height }}
    >
      <ImageIcon className="h-10 w-10 text-gray-400" />
    </div>
  ) : (
    <Image src={src || "/placeholder.svg"} alt={alt} className={className} onError={() => setError(true)} {...props} />
  )
}
