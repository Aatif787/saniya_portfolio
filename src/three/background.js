import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
class BackgroundEngine {
  constructor(canvas) {
    this.canvas = canvas
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance' })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.renderer.setClearColor(0x000000, 1)
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 0.85
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.camera.position.set(0, 0, 10)
    const pmrem = new THREE.PMREMGenerator(this.renderer)
    this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.1).texture
    this.clock = new THREE.Clock()
    this.composer = new EffectComposer(this.renderer)
    this.composer.addPass(new RenderPass(this.scene, this.camera))
    this.bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.3, 0.65, 0.85)
    this.composer.addPass(this.bloom)
    this.group = new THREE.Group()
    this.scene.add(this.group)
    this.particles = null
    this._initSpace()
    this._bind()
    this.explosionInterval = null
  }
  _bind() {
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.composer.setSize(window.innerWidth, window.innerHeight)
      this.bloom.setSize(window.innerWidth, window.innerHeight)
    })
  }
  _initSpace() {
    this.stars = this._createStarField()
    this.scene.add(this.stars)
    this.planets = null
    this.mStars = this._createMovingStars(3500)
    this.scene.add(this.mStars)
  }
  _createStarField() {
    const count = 18000
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 60 * Math.random() + 20
      const a = Math.random() * Math.PI * 2
      const z = (Math.random() - 0.5) * 40
      pos[i * 3] = Math.cos(a) * r
      pos[i * 3 + 1] = Math.sin(a) * r
      pos[i * 3 + 2] = z
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const mat = new THREE.PointsMaterial({ color: 0xbbbbbb, size: 0.009, sizeAttenuation: true, transparent: true, opacity: 0.62 })
    return new THREE.Points(geo, mat)
  }
  _createMovingStars(n){
    const pos = new Float32Array(n*3)
    const vel = new Float32Array(n*3)
    for(let i=0;i<n;i++){
      const r = 80*Math.random()+15
      const a = Math.random()*Math.PI*2
      const z = (Math.random()-0.5)*50
      pos[i*3] = Math.cos(a)*r
      pos[i*3+1] = Math.sin(a)*r
      pos[i*3+2] = z
      const sp = 0.02 + Math.random()*0.06
      const dir = a + (Math.random()-0.5)*0.3
      vel[i*3] = Math.cos(dir)*sp
      vel[i*3+1] = Math.sin(dir)*sp
      vel[i*3+2] = (Math.random()-0.5)*0.02
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(pos,3))
    geo.setAttribute('velocity', new THREE.BufferAttribute(vel,3))
    const mat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.011, sizeAttenuation: true, transparent: true, opacity: 0.7 })
    const points = new THREE.Points(geo, mat)
    points.userData.bounds = { r: 120, z: 60 }
    return points
  }
  
  spawnExplosion() {}
  update() {
    const t = this.clock.getElapsedTime()
    const dt = this.clock.getDelta()
    if (this.stars && this.stars.material){ this.stars.material.opacity = 0.55 + 0.08 * Math.sin(t*0.8) }
    if (this.mStars){
      const pa = this.mStars.geometry.getAttribute('position')
      const va = this.mStars.geometry.getAttribute('velocity')
      const b = this.mStars.userData.bounds
      for(let i=0;i<pa.count;i++){
        const ix = i*3
        pa.array[ix] += va.array[ix]*dt*60
        pa.array[ix+1] += va.array[ix+1]*dt*60
        pa.array[ix+2] += va.array[ix+2]*dt*60
        const R = Math.sqrt(pa.array[ix]*pa.array[ix] + pa.array[ix+1]*pa.array[ix+1])
        if(R>b.r){ const ang = Math.atan2(pa.array[ix+1], pa.array[ix]); pa.array[ix] = Math.cos(ang)*(-b.r); pa.array[ix+1] = Math.sin(ang)*(-b.r) }
        if(pa.array[ix+2]>b.z) pa.array[ix+2] = -b.z
        if(pa.array[ix+2]<-b.z) pa.array[ix+2] = b.z
      }
      pa.needsUpdate = true
    }
    this.composer.render()
  }
  dispose() {
    if(this.explosionInterval) clearInterval(this.explosionInterval)
    this.renderer.dispose()
  }
}
export default BackgroundEngine
