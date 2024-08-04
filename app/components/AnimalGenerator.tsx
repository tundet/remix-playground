import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { AnimalTraits } from '~/types/AnimalTraits';
import { createAnimal } from '~/utils/createAnimal';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { useTranslation } from 'react-i18next';

const AnimalGenerator: React.FC = () => {
  const { t } = useTranslation();
  const [traits, setTraits] = useState<AnimalTraits>({
    color: '#8B4513',
    horns: 1,
    eyes: 1,
    legs: 1,
    wings: 0,
    tail: 1,
    snout: 0,
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      const scene = new THREE.Scene();
      sceneRef.current = scene;
      const camera = new THREE.PerspectiveCamera(
        75,
        containerRef.current.clientWidth / containerRef.current.clientHeight,
        0.1,
        1000
      );
      camera.position.set(3, 3, 3);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      containerRef.current.appendChild(renderer.domElement);

      const ambientLight = new THREE.AmbientLight(0x404040);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
      directionalLight.position.set(10, 10, 5).normalize();
      scene.add(directionalLight);

      const animal = createAnimal(scene, traits);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.target.copy(animal.position);
      controls.update();

      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };

      animate();

      return () => {
        containerRef.current?.removeChild(renderer.domElement);
      };
    }
  }, [traits]);

  const handleExport = () => {
    if (sceneRef.current) {
      const exporter = new GLTFExporter();
      exporter.parse(
        sceneRef.current,
        (result) => {
          if (result instanceof ArrayBuffer) {
            const blob = new Blob([result], { type: 'model/gltf-binary' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'model.glb';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
          } else {
            console.error('Error: Expected result to be an ArrayBuffer');
          }
        },
        (error) => {
          console.error('An error happened during parsing', error);
        },
        {
          binary: true,
          trs: true,
          onlyVisible: true,
          truncateDrawRange: true,
          embedImages: true,
          animations: [],
          forceIndices: true,
          //forcePowerOfTwoTextures: true,
        }
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'select-one') {
      setTraits(prev => ({
        ...prev,
        [name]: parseInt(value, 10),
      }));
    } else {
      setTraits(prev => ({
        ...prev,
        [name]: parseInt(value, 10) || value,
      }));
    }
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTraits(prev => ({
      ...prev,
      color: e.target.value,
    }));
  };

  const handleGenerate = () => {
    setTraits({ ...traits });
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-100 p-6 border-r border-gray-300">
        <h1 className="text-3xl font-bold mb-6 text-center">{t('animalGenerator.traits')}</h1>
        <div className="space-y-4">
          <div>
            <label className="block text-lg font-medium mb-2">
              {t('animalGenerator.color')}:
              <input
                type="color"
                name="color"
                value={traits.color}
                onChange={handleColorChange}
                className="block mt-2 w-full border border-gray-300 rounded-md p-2"
              />
            </label>
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">
              {t('animalGenerator.horns')}:
              <select name="horns" value={traits.horns} onChange={handleChange} className="block mt-2 w-full border border-gray-300 rounded-md p-2">
                <option value={0}>{t('animalGenerator.hornsOptions.none')}</option>
                <option value={1}>{t('animalGenerator.hornsOptions.unicorn')}</option>
                <option value={2}>{t('animalGenerator.hornsOptions.goat')}</option>
                <option value={3}>{t('animalGenerator.hornsOptions.devil')}</option>
              </select>
            </label>
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">
              {t('animalGenerator.eyes')}:
              <select name="eyes" value={traits.eyes} onChange={handleChange} className="block mt-2 w-full border border-gray-300 rounded-md p-2">
                <option value={1}>{t('animalGenerator.eyesOptions.small')}</option>
                <option value={2}>{t('animalGenerator.eyesOptions.medium')}</option>
                <option value={3}>{t('animalGenerator.eyesOptions.large')}</option>
              </select>
            </label>
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">
              {t('animalGenerator.legs')}:
              <select name="legs" value={traits.legs} onChange={handleChange} className="block mt-2 w-full border border-gray-300 rounded-md p-2">
                <option value={1}>{t('animalGenerator.legsOptions.short')}</option>
                <option value={2}>{t('animalGenerator.legsOptions.medium')}</option>
                <option value={3}>{t('animalGenerator.legsOptions.long')}</option>
              </select>
            </label>
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">
              {t('animalGenerator.wings')}:
              <input
                type="number"
                name="wings"
                value={traits.wings}
                min="0"
                onChange={handleChange}
                className="block mt-2 w-full border border-gray-300 rounded-md p-2"
              />
            </label>
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">
              {t('animalGenerator.tail')}:
              <select name="tail" value={traits.tail} onChange={handleChange} className="block mt-2 w-full border border-gray-300 rounded-md p-2">
                <option value={1}>{t('animalGenerator.legsOptions.short')}</option>
                <option value={2}>{t('animalGenerator.legsOptions.medium')}</option>
                <option value={3}>{t('animalGenerator.legsOptions.long')}</option>
              </select>
            </label>
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">
              {t('animalGenerator.snout')}:
              <select name="snout" value={traits.snout} onChange={handleChange} className="block mt-2 w-full border border-gray-300 rounded-md p-2">
                <option value={0}>{t('animalGenerator.snoutOptions.none')}</option>
                <option value={1}>{t('animalGenerator.snoutOptions.crocodile')}</option>
                <option value={2}>{t('animalGenerator.snoutOptions.dog')}</option>
                <option value={3}>{t('animalGenerator.snoutOptions.pig')}</option>
              </select>
            </label>
          </div>
          <div>
            <button
              onClick={() => console.log(traits)}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
            >
              {t('animalGenerator.generate')}
            </button>
            <button onClick={handleExport} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-full mt-4">
              Export as GLB
            </button>
          </div>
        </div>
      </div>
      <div className="w-3/4 p-6 bg-gray-50 flex items-center justify-center border-l border-gray-300">
        <div className="w-full h-full">
          <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
        </div>
      </div>
    </div>
  );
};

export default AnimalGenerator;
