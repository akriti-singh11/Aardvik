import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';

const Triangle = ({ position, rotation }) => {
  const geometry = new THREE.BufferGeometry();
  
  // Defining vertices for a triangle (each group of three numbers defines a point)
  const vertices = new Float32Array([
    0, 1, 0, // top vertex
    -1, -1, 0, // bottom left
    1, -1, 0, // bottom right
  ]);

  // Create BufferAttribute and set the position
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  
  const material = new THREE.MeshStandardMaterial({ color: 'yellow' });

  return (
    <mesh geometry={geometry} material={material} position={position} rotation={rotation} />
  );
};

export default function StarShape() {
  return (

    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      
      {/* First triangle */}
      <Triangle position={[0, 0, 0]} rotation={[0, 0, 0]} />
      
    
     <Triangle position={[-0.3,-0.2, 0]} rotation={[0, 0, Math.PI / 3]}/>
      

    </Canvas>
  );
}
