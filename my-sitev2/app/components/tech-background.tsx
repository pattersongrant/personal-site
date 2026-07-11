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
const DESKTOP_CLUSTER_COUNT = 8
const MOBILE_CLUSTER_COUNT = 5
const CLUSTER_RADIUS = 72
const CONNECT_DISTANCE = 130
const MAX_SPEED = 0.28
const MOUSE_RADIUS = 140
const MOUSE_FORCE = 0.06
const MAX_VELOCITY = 1.2
const CONTENT_PADDING = 28
const CONTENT_FADE_DISTANCE = 56

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
    let contentBounds = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      active: false,
    }

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

    const updateContentBounds = () => {
      const content = document.getElementById('site-content')
      if (!content) {
        contentBounds.active = false
        return
      }

      const rect = content.getBoundingClientRect()
      contentBounds = {
        left: rect.left - CONTENT_PADDING,
        top: rect.top - CONTENT_PADDING,
        right: rect.right + CONTENT_PADDING,
        bottom: rect.bottom + CONTENT_PADDING,
        active: true,
      }
    }

    const distanceToContentBounds = (x: number, y: number) => {
      if (!contentBounds.active) return Infinity

      const dx =
        x < contentBounds.left
          ? contentBounds.left - x
          : x > contentBounds.right
            ? x - contentBounds.right
            : 0
      const dy =
        y < contentBounds.top
          ? contentBounds.top - y
          : y > contentBounds.bottom
            ? y - contentBounds.bottom
            : 0

      return Math.hypot(dx, dy)
    }

    const getContentVisibility = (x: number, y: number) => {
      const distance = distanceToContentBounds(x, y)
      if (distance >= CONTENT_FADE_DISTANCE) return 1
      return distance / CONTENT_FADE_DISTANCE
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

    const clusterCount = () =>
      isMobileLayout() ? MOBILE_CLUSTER_COUNT : DESKTOP_CLUSTER_COUNT

    const createClusterCenters = () => {
      const count = clusterCount()
      const paddingX = simulationWidth * 0.12
      const paddingY = simulationHeight * 0.12
      const usableWidth = simulationWidth - paddingX * 2
      const usableHeight = simulationHeight - paddingY * 2

      return Array.from({ length: count }, (_, index) => {
        const column = index % Math.ceil(Math.sqrt(count))
        const row = Math.floor(index / Math.ceil(Math.sqrt(count)))
        const columns = Math.ceil(Math.sqrt(count))
        const rows = Math.ceil(count / columns)
        const jitterX = (Math.random() - 0.5) * (usableWidth / columns) * 0.45
        const jitterY = (Math.random() - 0.5) * (usableHeight / rows) * 0.45

        return {
          x:
            paddingX +
            ((column + 0.5) / columns) * usableWidth +
            jitterX,
          y:
            paddingY +
            ((row + 0.5) / rows) * usableHeight +
            jitterY,
        }
      })
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
      const { rgb, particleFill, particleStroke } = palette

      updateContentBounds()
      ctx.clearRect(0, 0, canvasWidth, canvasHeight)

      const particleVisibility = particles.map((particle) =>
        getContentVisibility(particle.x, particle.y),
      )

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
            const lineVisibility = Math.min(
              particleVisibility[i],
              particleVisibility[j],
            )
            if (lineVisibility <= 0) continue

            const opacity =
              (1 - distance / CONNECT_DISTANCE) * 0.22 * lineVisibility
            ctx.strokeStyle = `rgba(${rgb}, ${opacity})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      for (let index = 0; index < particles.length; index += 1) {
        const particle = particles[index]
        const visibility = particleVisibility[index]
        if (visibility <= 0) continue

        ctx.fillStyle = `rgba(${rgb}, ${particleFill * visibility})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, 1.4, 0, Math.PI * 2)
        ctx.fill()

        ctx.strokeStyle = `rgba(${rgb}, ${particleStroke * visibility})`
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
    window.addEventListener('scroll', updateContentBounds, { passive: true })
    colorSchemeQuery.addEventListener('change', onColorSchemeChange)
    if (allowPointerInteraction) {
      window.addEventListener('mousemove', onMouseMove)
      document.documentElement.addEventListener('mouseleave', onMouseLeave)
    }

    return () => {
      cancelAnimationFrame(animationId)
      if (resizeTimeout) clearTimeout(resizeTimeout)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', updateContentBounds)
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
      <div ref={gridRef} className="tech-bg-grid absolute inset-0 transition-transform duration-150 ease-out" />
      <canvas ref={canvasRef} className="absolute inset-0 opacity-90" />
    </div>
  )
}
