import React, { useEffect, useState, useRef } from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Canvas, useThree, extend, useRender } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { TextureLoader, MeshStandardMaterial } from 'three'
import MaskGLTF from './model/mask.gltf'
import textureEx from './texture/grass.jpeg'

extend({ OrbitControls })

const texture = new TextureLoader().load(textureEx);

console.log(texture)
const material = new MeshStandardMaterial({
  map: texture // 皮膚貼圖
})
// const material = new  MeshBasicMaterial({ map: texture });

const Controls = props => {
  const { gl, camera } = useThree()
  const ref = useRef()
  useRender(() => ref.current.update())
  return <orbitControls ref={ref} args={[camera, gl.domElement]} {...props} />
}


const Model = () => {

  // const texture = new TextureLoader().load(textureEx);
  // const material = new  MeshBasicMaterial({ map: texture });

  const [model, setModel] = useState()

  useEffect(() => {
    new GLTFLoader().load(MaskGLTF, (gltf) => {
      // gltf.scene.traverse((o) => {
      //   o.material = material
      // })
      
      setModel(gltf)
    })
  }, [])


  return (
    model ? <primitive 
      object= {model.scene} 
      map={texture}
      scale= {[0.008, 0.008, 0.008]}
      rotation= {[0, 1.7, 0]}
      position={[0, -2, 0]} 
      onClick={() => {
        model.scene.traverse((o) => {
          o.material = material
        })
      }}>
      </primitive> : null
  )
}






function App() {
  return (
      <Canvas updateDefaultCamera = {true} >
        <spotLight  position={[300, 300, 4000]} />
       <directionalLight color={0xffffff} intensity={1}/>
        <Model/>
        <Controls 
          autoRotate
          enablePan={false}
          enableZoom={false}
          enableDamping
          dampingFactor={0.5}
          rotateSpeed={1}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}/>
      </Canvas>
  );
}

export default App;
