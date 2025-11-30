import BackgroundEngine from './background'
let engine
let started=false
export function initThreeBackground(canvas, route){
  if(started) return engine
  started=true
  engine = new BackgroundEngine(canvas)
  function loop(){
    engine.update()
    requestAnimationFrame(loop)
  }
  loop()
  return engine
}
export function disposeThreeBackground(){
  if(engine){ engine.dispose(); engine=undefined; started=false }
}
