import { Canvas, useFrame } from "@react-three/fiber"
import HeroText from "../components/HeroText"
import ParallaxBg from "../components/ParallaxBg"
import {Astronaut} from "../components/Astronaut"
import Loader from "../components/Loader" 
import { Environment, OrbitControls, Sparkles } from "@react-three/drei"
import { useMediaQuery } from "react-responsive"
import { easing } from "maath"
import { Float, Bounds } from "@react-three/drei";
import { Suspense, useState, useEffect } from "react"
import {Wizard} from "../components/Wizard"


const Hero = () => {
    const isMobile = useMediaQuery({ maxWidth: 853 });
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        setTimeout(()=> {
            setLoaded(true)
        }, 5000)
    }, []);
  return (
    <section className="flex items-start justify-center md:items-start md:justify-start min-h-screen overflow-hidden c-space">
        <HeroText />
        <ParallaxBg />
        <figure className="absolute inset-0" 
            style={{
                width: "100vw",
                height: "100vh"
            }}>
                {/* <Canvas camera={{position:[0,1,3]}}>
                    <Suspense fallback={<Loader />}>
                        <Float>
                            <Astronaut 
                                scale={isMobile && 0.23} 
                                position={isMobile && [0, -1.5, 0]}
                            />
                        </Float>
                    </Suspense>
                    <OrbitControls />
 https://wikipedia25.org/es/which-wikipedia-of-the-future-are-you/question/1                   <Rig />
                </Canvas> */}
            <Canvas 
                shadows 
                camera={{ position: isMobile ? [0, -0.5, 1] : [0,1,3], fov: 50 }}
                gl={{ alpha: true, antialias: true }}
                style={{ background: 'transparent'}}>
                <Suspense fallback={<Loader />}>
                    <ambientLight intensity={0.15} /> 
                    <directionalLight position={[5, 100, 3]} intensity={1} castShadow />
                    <Environment preset="forest" />
                    <Float>
                        <Wizard
                            scale={isMobile ? 1 : 1.4} 
                            position={isMobile ? [0, 0, 0.5] : [0.25, 0.75, 1.2]}
                            rotation={isMobile ? [-1, 0, 0] : [0 , 5.5, -0.1]}
                        />
                        
                    </Float>
                </Suspense>
                <OrbitControls  enableDamping={false} enableZoom={false} enableRotate={false} enablePan={false}/>
                <Rig />
                <Sparkles hidden={loaded} Sparkles count={15} scale={3} size={6} speed={0.4} />
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