import { NearestFilter, RepeatWrapping, TextureLoader } from 'three'

import { useLoader } from '@react-three/fiber'

import * as images from './images'

export const useTextures = () => {
	const dirtTexture = useLoader(TextureLoader, images.dirtImg.src)
	const logTexture = useLoader(TextureLoader, images.logImg.src)
	const grassTexture = useLoader(TextureLoader, images.grassImg.src)
	const glassTexture = useLoader(TextureLoader, images.glassImg.src)
	const woodTexture = useLoader(TextureLoader, images.woodImg.src)
	const groundTexture = useLoader(TextureLoader, images.grassImg.src)

	dirtTexture.magFilter = NearestFilter
	logTexture.magFilter = NearestFilter
	grassTexture.magFilter = NearestFilter
	glassTexture.magFilter = NearestFilter
	woodTexture.magFilter = NearestFilter
	groundTexture.magFilter = NearestFilter
	groundTexture.wrapS = RepeatWrapping
	groundTexture.wrapT = RepeatWrapping
	groundTexture.repeat.set(100, 100)

	return {
		dirtTexture,
		logTexture,
		glassTexture,
		grassTexture,
		woodTexture,
		groundTexture,
	}
}
