import { useState, useEffect, useCallback } from 'react'

const keyActions = {
	KeyW: 'forward',
	KeyS: 'backward',
	KeyA: 'left',
	KeyD: 'right',
	Space: 'up',
	Digit1: 'dirt',
	Digit2: 'grass',
	Digit3: 'glass',
	Digit4: 'wood',
	Digit5: 'log',
}

export const useKeyboard = () => {
	const [actions, setActions] = useState({
		forward: false,
		backward: false,
		left: false,
		right: false,
		up: false,
		dirt: false,
		grass: false,
		glass: false,
		wood: false,
		log: false,
	})

	const handleKeyDown = useCallback((e: KeyboardEvent) => {
		const action = keyActions[e.code]

		if (action) {
			setActions((prev) => ({ ...prev, [action]: true }))
		}
	}, [])

	const handleKeyUp = useCallback((e: KeyboardEvent) => {
		const action = keyActions[e.code]

		if (action) {
			setActions((prev) => ({ ...prev, [action]: false }))
		}
	}, [])

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown)
		document.addEventListener('keyup', handleKeyUp)

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
			document.removeEventListener('keyup', handleKeyUp)
		}
	}, [handleKeyDown, handleKeyUp])

	return actions
}
