import { BufferGeometry, Material, Mesh } from 'three'

import { usePlane } from '@react-three/cannon'
import { ThreeEvent } from '@react-three/fiber'

import { useTextures } from '../assets/textures'
import { useStore } from '../hooks/useStore'

export function Ground() {
	const { groundTexture } = useTextures()
	const [ref] = usePlane<Mesh<BufferGeometry, Material | Material[]>>(() => ({
		rotation: [-Math.PI / 2, 0, 0],
		position: [0, -0.5, 0],
	}))

	const addCube = useStore((state) => state.addCube)

	const onClick = (e: ThreeEvent<MouseEvent>) => {
		e.stopPropagation()

		if (e.nativeEvent.button === 2) {
			const [x, y, z] = Object.values(e.point).map((val) => Math.ceil(val))
			addCube(x, y, z)
		}
	}

	return (
		<mesh onClick={onClick} ref={ref}>
			<planeBufferGeometry attach="geometry" args={[100, 100]} />
			<meshStandardMaterial attach="material" map={groundTexture} />
		</mesh>
	)
}
