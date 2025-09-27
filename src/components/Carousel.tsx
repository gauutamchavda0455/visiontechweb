import { useEffect, useRef, useState, type ReactNode } from 'react'

type Props = {
  images: string[]
  intervalMs?: number
  height?: number | string
  renderOverlay?: (activeIndex: number) => ReactNode
  showControls?: boolean
  showIndicators?: boolean
}

export default function Carousel({
  images,
  intervalMs = 5000,
  height = 360,
  renderOverlay,
  showControls = true,
  showIndicators = true,
}: Props) {
  const [index, setIndex] = useState(0)
  const timerRef = useRef<number | null>(null)

  // auto-advance
  useEffect(() => {
    if (timerRef.current) window.clearInterval(timerRef.current)
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % images.length)
    }, intervalMs)
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
  }, [images.length, intervalMs])

  const restartTimer = () => {
    if (timerRef.current) window.clearInterval(timerRef.current)
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % images.length)
    }, intervalMs)
  }

  const goTo = (n: number) => {
    setIndex(((n % images.length) + images.length) % images.length)
    restartTimer()
  }

  const next = () => goTo(index + 1)
  const prev = () => goTo(index - 1)

  return (
    <div className="carousel" style={{ height: typeof height === 'number' ? `${height}px` : height }}>
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`Slide ${i + 1}`}
          className="carousel-slide"
          style={{ opacity: i === index ? 1 : 0 }}
        />
      ))}
      {renderOverlay && (
        <div className="carousel-overlay">
          {renderOverlay(index)}
        </div>
      )}
      {showControls && (
        <div className="carousel-controls">
          <button className="nav prev" aria-label="Previous slide" onClick={prev}>
            ‹
          </button>
          <button className="nav next" aria-label="Next slide" onClick={next}>
            ›
          </button>
        </div>
      )}
      {showIndicators && (
        <div className="carousel-indicators" role="tablist" aria-label="Choose slide">
          {images.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to slide ${i + 1}`}
              className={i === index ? 'dot active' : 'dot'}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
