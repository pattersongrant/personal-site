'use client'

import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
}

type ThemePalette = {
  rgb: string
  particleFill: number
  particleStroke: number
}

const DESKTOP_PARTICLE_COUNT = 64
const MOBILE_PARTICLE_COUNT = 40
const CONNECT_DISTANCE = 130
const MAX_SPEED = 0.28
const MOUSE_RADIUS = 140
const MOUSE_FORCE = 0.06
const MAX_VELOCITY = 1.2

const LIGHT_PALETTE: ThemePalette = {
  rgb: '0, 0, 0',
  particleFill: 0.38,
  particleStroke: 0.1,
}

const DARK_PALETTE: ThemePalette = {
  rgb: '255, 255, 255',
  particleFill: 0.55,
  particleStroke: 0.12,
}

export function TechBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (prefersReducedMotion) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches
    const allowPointerInteraction = !isCoarsePointer
    const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)')

    let animationId = 0
    let particles: Particle[] = []
    let mouse = { x: -1000, y: -1000, active: false }
    let lastWidth = 0
    let lastHeight = 0
    let resizeTimeout: ReturnType<typeof setTimeout> | undefined
    let palette = colorSchemeQuery.matches ? DARK_PALETTE : LIGHT_PALETTE
    let simulationWidth = window.innerWidth
    let simulationHeight = window.innerHeight

    const isMobileLayout = () =>
      isCoarsePointer || window.innerWidth < 640

    const particleCount = () =>
      window.innerWidth < 640 ? MOBILE_PARTICLE_COUNT : DESKTOP_PARTICLE_COUNT

    const updateSimulationBounds = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      if (isMobileLayout()) {
        simulationWidth = Math.max(simulationWidth, width)
        simulationHeight = Math.max(simulationHeight, height)
        return
      }

      simulationWidth = width
      simulationHeight = height
    }

    const applyMouseForces = (particle: Particle) => {
      if (!allowPointerInteraction || !mouse.active) return

      const dx = particle.x - mouse.x
      const dy = particle.y - mouse.y
      const distance = Math.hypot(dx, dy)

      if (distance > 0 && distance < MOUSE_RADIUS) {
        const strength = (1 - distance / MOUSE_RADIUS) * MOUSE_FORCE
        particle.vx += (dx / distance) * strength
        particle.vy += (dy / distance) * strength
      }
    }

    const clampVelocity = (particle: Particle) => {
      const speed = Math.hypot(particle.vx, particle.vy)
      if (speed > MAX_VELOCITY) {
        particle.vx = (particle.vx / speed) * MAX_VELOCITY
        particle.vy = (particle.vy / speed) * MAX_VELOCITY
      }
    }

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const initParticles = () => {
      updateSimulationBounds()

      particles = Array.from({ length: particleCount() }, () => ({
        x: Math.random() * simulationWidth,
        y: Math.random() * simulationHeight,
        vx: (Math.random() - 0.5) * MAX_SPEED,
        vy: (Math.random() - 0.5) * MAX_SPEED,
      }))
    }

    const fitParticlesToViewport = (
      previousWidth: number,
      previousHeight: number,
    ) => {
      if (previousWidth === 0 || previousHeight === 0) {
        initParticles()
        return
      }

      const scaleX = simulationWidth / previousWidth
      const scaleY = simulationHeight / previousHeight

      for (const particle of particles) {
        particle.x *= scaleX
        particle.y *= scaleY
        particle.x = Math.max(0, Math.min(simulationWidth, particle.x))
        particle.y = Math.max(0, Math.min(simulationHeight, particle.y))
      }
    }

    const draw = () => {
      const canvasWidth = window.innerWidth
      const canvasHeight = window.innerHeight
      const { rgb, particleFill, particleStroke } = palette

      ctx.clearRect(0, 0, canvasWidth, canvasHeight)

      for (const particle of particles) {
        applyMouseForces(particle)

        particle.x += particle.vx
        particle.y += particle.vy

        particle.vx *= 0.985
        particle.vy *= 0.985

        clampVelocity(particle)

        if (particle.x <= 0 || particle.x >= simulationWidth) particle.vx *= -1
        if (particle.y <= 0 || particle.y >= simulationHeight) particle.vy *= -1

        particle.x = Math.max(0, Math.min(simulationWidth, particle.x))
        particle.y = Math.max(0, Math.min(simulationHeight, particle.y))
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.hypot(dx, dy)

          if (distance < CONNECT_DISTANCE) {
            const opacity = (1 - distance / CONNECT_DISTANCE) * 0.22
            ctx.strokeStyle = `rgba(${rgb}, ${opacity})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      for (const particle of particles) {
        ctx.fillStyle = `rgba(${rgb}, ${particleFill})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, 1.4, 0, Math.PI * 2)
        ctx.fill()

        ctx.strokeStyle = `rgba(${rgb}, ${particleStroke})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(particle.x - 4, particle.y)
        ctx.lineTo(particle.x + 4, particle.y)
        ctx.moveTo(particle.x, particle.y - 4)
        ctx.lineTo(particle.x, particle.y + 4)
        ctx.stroke()
      }

      animationId = requestAnimationFrame(draw)
    }

    const handleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout)

      resizeTimeout = setTimeout(() => {
        const nextWidth = window.innerWidth
        const nextHeight = window.innerHeight
        const widthChanged = Math.abs(nextWidth - lastWidth) > 48
        const previousSimulationWidth = simulationWidth
        const previousSimulationHeight = simulationHeight

        updateSimulationBounds()
        resizeCanvas()

        if (isMobileLayout()) {
          if (widthChanged) {
            fitParticlesToViewport(previousSimulationWidth, previousSimulationHeight)
            const targetCount = particleCount()
            if (particles.length !== targetCount) {
              initParticles()
            }
          }
        } else {
          fitParticlesToViewport(lastWidth, lastHeight)

          if (widthChanged) {
            const targetCount = particleCount()
            if (particles.length !== targetCount) {
              initParticles()
            }
          }
        }

        lastWidth = nextWidth
        lastHeight = nextHeight
      }, 250)
    }

    const onMouseMove = (event: MouseEvent) => {
      if (!allowPointerInteraction) return

      mouse.x = event.clientX
      mouse.y = event.clientY
      mouse.active = true

      const grid = gridRef.current
      if (grid) {
        const nx = event.clientX / window.innerWidth - 0.5
        const ny = event.clientY / window.innerHeight - 0.5
        grid.style.transform = `translate(${nx * 16}px, ${ny * 16}px)`
      }
    }

    const onMouseLeave = () => {
      if (!allowPointerInteraction) return

      mouse.active = false

      const grid = gridRef.current
      if (grid) {
        grid.style.transform = 'translate(0, 0)'
      }
    }

    const onColorSchemeChange = (event: MediaQueryListEvent) => {
      palette = event.matches ? DARK_PALETTE : LIGHT_PALETTE
    }

    resizeCanvas()
    initParticles()
    lastWidth = window.innerWidth
    lastHeight = window.innerHeight
    draw()

    window.addEventListener('resize', handleResize)
    colorSchemeQuery.addEventListener('change', onColorSchemeChange)
    if (allowPointerInteraction) {
      window.addEventListener('mousemove', onMouseMove)
      document.documentElement.addEventListener('mouseleave', onMouseLeave)
    }

    return () => {
      cancelAnimationFrame(animationId)
      if (resizeTimeout) clearTimeout(resizeTimeout)
      window.removeEventListener('resize', handleResize)
      colorSchemeQuery.removeEventListener('change', onColorSchemeChange)
      window.removeEventListener('mousemove', onMouseMove)
      document.documentElement.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10"
      aria-hidden
    >
      <div className="tech-bg-blur absolute inset-0">
        <div ref={gridRef} className="tech-bg-grid absolute inset-0 transition-transform duration-150 ease-out" />
        <canvas ref={canvasRef} className="absolute inset-0 opacity-90" />
        <div className="tech-bg-glow absolute inset-0" />
      </div>
    </div>
  )
}
