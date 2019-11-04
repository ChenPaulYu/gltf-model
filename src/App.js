import React, { useEffect, useState, useRef } from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Canvas, useThree, extend, useRender } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import MaskGLTF from './model/mask.gltf'


extend({ OrbitControls })

const Controls = props => {
  const { gl, camera } = useThree()
  const ref = useRef()
  useRender(() => ref.current.update())
  return <orbitControls ref={ref} args={[camera, gl.domElement]} {...props} />
}


const Model = () => {

  const [model, setModel] = useState()

  useEffect(() => {
    new GLTFLoader().load(MaskGLTF, setModel)
  }, [])

  return (
    model ? <primitive 
      object   = {model.scene} 
      scale    = {[0.008, 0.008, 0.008]}
      rotation   = {[0, 1.7, 0]}
      position ={[0, -2, 0]} /> : null
  )
}






function App() {
  return (
      <Canvas updateDefaultCamera = {true} camera={{near: 1}}>
        <ambientLight intensity={0.5} />
        <spotLight intensity={0.5} position={[300, 300, 4000]} />
        <Model />
        <Controls />
      </Canvas>
  );
}

export default App;
