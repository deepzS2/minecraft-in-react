import { useStore } from '../hooks/useStore'

export function Menu() {
	const resetWorld = useStore((state) => state.resetWorld)

	return (
		<div className="absolute top-3 left-3">
			<button onClick={resetWorld}>Reset</button>
		</div>
	)
}
