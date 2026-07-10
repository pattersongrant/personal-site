'use client'

import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
}

const PARTICLE_COUNT = 64
const CONNECT_DISTANCE = 130
const MAX_SPEED = 0.28
const MOUSE_RADIUS = 140
const MOUSE_FORCE = 0.06
const MAX_VELOCITY = 1.2

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

    let animationId = 0
    let particles: Particle[] = []
    let scanY = 0
    let mouse = { x: -1000, y: -1000, active: false }

    const applyMouseForces = (particle: Particle) => {
      if (!mouse.active) return

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

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const initParticles = () => {
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * MAX_SPEED,
        vy: (Math.random() - 0.5) * MAX_SPEED,
      }))
    }

    const draw = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      ctx.clearRect(0, 0, width, height)

      for (const particle of particles) {
        applyMouseForces(particle)

        particle.x += particle.vx
        particle.y += particle.vy

        particle.vx *= 0.985
        particle.vy *= 0.985

        clampVelocity(particle)

        if (particle.x <= 0 || particle.x >= width) particle.vx *= -1
        if (particle.y <= 0 || particle.y >= height) particle.vy *= -1

        particle.x = Math.max(0, Math.min(width, particle.x))
        particle.y = Math.max(0, Math.min(height, particle.y))
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.hypot(dx, dy)

          if (distance < CONNECT_DISTANCE) {
            const opacity = (1 - distance / CONNECT_DISTANCE) * 0.22
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      for (const particle of particles) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.55)'
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, 1.4, 0, Math.PI * 2)
        ctx.fill()

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(particle.x - 4, particle.y)
        ctx.lineTo(particle.x + 4, particle.y)
        ctx.moveTo(particle.x, particle.y - 4)
        ctx.lineTo(particle.x, particle.y + 4)
        ctx.stroke()
      }

      scanY = (scanY + 0.6) % (height + 80)
      const gradient = ctx.createLinearGradient(0, scanY - 40, 0, scanY + 40)
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0)')
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.04)')
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, scanY - 40, width, 80)

      animationId = requestAnimationFrame(draw)
    }

    const onResize = () => {
      resize()
      initParticles()
    }

    const onMouseMove = (event: MouseEvent) => {
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
      mouse.active = false

      const grid = gridRef.current
      if (grid) {
        grid.style.transform = 'translate(0, 0)'
      }
    }

    resize()
    initParticles()
    draw()
    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMouseMove)
    document.documentElement.addEventListener('mouseleave', onMouseLeave)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
      document.documentElement.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 hidden dark:block"
      aria-hidden
    >
      <div ref={gridRef} className="tech-bg-grid absolute inset-0 transition-transform duration-150 ease-out" />
      <canvas ref={canvasRef} className="absolute inset-0 opacity-90" />
      <div className="tech-bg-glow absolute inset-0" />
    </div>
  )
}
