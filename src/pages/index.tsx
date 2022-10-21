import { Physics } from '@react-three/cannon'
import { Sky } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

import { Cubes } from '../components/Cubes'
import { FirstPersonView } from '../components/FirstPersonView'
import { Ground } from '../components/Ground'
import { Menu } from '../components/Menu'
import { Player } from '../components/Player'
import { TextureSelector } from '../components/TextureSelector'

const IndexPage = () => (
	<>
		<Canvas>
			<Sky sunPosition={[100, 100, 20]} />
			<ambientLight intensity={0.5} />
			<FirstPersonView />
			<Physics>
				<Player />
				<Cubes />
				<Ground />
			</Physics>
		</Canvas>
		<TextureSelector />
		<Menu />
		<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
			+
		</div>
	</>
)

export default IndexPage
