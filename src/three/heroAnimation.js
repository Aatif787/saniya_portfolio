import * as THREE from 'three'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import helvetiker from 'three/examples/fonts/helvetiker_regular.typeface.json'
function samplePositions(geo, count){
  geo.computeBoundingBox()
  const pos = []
  const g = geo.attributes.position
  for(let i=0;i<g.count;i+=Math.max(1,Math.floor(g.count/count))){
    pos.push(new THREE.Vector3().fromBufferAttribute(g,i))
  }
  return pos.slice(0,count)
}
export default function runHeroAnimation(engine, onComplete){
  const scene = engine.scene
  const t0 = engine.clock.getElapsedTime()
  const planet = new THREE.Mesh(new THREE.SphereGeometry(1.6,64,64), new THREE.MeshPhysicalMaterial({ color: 0xffc060, emissive: 0x552200, roughness: 0.3, metalness: 0.2, clearcoat: 0.6 }))
  planet.position.set(0,0,-3)
  scene.add(planet)
  const sparksN = 3200
  const geo = new THREE.BufferGeometry()
  const pos = new Float32Array(sparksN*3)
  const vel = new Float32Array(sparksN*3)
  const col = new Float32Array(sparksN*3)
  const size = new Float32Array(sparksN)
  for(let i=0;i<sparksN;i++){
    pos[i*3]=0; pos[i*3+1]=0; pos[i*3+2]=-3
    const a=Math.random()*Math.PI*2, b=Math.random()*Math.PI, s=4+Math.random()*8
    vel[i*3]=Math.cos(a)*Math.sin(b)*s
    vel[i*3+1]=Math.sin(a)*Math.sin(b)*s
    vel[i*3+2]=Math.cos(b)*s
    const c=new THREE.Color().setHSL(0.08+Math.random()*0.1,0.9,0.6)
    col[i*3]=c.r; col[i*3+1]=c.g; col[i*3+2]=c.b
    size[i]=18+Math.random()*22
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos,3))
  geo.setAttribute('velocity', new THREE.BufferAttribute(vel,3))
  geo.setAttribute('color', new THREE.BufferAttribute(col,3))
  geo.setAttribute('size', new THREE.BufferAttribute(size,1))
  const mat = new THREE.ShaderMaterial({
    transparent:true, depthWrite:false, vertexColors:true,
    uniforms:{ uTime:{ value:0 }},
    vertexShader:`
      attribute vec3 velocity; attribute float size; varying vec3 vColor; uniform float uTime;
      void main(){ vColor=color; vec3 p=position+velocity*uTime*0.5; gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0); gl_PointSize=size*(1.0/(1.0+uTime*0.4)); }
    `,
    fragmentShader:`
      varying vec3 vColor; void main(){ float d=length(gl_PointCoord.xy-0.5); float a=smoothstep(0.5,0.0,d); gl_FragColor=vec4(vColor,a); }
    `
  })
  const points = new THREE.Points(geo, mat)
  points.userData.start = t0
  engine.particles.add(points)
  const ring = new THREE.Mesh(new THREE.RingGeometry(0.1,0.11,64), new THREE.MeshBasicMaterial({ color: 0xffcc88, transparent:true }))
  ring.position.set(0,0,-3)
  ring.rotation.x=Math.PI/2
  ring.userData.start=t0
  scene.add(ring)
  const loader = new FontLoader()
  const font = loader.parse(helvetiker)
  const textGeo = new TextGeometry('Saniya Dhada',{ font, size: 1.2, height: 0.06, curveSegments: 8 })
  textGeo.center()
  const targets = samplePositions(textGeo, sparksN)
  const targetArr = new Float32Array(sparksN*3)
  for(let i=0;i<sparksN;i++){
    const v = targets[i % targets.length]
    targetArr[i*3]=v.x; targetArr[i*3+1]=v.y; targetArr[i*3+2]=-3
  }
  const morph = { progress: 0 }
  const group = new THREE.Group()
  scene.add(group)
  const textMat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, emissive: 0x333333, roughness: 0.4, metalness: 0.2 })
  const textMesh = new THREE.Mesh(textGeo, textMat)
  textMesh.visible=false
  group.add(textMesh)
  const update = () => {
    const t = engine.clock.getElapsedTime()
    const dt = t - points.userData.start
    mat.uniforms.uTime.value = dt
    const p = Math.min(1, Math.max(0, (dt-1.2)/1.2))
    if (p>0){
      const pa = geo.getAttribute('position')
      for(let i=0;i<sparksN;i++){
        const ix=i*3
        pa.array[ix] = THREE.MathUtils.lerp(pa.array[ix], targetArr[ix], p*0.08)
        pa.array[ix+1] = THREE.MathUtils.lerp(pa.array[ix+1], targetArr[ix+1], p*0.08)
        pa.array[ix+2] = THREE.MathUtils.lerp(pa.array[ix+2], targetArr[ix+2], p*0.08)
      }
      pa.needsUpdate=true
    }
    group.rotation.y += 0.006
    if (dt>2.6){
      textMesh.visible=true
      engine.particles.remove(points)
      scene.remove(ring)
      if(onComplete) onComplete()
      engine.bloom.strength = 1.2
      engine.bloom.threshold = 0.6
      engine.bloom.radius = 0.95
      engine._heroDone = true
    }
  }
  engine._heroUpdate = update
}
