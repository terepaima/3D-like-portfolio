import { Canvas, useFrame } from "@react-three/fiber"
import HeroText from "../components/HeroText"
import ParallaxBg from "../components/ParallaxBg"
import {Astronaut} from "../components/Astronaut"
import Loader from "../components/Loader" 
import { OrbitControls } from "@react-three/drei"
import { useMediaQuery } from "react-responsive"
import { easing } from "maath"
import { Float } from "@react-three/drei";
import { Suspense } from "react"

const Hero = () => {
    const isMobile = useMediaQuery({ maxWidth: 853 })
  return (
    <section className="flex items-start justify-center md:items-start md:justify-start min-h-screen overflow-hidden c-space">
        <HeroText />
        <ParallaxBg />
        <figure className="absolute inset-0" 
            style={{
                width: "100vw",
                height: "100vh"
            }}>
            <Canvas camera={{position:[0,1,3]}}>
                <Suspense fallback={<Loader />}>
                    <Float>
                        <Astronaut 
                            scale={isMobile && 0.23} 
                            position={isMobile && [0, -1.5, 0]}
                        />
                    </Float>
                </Suspense>
                <OrbitControls />
                <Rig />
            </Canvas>
        </figure>
    </section>
  )
}

function Rig() {
    return useFrame((state, delta) => {
        easing.damp3(
            state.camera.position,
            [state.mouse.x, 1 + state.mouse.y, 3],
            0.5, 
            delta
        )
    });
}

export default Hero