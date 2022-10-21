import { nanoid } from 'nanoid'
import create from 'zustand'
import { persist } from 'zustand/middleware'

type Vector3Array = [number, number, number]

interface Cube {
	key: string
	pos: Vector3Array
	texture: string
}

interface Store {
	texture: string
	cubes: Cube[]
	addCube: (x: number, y: number, z: number) => any
	removeCube: (x: number, y: number, z: number) => any
	setTexture: (texture: string) => any
	resetWorld: () => any
}

export const useStore = create<Store>()(
	persist(
		(set) => ({
			texture: 'dirt',
			cubes: [
				{
					key: nanoid(),
					pos: [2, 0.5, 0],
					texture: 'dirt',
				},
			],
			addCube: (x, y, z) => {
				set((prev) => ({
					cubes: [
						...prev.cubes,
						{ key: nanoid(), pos: [x, y, z], texture: prev.texture },
					],
				}))
			},
			removeCube: (x, y, z) => {
				set((prev) => ({
					cubes: prev.cubes.filter((cube) => {
						const [cubeX, cubeY, cubeZ] = cube.pos

						return cubeX !== x || cubeY !== y || cubeZ !== z
					}),
				}))
			},
			setTexture: (texture) => {
				set(() => ({
					texture,
				}))
			},
			resetWorld: () => {
				set(() => ({
					cubes: [],
				}))
			},
		}),
		{
			name: 'minecraft-react',
			getStorage: () => localStorage,
		}
	)
)
