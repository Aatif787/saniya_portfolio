import BackgroundEngine from './background'
let engine
let started = false
let animationId = null

export function initThreeBackground(canvas, route) {
  if (started) return engine
  started = true
  engine = new BackgroundEngine(canvas)

  function loop() {
    if (!started) return
    engine.update()
    animationId = requestAnimationFrame(loop)
  }
  animationId = requestAnimationFrame(loop)
  return engine
}

export function disposeThreeBackground() {
  if (animationId) {
    cancelAnimationFrame(animationId)
    animationId = null
  }
  if (engine) {
    engine.dispose()
    engine = undefined
  }
  started = false
}

