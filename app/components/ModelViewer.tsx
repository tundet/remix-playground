import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface ModelViewerProps {
  modelUrl: string;
}

const ModelViewer: React.FC<ModelViewerProps> = ({ modelUrl }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    if (container) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        30,
        container.clientWidth / container.clientHeight,
        0.01,
        50000
      );

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(renderer.domElement);

      const ambientLight = new THREE.AmbientLight(0xcccccc, 1);
      scene.add(ambientLight);

      const controls = new OrbitControls(camera, renderer.domElement);

      const loader = new GLTFLoader();
      loader.load(
        modelUrl,
        (gltf) => {
          const obj = gltf.scene;
          scene.add(obj);

          const box = new THREE.Box3().setFromObject(obj);
          const size = box.getSize(new THREE.Vector3());
          const center = box.getCenter(new THREE.Vector3());

          const maxDim = Math.max(size.x, size.y, size.z);
          const fov = camera.fov * (Math.PI / 180);
          let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
          
          cameraZ *= 1.5;
          
          camera.position.set(center.x, center.y, cameraZ);
          camera.lookAt(center);

          controls.target.set(center.x, center.y, center.z);
          controls.update();

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

      return () => {
        if (container) {
          container.removeChild(renderer.domElement);
        }
        controls.dispose();
        renderer.dispose();

        scene.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            if (object.geometry) object.geometry.dispose();
            if (object.material) {
              if (Array.isArray(object.material)) {
                object.material.forEach((material) => material.dispose());
              } else {
                object.material.dispose();
              }
            }
          }
        });
      };
    }
  }, [modelUrl]);

  return <div ref={containerRef} style={{ width: '100%', height: '500px' }} />;
};

export default ModelViewer;
