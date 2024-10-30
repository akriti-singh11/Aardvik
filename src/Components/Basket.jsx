import {Canvas} from '@react-three/fiber';
import * as THREE from 'three';
import React from 'react';


const Basket = () =>{
   return(
    <div className="canvas-container">
     <Canvas>
        <ambientLight/>
        <directionalLight position={[0,0,2]}/>
        <mesh position={[7.5,-1,-1]}>
            <boxGeometry args={[1.0,1.0,1.0]} />
            <meshStandardMaterial color="orange"/>

        </mesh>
       
     </Canvas>
     </div>
   );
}

export default Basket;