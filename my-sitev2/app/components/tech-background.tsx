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
  lineStrength: number
  particleFill: number
  particleStroke: number
}

const DESKTOP_PARTICLE_COUNT = 56
const MOBILE_PARTICLE_COUNT = 36
const DESKTOP_CLUSTER_COUNT = 9
const MOBILE_CLUSTER_COUNT = 6
const CLUSTER_RADIUS = 72
const CONNECT_DISTANCE = 130
const MAX_SPEED = 0.42
const MIN_SPEED = 0.12
const DRIFT = 0.006
const MOUSE_RADIUS = 140
const MOUSE_FORCE = 0.05
const MAX_VELOCITY = 1.35

const LIGHT_PALETTE: ThemePalette = {
  rgb: '0, 0, 0',
  lineStrength: 0.14,
  particleFill: 0.34,
  particleStroke: 0.09,
}

const DARK_PALETTE: ThemePalette = {
  rgb: '255, 255, 255',
  lineStrength: 0.17,
  particleFill: 0.44,
  particleStroke: 0.1,
}

const MOBILE_OPACITY_BOOST = 1.18

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

    const intensity = () => (isMobileLayout() ? MOBILE_OPACITY_BOOST : 1)

    const particleCount = () =>
      window.innerWidth < 640 ? MOBILE_PARTICLE_COUNT : DESKTOP_PARTICLE_COUNT

    const clusterCount = () =>
      isMobileLayout() ? MOBILE_CLUSTER_COUNT : DESKTOP_CLUSTER_COUNT

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
      particle.vx += (Math.random() - 0.5) * DRIFT
      particle.vy += (Math.random() - 0.5) * DRIFT

      let speed = Math.hypot(particle.vx, particle.vy)

      if (speed < MIN_SPEED) {
        if (speed === 0) {
          const angle = Math.random() * Math.PI * 2
          particle.vx = Math.cos(angle) * MIN_SPEED
          particle.vy = Math.sin(angle) * MIN_SPEED
        } else {
          particle.vx = (particle.vx / speed) * MIN_SPEED
          particle.vy = (particle.vy / speed) * MIN_SPEED
        }
        speed = MIN_SPEED
      }

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

    const createClusterCenters = () => {
      const count = clusterCount()
      const paddingX = simulationWidth * 0.1
      const paddingY = simulationHeight * 0.1

      return Array.from({ length: count }, () => ({
        x: paddingX + Math.random() * (simulationWidth - paddingX * 2),
        y: paddingY + Math.random() * (simulationHeight - paddingY * 2),
      }))
    }

    const createParticleNear = (centerX: number, centerY: number): Particle => {
      const angle = Math.random() * Math.PI * 2
      const radius = Math.random() * CLUSTER_RADIUS

      return {
        x: Math.max(
          0,
          Math.min(simulationWidth, centerX + Math.cos(angle) * radius),
        ),
        y: Math.max(
          0,
          Math.min(simulationHeight, centerY + Math.sin(angle) * radius),
        ),
        vx: (Math.random() - 0.5) * MAX_SPEED,
        vy: (Math.random() - 0.5) * MAX_SPEED,
      }
    }

    const initParticles = () => {
      updateSimulationBounds()

      const count = particleCount()
      const centers = createClusterCenters()
      const particlesPerCluster = Math.ceil(count / centers.length)

      particles = []

      for (const center of centers) {
        for (
          let index = 0;
          index < particlesPerCluster && particles.length < count;
          index += 1
        ) {
          particles.push(createParticleNear(center.x, center.y))
        }
      }
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
      const {
        rgb,
        lineStrength,
        particleFill,
        particleStroke,
      } = palette
      const boost = intensity()

      ctx.clearRect(0, 0, canvasWidth, canvasHeight)

      for (const particle of particles) {
        applyMouseForces(particle)

        particle.x += particle.vx
        particle.y += particle.vy

        particle.vx *= 0.993
        particle.vy *= 0.993

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
            const opacity =
              (1 - distance / CONNECT_DISTANCE) * lineStrength * boost
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
        ctx.fillStyle = `rgba(${rgb}, ${Math.min(particleFill * boost, 0.72)})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, 1.35, 0, Math.PI * 2)
        ctx.fill()

        ctx.strokeStyle = `rgba(${rgb}, ${Math.min(particleStroke * boost, 0.28)})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(particle.x - 3.5, particle.y)
        ctx.lineTo(particle.x + 3.5, particle.y)
        ctx.moveTo(particle.x, particle.y - 3.5)
        ctx.lineTo(particle.x, particle.y + 3.5)
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
            if (particles.length !== particleCount()) {
              initParticles()
            }
          }
        } else {
          fitParticlesToViewport(lastWidth, lastHeight)

          if (widthChanged && particles.length !== particleCount()) {
            initParticles()
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
        grid.style.transform = `translate(${nx * 10}px, ${ny * 10}px)`
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
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div
        ref={gridRef}
        className="tech-bg-grid absolute inset-0 transition-transform duration-150 ease-out"
      />
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  )
}
