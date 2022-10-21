import { useState } from 'react'
import { Mesh, Material, BufferGeometry } from 'three'

import { useBox } from '@react-three/cannon'
import { ThreeEvent } from '@react-three/fiber'

import { useTextures } from '../assets/textures'
import { useStore } from '../hooks/useStore'

interface Props {
	position: [number, number, number]
	texture: string
}

export function Cube({ position, texture }: Props) {
	const [isHovered, setIsHovered] = useState(false)
	const textures = useTextures()
	const [ref] = useBox<Mesh<BufferGeometry, Material | Material[]>>(() => ({
		type: 'Static',
		position,
	}))

	const activeTexture = textures[`${texture}Texture`]

	const addCube = useStore((state) => state.addCube)
	const removeCube = useStore((state) => state.removeCube)

	const onHover = (e: ThreeEvent<MouseEvent>, hovered: boolean) => {
		e.stopPropagation()
		setIsHovered(hovered)
	}
	const onClick = (e: ThreeEvent<MouseEvent>) => {
		e.stopPropagation()

		const { x, y, z } = ref.current.position

		if (e.nativeEvent.button === 0) {
			removeCube(x, y, z)
		}

		if (e.nativeEvent.button === 2) {
			const clickedFace = Math.floor(e.faceIndex / 2)

			if (clickedFace === 0) addCube(x + 1, y, z)
			else if (clickedFace === 1) addCube(x - 1, y, z)
			else if (clickedFace === 2) addCube(x, y + 1, z)
			else if (clickedFace === 3) addCube(x, y - 1, z)
			else if (clickedFace === 4) addCube(x, y, z + 1)
			else if (clickedFace === 5) addCube(x, y, z - 1)
		}
	}

	return (
		<mesh
			onPointerMove={(e) => onHover(e, true)}
			onPointerOut={(e) => onHover(e, false)}
			onClick={onClick}
			ref={ref}
		>
			<boxBufferGeometry attach="geometry" />
			<meshStandardMaterial
				color={isHovered ? 'grey' : 'white'}
				map={activeTexture}
				transparent={true}
				opacity={activeTexture === 'glass' ? 0.6 : 1}
				attach="material"
			/>
		</mesh>
	)
}
