import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

interface ModelViewerProps {
  modelUrl: string;
}

const ModelViewer: React.FC<ModelViewerProps> = ({ modelUrl }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        30,
        containerRef.current.clientWidth / containerRef.current.clientHeight,
        0.01,
        50000
      );
      camera.position.set(20, 20, 20);
      camera.lookAt(new THREE.Vector3(0, 0, 0));

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      containerRef.current.appendChild(renderer.domElement);

      const ambientLight = new THREE.AmbientLight(0xcccccc, 1);
      scene.add(ambientLight);

      const controls = new OrbitControls(camera, renderer.domElement);

      const loader = new GLTFLoader();
      loader.load(
        modelUrl,
        (gltf) => {
          const obj = gltf.scene;
          obj.position.set(0, 0, 0);
          obj.receiveShadow = true;
          obj.castShadow = true;
          scene.add(obj);

          function animate() {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
          }
          animate();
        },
        undefined,
        (error) => {
          console.error('An error happened:', error);
        }
      );
    }
  }, [modelUrl]);

  return <div ref={containerRef} style={{ width: '100%', height: '100vh' }} />;
};

export default ModelViewer;
