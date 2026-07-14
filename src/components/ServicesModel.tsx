import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'

interface ServicesModelProps {
  servicesProgress: React.MutableRefObject<number>
}

export default function ServicesModel({ servicesProgress }: ServicesModelProps) {
  const groupRef = useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF('/services.glb')
  const { mixer } = useAnimations(animations, groupRef)
  const clonedScene = useRef(scene.clone(true)).current

  useEffect(() => {
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        mesh.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color('#00e5c8'),
          emissive: new THREE.Color('#003a33'),
          emissiveIntensity: 0.5,
          metalness: 0.7,
          roughness: 0.25,
          transparent: true,
          opacity: 0,
          depthWrite: false,
        })
      }
    })
  }, [clonedScene])

  useEffect(() => {
    if (animations.length > 0 && mixer) {
      animations.forEach((clip) => {
        const action = mixer.clipAction(clip)
        action.play()
        action.paused = true
        action.time = 0
      })
    }
  }, [animations, mixer])

  useFrame(() => {
    if (!groupRef.current) return
    const sp = servicesProgress.current

    const targetOpacity = Math.min(1, sp * 8)
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial
        if (mat && mat.transparent) {
          mat.opacity += (targetOpacity - mat.opacity) * 0.1
          mat.needsUpdate = true
        }
      }
    })

    const slideP = Math.min(1, sp / 0.25)
    const slideE = 1 - Math.pow(1 - slideP, 4)
    groupRef.current.position.x = 14 - slideE * 10.5
    groupRef.current.position.y = -1.0
    groupRef.current.position.z = -1.0

    const scaleTarget = 0.7 + slideE * 0.4
    groupRef.current.scale.setScalar(scaleTarget)
    groupRef.current.rotation.y += 0.004

    if (animations.length > 0 && mixer) {
      const animT = Math.max(0, Math.min(1, (sp - 0.1) / 0.8))
      animations.forEach((clip) => {
        const action = mixer.clipAction(clip)
        if (action) {
          action.time = animT * clip.duration
        }
      })
      mixer.update(0)
    }
  })

  return (
    <group ref={groupRef}>
      <pointLight color="#00e5c8" intensity={3} distance={7} decay={2} />
      <pointLight color="#ffffff" intensity={0.5} distance={4} decay={2} position={[0, 2, 2]} />
      <primitive object={clonedScene} />
    </group>
  )
}
