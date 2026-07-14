import { useRef, useMemo, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// ─── Fast JSON point loading ──────────────────────────────────────────────────
function useJSONPositions(src: string) {
  const [positions, setPositions] = useState<Float32Array | null>(null)

  useEffect(() => {
    fetch(src)
      .then(res => res.json())
      .then(data => setPositions(new Float32Array(data)))
      .catch(err => console.error('Failed to load JSON points:', err))
  }, [src])

  return positions
}

// ─── Explode / background scatter ───────────────────────────────────────────
function explodePositions(count: number) {
  const pos = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    // Massive scatter spanning the entire background
    const u = Math.random()
    const v = Math.random()
    const theta = 2 * Math.PI * u
    const phi = Math.acos(2 * v - 1)
    
    // Spread between 15 and 150 units in radius
    const r = 15.0 + 135.0 * Math.random()
    
    pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
    pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    pos[i * 3 + 2] = r * Math.cos(phi)
  }
  return pos
}

// ─── Toroid / ring shape positions ───────────────────────────────────────────
function torusPositions(count: number) {
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const u = Math.random() * Math.PI * 2
    const v = Math.random() * Math.PI * 2
    const R = 4.0, r = 1.2
    positions[i * 3]     = (R + r * Math.cos(v)) * Math.cos(u)
    positions[i * 3 + 1] = (R + r * Math.cos(v)) * Math.sin(u)
    positions[i * 3 + 2] = r * Math.sin(v)
  }
  return positions
}

// ─── Galaxy / spiral positions ────────────────────────────────────────────────
function galaxyPositions(count: number) {
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const arm = Math.floor(Math.random() * 3)
    const t = Math.random()
    const angle = arm * ((Math.PI * 2) / 3) + t * Math.PI * 3
    const radius = t * 5.0
    const spread = (1 - t) * 0.8
    positions[i * 3]     = Math.cos(angle) * radius + (Math.random() - 0.5) * spread
    positions[i * 3 + 1] = (Math.random() - 0.5) * 0.5
    positions[i * 3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * spread
  }
  return positions
}

// ─── Scatter / Dissolve positions ─────────────────────────────────────────────
function scatterPositions(count: number) {
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const u = Math.random() * Math.PI * 2
    const v = Math.acos(Math.random() * 2 - 1)
    const r = Math.random() * 15.0 + 2.0 // huge spread
    positions[i * 3]     = r * Math.sin(v) * Math.cos(u)
    positions[i * 3 + 1] = r * Math.sin(v) * Math.sin(u)
    positions[i * 3 + 2] = r * Math.cos(v)
  }
  return positions
}

interface ParticleMeshProps {
  scrollProgress: React.MutableRefObject<number>
  mousePos: React.MutableRefObject<{ x: number; y: number }>
  debug?: { rx: number; ry: number; rz: number; px: number; py: number; pz: number; s: number }
}

export default function ParticleMesh({ scrollProgress, mousePos, debug }: ParticleMeshProps) {
  const pointsRef = useRef<THREE.Points>(null)
  const { camera, size } = useThree()

  // MASSIVE DENSITY: 150,000 points for hyper-premium holographic look
  const COUNT = 150000

  // Load the true GLB-sourced 3D points
  const logoPts = useJSONPositions('/logo_points.json')
  const bulbPts = useJSONPositions('/bulb_points.json')
  const servicesPts = useJSONPositions('/services_points.json')

  const shapes = useMemo(() => ({
    scatter: scatterPositions(COUNT),
    explode: explodePositions(COUNT)
  }), [])

  const fallback = useMemo(() => torusPositions(COUNT), [])
  const currentPositions = useMemo(() => new Float32Array(fallback), [fallback])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(currentPositions, 3))
    
    const sizes = new Float32Array(COUNT)
    const drifts = new Float32Array(COUNT * 3)
    const phases = new Float32Array(COUNT)
    
    for (let i = 0; i < COUNT; i++) { 
      sizes[i] = Math.random() * 1.6 + 0.5 // slightly thicker
      
      // Random direction vector for smooth drifting
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      drifts[i * 3]     = Math.sin(phi) * Math.cos(theta)
      drifts[i * 3 + 1] = Math.sin(phi) * Math.sin(theta)
      drifts[i * 3 + 2] = Math.cos(phi)
      
      // Random phase offset so they don't move together
      phases[i] = Math.random() * Math.PI * 2
    }
    
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
    geo.setAttribute('aDrift', new THREE.BufferAttribute(drifts, 3))
    geo.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1))
    return geo
  }, [currentPositions])

  const material = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      uTime:        { value: 0 },
      uPixelRatio:  { value: Math.min(window.devicePixelRatio, 2) },
      uColor:       { value: new THREE.Color('#00e5c8') },
      uAlpha:       { value: 1.0 },
      uSize:        { value: 1.0 },
      uMouseLocal:  { value: new THREE.Vector3(9999, 9999, 9999) },
      uHoleRadius:  { value: 0.90 },
      uRayOrigin:   { value: new THREE.Vector3(9999, 9999, 9999) },
      uRayDir:      { value: new THREE.Vector3(0, 0, -1) },
    },
    vertexShader: `
      attribute float aSize;
      attribute vec3 aDrift;
      attribute float aPhase;
      
      uniform float uPixelRatio;
      uniform float uTime;
      uniform float uSize;
      uniform vec3  uMouseLocal;
      uniform float uHoleRadius;
      uniform vec3  uRayOrigin;
      uniform vec3  uRayDir;

      varying vec3  vPos;
      varying float vDistRatio;
      
      void main() {
        float offset = sin(uTime * 3.0 + aPhase) * 0.05;
        vec3 finalPos = position + (aDrift * offset);
        
        // Distance from particle to 3D ray (most accurate for any 3D shape)
        vec3 toPoint = finalPos - uRayOrigin;
        float t = max(0.0, dot(toPoint, uRayDir));
        vec3 closest = uRayOrigin + t * uRayDir;
        float distToRay = distance(finalPos, closest);
        vDistRatio = distToRay / uHoleRadius;

        vPos = finalPos;
        vec4 mv = modelViewMatrix * vec4(finalPos, 1.0);
        gl_Position  = projectionMatrix * mv;
        float insideBoost = vDistRatio < 1.0 ? (1.0 + (1.0 - vDistRatio) * 0.6) : 1.0;
        gl_PointSize = aSize * uSize * uPixelRatio * (20.0 / -mv.z) * insideBoost;
      }
    `,
    fragmentShader: `
      uniform vec3  uColor;
      uniform float uAlpha;
      varying vec3  vPos;
      varying float vDistRatio;
      void main() {
        vec2 uv = gl_PointCoord - 0.5;
        float d = length(uv);
        if (d > 0.5) discard;
        float alpha = smoothstep(0.5, 0.0, d);
        float depth = smoothstep(-2.0, 2.0, vPos.z) * 0.8 + 0.2;

        // Sphere glow: target the particles forming the "walls" of the pushed space.
        // Because JS pushes particles out, they end up at vDistRatio up to ~1.9!
        // Fading from 2.2 down to 0.5 perfectly captures ALL displaced/spread particles.
        float whiteMix = smoothstep(2.2, 0.5, vDistRatio) * 0.80;
        vec3 softWhite = vec3(0.9, 0.9, 0.9); // Clean white, not aggressively glowing
        vec3 col = mix(uColor * depth, softWhite, whiteMix);
        float finalAlpha = alpha * uAlpha;

        gl_FragColor = vec4(col, finalAlpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  }), [])

  // Persistent objects — declared once, reused every frame
  const _raycaster = useMemo(() => new THREE.Raycaster(), [])
  const _invMatrix = useMemo(() => new THREE.Matrix4(), [])
  const _localRay  = useMemo(() => new THREE.Ray(), [])

  useFrame(({ clock, mouse }) => {
    if (!pointsRef.current) return
    
    const t = clock.getElapsedTime()
    material.uniforms.uTime.value = t

    const aspect = size.width / size.height

    // ── Scroll-driven morph: logo → scatter → bulb → scatter → services ──────────
    // rawMorph goes from 0.0 to 4.0 based on scroll (Hero -> About -> Services)
    const rawMorph = scrollProgress.current

    // Intro Animation (Page Load)
    const introProgress = Math.min(1, t / 3.0) // 0 to 1 over 3 seconds
    const introEase = 1 - Math.pow(1 - introProgress, 3) // cubic ease out

    // Alpha (Visibility) Logic across the entire timeline
    let targetAlpha: number
    if (introProgress < 1 && rawMorph === 0) {
      targetAlpha = 0.08 + (introEase * 0.87) // Intro assembly
    } else if (rawMorph < 0.3) {
      targetAlpha = 0.95 - (rawMorph / 0.3) * 0.87   // Logo -> Scatter (fade out)
    } else if (rawMorph < 0.7) {
      targetAlpha = 0.08                             // Dim while scattered
    } else if (rawMorph < 1.0) {
      targetAlpha = 0.08 + ((rawMorph - 0.7) / 0.3) * 0.87 // Scatter -> Bulb (fade in)
    } else if (rawMorph < 1.3) {
      targetAlpha = 0.95 - ((rawMorph - 1.0) / 0.3) * 0.87 // Bulb -> Scatter 2 (fade out)
    } else if (rawMorph < 1.7) {
      targetAlpha = 0.08                             // Dim while scattered 2
    } else if (rawMorph < 2.0) {
      targetAlpha = 0.08 + ((rawMorph - 1.7) / 0.3) * 0.87 // Scatter 2 -> Services (fade in)
    } else if (rawMorph < 3.0) {
      targetAlpha = 0.95 * (1.0 - (rawMorph - 2.0))  // Explode: fade out
    } else {
      targetAlpha = 0.0                               // Post-explosion: invisible
    }
    
    // Smooth the alpha transition — faster during explosion to avoid messy scatter
    const alphaLerp = rawMorph >= 2.0 ? 0.3 : 0.1
    material.uniforms.uAlpha.value += (targetAlpha - material.uniforms.uAlpha.value) * alphaLerp

    // Size Logic
    let targetSize = 1.0
    if (rawMorph < 1.0) {
      targetSize = 1.0 - (rawMorph * 0.45) // Logo (1.0) -> Bulb (0.55)
    } else if (rawMorph < 2.0) {
      targetSize = 0.55 // Keep it thin like the bulb for Services!
    } else {
      // Explode phase (rawMorph 2.0 -> 3.0): rapidly shrink to nothing
      targetSize = Math.max(0, 0.55 * (1.0 - (rawMorph - 2.0) * 2.5))
    }
    const sizeLerp = rawMorph >= 2.0 ? 0.3 : 0.1
    material.uniforms.uSize.value += (targetSize - material.uniforms.uSize.value) * sizeLerp

    // Transform Logic (Position, Rotation, Scale)
    let shiftX = 0, shiftY = 0, shiftZ = 0
    let rotX = 0, rotY = 0, rotZ = 0
    let currentScale = 1.0

    const introSpin = (introProgress < 1 && rawMorph === 0) ? (1 - introEase) * Math.PI * 2 : 0

    // Eased morphs for smooth transforms between stages
    const m1 = Math.min(1, Math.max(0, rawMorph)) // 0 to 1 (Logo to Bulb)
    const easedM1 = m1 < 0.5 ? 4 * m1 ** 3 : 1 - (-2 * m1 + 2) ** 3 / 2
    
    const m2 = Math.min(1, Math.max(0, rawMorph - 1.0)) // 0 to 1 (Bulb to Services)
    const easedM2 = m2 < 0.5 ? 4 * m2 ** 3 : 1 - (-2 * m2 + 2) ** 3 / 2

    // Interpolate positions: Logo -> Bulb -> Services
    // Logo transforms (easedM1 = 0, easedM2 = 0)
    const lX = aspect > 1.2 ? 3.0 : 0.5
    const lY = 0.5
    const lZ = 0.0
    const lRotX = -Math.PI / 2 + (0.12 * Math.PI)
    const lRotY = 0.94 * Math.PI
    const lRotZ = -0.78 * Math.PI
    const lScale = 1.1

    // Bulb transforms (easedM1 = 1, easedM2 = 0)
    const bX = lX - 3.7
    const bY = 0.3
    const bZ = -2.6
    const bRotX = lRotX - 0.7
    const bRotY = lRotY + 6.2
    const bRotZ = lRotZ + 4.5
    const bScale = 1.3

    // Services transforms (easedM1 = 1, easedM2 = 1) -> positioned beside the header
    // NOTE: groupRef in HeroSection has a scroll-based rotation of ~162 degrees by the time it reaches Services.
    // This flips the X axis! So -3.5 local X actually puts it on the right side of the screen.
    const sX = aspect > 1.2 ? -2.60 : 0.0
    const sY = 0.60
    const sZ = 2.00
    const sRotX = 1.53
    const sRotY = -0.07
    const sRotZ = -3.14
    const sScale = 1.0

    shiftX = lX + (bX - lX) * easedM1 + (sX - bX) * easedM2
    shiftY = lY + (bY - lY) * easedM1 + (sY - bY) * easedM2
    shiftZ = lZ + (bZ - lZ) * easedM1 + (sZ - bZ) * easedM2
    
    rotX = lRotX + (bRotX - lRotX) * easedM1 + (sRotX - bRotX) * easedM2
    rotY = lRotY + (bRotY - lRotY) * easedM1 + (sRotY - bRotY) * easedM2 + introSpin
    rotZ = lRotZ + (bRotZ - lRotZ) * easedM1 + (sRotZ - bRotZ) * easedM2

    currentScale = lScale + (bScale - lScale) * easedM1 + (sScale - bScale) * easedM2

    pointsRef.current.position.set(shiftX, shiftY, shiftZ)
    pointsRef.current.scale.set(currentScale, currentScale, currentScale)
    pointsRef.current.rotation.set(rotX, rotY, rotZ)

    // Force update world matrix INCLUDING PARENTS (HeroSection's groupRef has mouse rotation)
    // updateWorldMatrix(updateParents, updateChildren)
    pointsRef.current.updateWorldMatrix(true, false)

    // ─── Local-space ray repulsion — accurate for ALL 3D shapes & rotations ────
    // Convert global mousePos to NDC so it works even if HTML elements block the Canvas
    const ndcX = (mousePos.current.x / window.innerWidth) * 2 - 1
    const ndcY = -(mousePos.current.y / window.innerHeight) * 2 + 1
    _raycaster.setFromCamera({ x: ndcX, y: ndcY } as THREE.Vector2, camera)
    
    // Transform camera ray into the mesh's local coordinate system
    _invMatrix.copy(pointsRef.current.matrixWorld).invert()
    _localRay.copy(_raycaster.ray).applyMatrix4(_invMatrix)
    // Normalize direction after matrix transform
    _localRay.direction.normalize()
    // Pass to shader for glow effect
    material.uniforms.uRayOrigin.value.copy(_localRay.origin)
    material.uniforms.uRayDir.value.copy(_localRay.direction)

    // Morph Arrays Selection
    const shape1 = logoPts || fallback
    const shape3 = bulbPts || fallback
    const shape5 = servicesPts || fallback
    const shape2 = shapes.scatter
    const shape6 = shapes.explode

    let fromArr: Float32Array, toArr: Float32Array, localT: number
    if (introProgress < 1 && rawMorph === 0) {
      fromArr = shape2 // scatter
      toArr = shape1   // logo
      localT = introEase
    } else if (rawMorph < 0.5) {
      fromArr = shape1; toArr = shape2; localT = rawMorph / 0.5
    } else if (rawMorph < 1.0) {
      fromArr = shape2; toArr = shape3; localT = (rawMorph - 0.5) / 0.5
    } else if (rawMorph < 1.5) {
      fromArr = shape3; toArr = shape2; localT = (rawMorph - 1.0) / 0.5
    } else if (rawMorph < 2.0) {
      fromArr = shape2; toArr = shape5; localT = (rawMorph - 1.5) / 0.5
    } else if (rawMorph < 3.0) {
      fromArr = shape5; toArr = shape6; localT = (rawMorph - 2.0) / 1.0 // Explode out!
    } else {
      fromArr = shape6; toArr = shape6; localT = 1.0
    }

    // Ease in/out locally for the sub-transition
    const easedT = localT < 0.5
      ? 4 * localT ** 3
      : 1 - (-2 * localT + 2) ** 3 / 2

    // Pass ray to shader (already done above via uniforms)
    const HOLE_RADIUS = 0.90
    material.uniforms.uHoleRadius.value = HOLE_RADIUS

    // Local ray origin & direction for JS repulsion loop
    const ro = _localRay.origin
    const rd = _localRay.direction

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3
      let tx = fromArr[i3]     + (toArr[i3]     - fromArr[i3])     * easedT
      let ty = fromArr[i3 + 1] + (toArr[i3 + 1] - fromArr[i3 + 1]) * easedT
      let tz = fromArr[i3 + 2] + (toArr[i3 + 2] - fromArr[i3 + 2]) * easedT

      // Distance from particle to the 3D ray (works for any shape/rotation)
      const tpx = tx - ro.x, tpy = ty - ro.y, tpz = tz - ro.z
      const proj = Math.max(0, tpx * rd.x + tpy * rd.y + tpz * rd.z)
      const cx = ro.x + proj * rd.x
      const cy = ro.y + proj * rd.y
      const cz = ro.z + proj * rd.z
      const dx = tx - cx, dy = ty - cy, dz = tz - cz
      const distToRay = Math.sqrt(dx * dx + dy * dy + dz * dz)

      if (distToRay < HOLE_RADIUS && distToRay > 0.001) {
        const t = distToRay / HOLE_RADIUS
        const falloff = 1.0 - t * t * t        // cubic ease-out
        const pushDist = falloff * HOLE_RADIUS * 1.6
        const inv = 1.0 / distToRay
        positions[i3]     = tx + dx * inv * pushDist
        positions[i3 + 1] = ty + dy * inv * pushDist
        positions[i3 + 2] = tz + dz * inv * pushDist
      } else {
        positions[i3]     = tx
        positions[i3 + 1] = ty
        positions[i3 + 2] = tz
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return <points ref={pointsRef} geometry={geometry} material={material} />
}

// ─── Flowing Wavy Terrain (from Reference Image 2) ────────────────────────────
export function TerrainBackground() {
  const ref = useRef<THREE.Points>(null)
  const GRID_SIZE = 350 // Massive grid
  const COUNT = GRID_SIZE * GRID_SIZE

  const { geometry, material } = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const pos = new Float32Array(COUNT * 3)
    
    for (let x = 0; x < GRID_SIZE; x++) {
      for (let z = 0; z < GRID_SIZE; z++) {
        const i = (x * GRID_SIZE + z) * 3
        // Massive bounds so rotation never reveals edges
        pos[i]     = (x / GRID_SIZE - 0.5) * 350 
        pos[i + 1] = -4.0 
        pos[i + 2] = (z / GRID_SIZE - 0.5) * 350 - 10 
      }
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    
    // Save original X/Z for stable noise generation
    geo.setAttribute('basePos', new THREE.BufferAttribute(new Float32Array(pos), 3))

    const mat = new THREE.PointsMaterial({
      size: 0.05,
      color: new THREE.Color('#00e5c8'),
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    return { geometry: geo, material: mat }
  }, [])

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime() * 0.5
    const pos = ref.current.geometry.attributes.position.array as Float32Array
    const base = ref.current.geometry.attributes.basePos.array as Float32Array

    for (let i = 0; i < COUNT; i++) {
      const bx = base[i * 3]
      const bz = base[i * 3 + 2]
      
      // Beautiful rolling wave math
      const wave1 = Math.sin(bx * 0.2 + t) * 0.8
      const wave2 = Math.cos(bz * 0.3 - t * 0.8) * 0.6
      const wave3 = Math.sin((bx + bz) * 0.1 + t * 1.2) * 1.2
      
      pos[i * 3 + 1] = -5.0 + wave1 + wave2 + wave3
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return <points ref={ref} geometry={geometry} material={material} />
}

// ─── Data Stream Rain (from Reference Image 2) ────────────────────────────────
export function DataRain() {
  const ref = useRef<THREE.Points>(null)
  const RAIN = 25000

  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(RAIN * 3)
    const spd = new Float32Array(RAIN)
    for (let i = 0; i < RAIN; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 300 
      pos[i * 3 + 1] = Math.random() * 100 - 10    
      pos[i * 3 + 2] = (Math.random() - 0.5) * 300 - 15 
      spd[i]         = 0.01 + Math.random() * 0.03
    }
    return { positions: pos, speeds: spd }
  }, [])

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return g
  }, [positions])

  const material = useMemo(() => new THREE.PointsMaterial({
    size: 0.04,
    color: new THREE.Color('#00e5c8'),
    transparent: true,
    opacity: 0.4,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }), [])

  useFrame(() => {
    if (!ref.current) return
    const pos = ref.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < RAIN; i++) {
      pos[i * 3 + 1] -= speeds[i]
      if (pos[i * 3 + 1] < -20) {
        pos[i * 3 + 1] = 60
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return <points ref={ref} geometry={geometry} material={material} />
}
