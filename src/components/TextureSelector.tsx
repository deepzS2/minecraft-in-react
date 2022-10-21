import Image from 'next/future/image'
import { useEffect, useState } from 'react'

import { dirtImg, glassImg, grassImg, logImg, woodImg } from '../assets/images'
import { useKeyboard } from '../hooks/useKeyboard'
import { useStore } from '../hooks/useStore'

const images = {
	dirt: dirtImg,
	grass: grassImg,
	glass: glassImg,
	wood: woodImg,
	log: logImg,
}

export function TextureSelector() {
	const { dirt, glass, grass, log, wood } = useKeyboard()
	const [visible, setVisible] = useState(false)

	const activeTexture = useStore((state) => state.texture)
	const setTexture = useStore((state) => state.setTexture)

	useEffect(() => {
		const pressedTexture = Object.entries({
			dirt,
			glass,
			grass,
			log,
			wood,
		}).find(([_k, v]) => v)

		if (pressedTexture) {
			setTexture(pressedTexture[0])
		}
	}, [dirt, glass, grass, log, setTexture, wood])

	useEffect(() => {
		const visibilityTimeout = setTimeout(() => {
			setVisible(false)
		}, 2000)

		setVisible(true)

		return () => {
			clearTimeout(visibilityTimeout)
		}
	}, [activeTexture])

	return (
		visible && (
			<div className="absolute flex top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[10]">
				{Object.entries(images).map(([k, img]) => (
					<Image
						className={activeTexture === k && 'border-2 border-red-700'}
						width={16}
						height={16}
						key={k}
						src={img.src}
						alt={k}
					/>
				))}
			</div>
		)
	)
}
