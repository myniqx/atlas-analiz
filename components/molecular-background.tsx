"use client"

import { useEffect, useRef, useState } from "react"
import { siteColors } from "@/data/site-content"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  baseSpeedX: number
  baseSpeedY: number
  type: "attractor" | "repulsor" | "neutral"
  connections: number[]
  color: string
  active: boolean
}

interface MolecularBackgroundProps {
  className?: string
}

export function MolecularBackground({ className = "" }: MolecularBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>(0)
  const isInitializedRef = useRef(false)
  const lastTimeRef = useRef<number>(0)
  const frameCountRef = useRef<number>(0)

  // Colors for the particles and connections - matching the corridor image
  const colors = {
    primary: "#d4c3a3", // Warm beige (matching walls)
    accent: "#8a5a44", // Warm brown (matching marble columns)
    secondary: "#a99470", // Soft gold (complementary to the space)
    tertiary: "#e8e0d0", // Light cream (matching ceiling)
    highlight: "#c1b599", // Muted gold (matching floor shine)
  }

  // Initialize particles
  const initParticles = (width: number, height: number) => {
    const particles: Particle[] = []
    // Ensure at least 30 particles, but scale with screen size for larger screens
    const particleCount = Math.max(30, Math.min(Math.floor((width * height) / 12000), 80))

    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * 6 + 2
      const colorOptions = [colors.primary, colors.accent, colors.secondary, colors.tertiary, colors.highlight]
      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)]

      // Assign particle types - 40% attractors, 30% repulsors, 30% neutral
      const typeRandom = Math.random()
      const type = typeRandom < 0.4 ? "attractor" : typeRandom < 0.7 ? "repulsor" : "neutral"

      // Base speed ensures continuous movement - slightly reduced for better stability
      const baseSpeedX = (Math.random() - 0.5) * 0.25
      const baseSpeedY = (Math.random() - 0.5) * 0.25

      particles.push({
        x: Math.random() * (width - 20) + 10, // Keep particles away from edges initially
        y: Math.random() * (height - 20) + 10,
        size,
        speedX: baseSpeedX,
        speedY: baseSpeedY,
        baseSpeedX,
        baseSpeedY,
        type,
        connections: [],
        color,
        active: true,
      })
    }

    return particles
  }

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current
        const { width, height } = canvas.getBoundingClientRect()

        // Set canvas dimensions to match display size
        canvas.width = width
        canvas.height = height

        setDimensions({ width, height })

        // Reinitialize particles when resizing
        particlesRef.current = initParticles(width, height)
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize() // Initialize on mount

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (canvasRef.current) {
        const canvas = canvasRef.current
        const rect = canvas.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    // Set initial mouse position to center of screen
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const rect = canvas.getBoundingClientRect()
      setMousePosition({
        x: rect.width / 2,
        y: rect.height / 2,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Animation loop
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0 || dimensions.height === 0) return

    if (!isInitializedRef.current) {
      particlesRef.current = initParticles(dimensions.width, dimensions.height)
      isInitializedRef.current = true
      lastTimeRef.current = performance.now()
    }

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const animate = (timestamp: number) => {
      // Calculate delta time for smooth animation regardless of frame rate
      const deltaTime = timestamp - lastTimeRef.current
      lastTimeRef.current = timestamp
      const timeMultiplier = Math.min(deltaTime / 16.67, 3) // Normalize to ~60fps with a cap

      // Increment frame counter
      frameCountRef.current++

      ctx.clearRect(0, 0, dimensions.width, dimensions.height)

      // Skip connection updates on some frames for performance
      if (frameCountRef.current % 3 === 0) {
        // Only update connections every 3 frames to improve performance
        updateConnections()
      }

      // Draw connections first (so they appear behind particles)
      drawConnections(ctx)

      // Draw particles and update positions
      updateAndDrawParticles(ctx, timeMultiplier)

      animationRef.current = requestAnimationFrame(animate)
    }

    animate(performance.now())

    return () => {
      cancelAnimationFrame(animationRef.current)
    }
  }, [dimensions, mousePosition])

  // Update connections between particles based on proximity
  const updateConnections = () => {
    const particles = particlesRef.current

    // Clear all existing connections
    particles.forEach((particle) => {
      particle.connections = []
    })

    // Create new connections based on current positions
    for (let i = 0; i < particles.length; i++) {
      if (particles[i].type !== "attractor") continue

      for (let j = i + 1; j < particles.length; j++) {
        if (particles[j].type === "repulsor") continue

        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Increased interaction range from 100 to 150
        if (distance < 150) {
          particles[i].connections.push(j)
          particles[j].connections.push(i)
        }
      }
    }
  }

  // Draw connections between particles
  const drawConnections = (ctx: CanvasRenderingContext2D) => {
    const particles = particlesRef.current

    ctx.lineWidth = 0.5

    particles.forEach((particle, i) => {
      particle.connections.forEach((j) => {
        const connectedParticle = particles[j]

        // Calculate distance to determine opacity
        const dx = particle.x - connectedParticle.x
        const dy = particle.y - connectedParticle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 150 // Increased from 100 to 150

        if (distance < maxDistance) {
          const opacity = 1 - distance / maxDistance

          // Draw connection line
          ctx.beginPath()
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(connectedParticle.x, connectedParticle.y)

          // Use different colors based on particle types - matching corridor aesthetic
          if (particle.type === "attractor" && connectedParticle.type === "attractor") {
            ctx.strokeStyle = `rgba(169, 148, 112, ${opacity * 0.7})` // Soft gold connections
          } else {
            ctx.strokeStyle = `rgba(138, 90, 68, ${opacity * 0.5})` // Brown connections
          }

          ctx.stroke()
        }
      })
    })
  }

  // Update particle positions and draw them
  const updateAndDrawParticles = (ctx: CanvasRenderingContext2D, timeMultiplier: number) => {
    const particles = particlesRef.current

    particles.forEach((particle, index) => {
      // Draw particle
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fillStyle = particle.color
      ctx.fill()

      // Mouse interaction - create spiral/vortex effect
      const dx = mousePosition.x - particle.x
      const dy = mousePosition.y - particle.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 200) {
        // Create spiral effect by adding perpendicular force component
        const forceDirectionX = dx / distance
        const forceDirectionY = dy / distance

        // Perpendicular vector for spiral effect
        const perpX = -forceDirectionY
        const perpY = forceDirectionX

        const force = (200 - distance) / 2000
        const spiralForce = (200 - distance) / 1000

        // Combine attraction and spiral forces
        particle.speedX += forceDirectionX * force * timeMultiplier
        particle.speedY += forceDirectionY * force * timeMultiplier

        // Add perpendicular component for spiral
        particle.speedX += perpX * spiralForce * timeMultiplier
        particle.speedY += perpY * spiralForce * timeMultiplier
      }

      // Particle-to-particle interactions - increased interaction range
      particles.forEach((otherParticle, otherIndex) => {
        if (index !== otherIndex) {
          const dx = otherParticle.x - particle.x
          const dy = otherParticle.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          // Increased interaction range from 80 to 120
          if (distance < 120) {
            const forceDirectionX = dx / distance
            const forceDirectionY = dy / distance
            let force = 0

            // Attraction and repulsion based on particle types
            if (particle.type === "attractor" && otherParticle.type === "attractor") {
              // Attractors attract each other
              force = 0.025
            } else if (particle.type === "repulsor" && otherParticle.type === "repulsor") {
              // Repulsors repel each other
              force = -0.035
            } else if (particle.type === "repulsor" || otherParticle.type === "repulsor") {
              // Repulsors repel other types
              force = -0.025
            }

            // Apply force
            particle.speedX += forceDirectionX * force * timeMultiplier
            particle.speedY += forceDirectionY * force * timeMultiplier
          }
        }
      })

      // Apply friction to prevent excessive speed
      particle.speedX *= 0.97
      particle.speedY *= 0.97

      // Ensure base movement is maintained
      if (Math.abs(particle.speedX) < Math.abs(particle.baseSpeedX * 0.5)) {
        particle.speedX += particle.baseSpeedX * 0.1 * timeMultiplier
      }

      if (Math.abs(particle.speedY) < Math.abs(particle.baseSpeedY * 0.5)) {
        particle.speedY += particle.baseSpeedY * 0.1 * timeMultiplier
      }

      // Calculate next position
      const nextX = particle.x + particle.speedX * timeMultiplier
      const nextY = particle.y + particle.speedY * timeMultiplier

      // Improved edge collision detection with buffer based on particle size
      const buffer = particle.size + 2

      // Check if particle will hit an edge and bounce it properly
      if (nextX <= buffer || nextX >= dimensions.width - buffer) {
        particle.speedX *= -1
        particle.baseSpeedX *= -1
        // Position correction to prevent sticking to edges
        if (nextX <= buffer) {
          particle.x = buffer + 1
        } else {
          particle.x = dimensions.width - buffer - 1
        }
      } else {
        // Update x position if no collision
        particle.x = nextX
      }

      if (nextY <= buffer || nextY >= dimensions.height - buffer) {
        particle.speedY *= -1
        particle.baseSpeedY *= -1
        // Position correction to prevent sticking to edges
        if (nextY <= buffer) {
          particle.y = buffer + 1
        } else {
          particle.y = dimensions.height - buffer - 1
        }
      } else {
        // Update y position if no collision
        particle.y = nextY
      }
    })
  }

  return <canvas ref={canvasRef} className={`absolute inset-0 w-full h-full ${className}`} style={{ zIndex: 1 }} />
}
