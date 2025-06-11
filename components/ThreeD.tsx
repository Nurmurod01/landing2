"use client"

import { useEffect, useRef, useState } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
  life: number
  maxLife: number
}

interface Connection {
  x1: number
  y1: number
  x2: number
  y2: number
  opacity: number
}

export default function ParticleAIVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const particlesRef = useRef<Particle[]>([])
  const connectionsRef = useRef<Connection[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Canvas o'lchamini sozlash
    const resizeCanvas = () => {
      const container = canvas.parentElement
      if (container) {
        canvas.width = container.clientWidth || 500
        canvas.height = container.clientHeight || window.innerHeight
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const getCenterX = () => canvas.width / 2
    const getCenterY = () => canvas.height / 2

    // Zarralarni yaratish
    const createParticles = () => {
      particlesRef.current = []
      for (let i = 0; i < 100; i++) {
        const angle = Math.random() * Math.PI * 2
        const radius = Math.random() * 200 + 50
        const centerX = getCenterX()
        const centerY = getCenterY()
        const x = centerX + Math.cos(angle) * radius
        const y = centerY + Math.sin(angle) * radius

        particlesRef.current.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.6 + 0.2,
          color: `hsl(${200 + Math.random() * 40}, 80%, 50%)`,
          life: Math.random() * 100,
          maxLife: 100 + Math.random() * 100,
        })
      }
    }

    // Markaziy shar chizish
    const drawCentralSphere = (ctx: CanvasRenderingContext2D, time: number) => {
      const centerX = getCenterX()
      const centerY = getCenterY()
      const radius = 60 + Math.sin(time * 0.002) * 8

      // Gradient yaratish - oq fon uchun to'g'rilangan
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)
      gradient.addColorStop(0, "rgba(59, 130, 246, 0.9)")
      gradient.addColorStop(0.5, "rgba(37, 99, 235, 0.6)")
      gradient.addColorStop(1, "rgba(29, 78, 216, 0.2)")

      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      // Markaziy halqalar
      for (let i = 1; i <= 2; i++) {
        ctx.beginPath()
        ctx.arc(centerX, centerY, radius + i * 20, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(59, 130, 246, ${0.4 - i * 0.15})`
        ctx.lineWidth = 2
        ctx.stroke()
      }

      // AI matn
      ctx.fillStyle = "rgba(255, 255, 255, 0.95)"
      ctx.font = "bold 30px Arial"
      ctx.textAlign = "center"
      ctx.fillText("AI", centerX, centerY+5 )
      ctx.font = "20px Arial"
    }

    // Zarralarni yangilash
    const updateParticles = () => {
      const centerX = getCenterX()
      const centerY = getCenterY()
      
      particlesRef.current.forEach((particle, index) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life++

        // Markazga tortish kuchi
        const dx = centerX - particle.x
        const dy = centerY - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance > 40) {
          particle.vx += dx * 0.00008
          particle.vy += dy * 0.00008
        }

        // Canvas chegaralaridan qaytarish
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Zarraning hayot davri
        if (particle.life > particle.maxLife) {
          const angle = Math.random() * Math.PI * 2
          const radius = Math.random() * 200 + 50
          particle.x = centerX + Math.cos(angle) * radius
          particle.y = centerY + Math.sin(angle) * radius
          particle.life = 0
          particle.opacity = Math.random() * 0.6 + 0.2
        }

        particle.opacity = Math.max(0.1, 1 - particle.life / particle.maxLife)
      })
    }

    // Bog'lanishlarni yaratish
    const createConnections = () => {
      connectionsRef.current = []
      const particles = particlesRef.current

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 80) {
            connectionsRef.current.push({
              x1: particles[i].x,
              y1: particles[i].y,
              x2: particles[j].x,
              y2: particles[j].y,
              opacity: ((80 - distance) / 80) * 0.3,
            })
          }
        }
      }
    }

    // Chizish funksiyasi
    const draw = (time: number) => {
      // Shaffof fon
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Bog'lanishlarni chizish
      connectionsRef.current.forEach((connection) => {
        ctx.beginPath()
        ctx.moveTo(connection.x1, connection.y1)
        ctx.lineTo(connection.x2, connection.y2)
        ctx.strokeStyle = `rgba(59, 130, 246, ${connection.opacity})`
        ctx.lineWidth = 1
        ctx.stroke()
      })

      // Zarralarni chizish
      particlesRef.current.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color.replace("50%)", `50%, ${particle.opacity})`)
        ctx.fill()

        // Zarralarga glow effekti
        ctx.shadowColor = particle.color
        ctx.shadowBlur = 8
        ctx.fill()
        ctx.shadowBlur = 0
      })

      // Markaziy sharni chizish
      drawCentralSphere(ctx, time)
    }

    // Animatsiya sikli
    const animate = (time: number) => {
      updateParticles()
      createConnections()
      draw(time)
      animationRef.current = requestAnimationFrame(animate)
    }

    createParticles()
    setIsLoaded(true)
    animate(0)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: "transparent" }}
      />

      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-blue-600 text-lg">Yuklanmoqda...</div>
        </div>
      )}
    </div>
  )
}