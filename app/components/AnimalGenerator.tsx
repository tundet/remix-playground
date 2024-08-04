import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { AnimalTraits, HornType, TailLength, SnoutType } from '~/types/AnimalTraits';
import { createAnimal } from '~/utils/createAnimal';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { useTranslation } from 'react-i18next';

const AnimalGenerator: React.FC = () => {
  const { t } = useTranslation();
  const [traits, setTraits] = useState<AnimalTraits>({
    color: '#8B4513',
    horns: HornType.Unicorn,
    eyes: 1,
    legs: 1,
    wings: false,
    tail: TailLength.Short,
    snout: SnoutType.Default,
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const scene = new THREE.Scene();
      sceneRef.current = scene;
      const camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );
      camera.position.set(4, 3, 3);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(renderer.domElement);

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
        container?.removeChild(renderer.domElement);
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
        }
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const input = e.target as HTMLInputElement;
      setTraits(prev => ({
        ...prev,
        [name]: input.checked,
      }));
    } else if (type === 'select-one') {
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
    setTraits((prev) => ({
      ...prev,
      color: e.target.value,
    }));
  };

  return (
    <div className="flex">
      <div className="w-2/5 bg-gray-100 p-6 border-r border-gray-300">
        <h3 className="text-3xl font-bold mt-0 mb-6 text-center">{t('animalGenerator.traits')}</h3>
        <div className="space-y-2">
          <div className="block text-lg font-medium mb-2">
            <input
              type="color"
              name="color"
              value={traits.color}
              onChange={handleColorChange}
              className="block w-full h-12 border border-gray-300 rounded-md p-2 mt-2"
            />
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
                <option value={0}>{t('animalGenerator.snoutOptions.default')}</option>
                <option value={1}>{t('animalGenerator.snoutOptions.crocodile')}</option>
                <option value={2}>{t('animalGenerator.snoutOptions.dog')}</option>
                <option value={3}>{t('animalGenerator.snoutOptions.pig')}</option>
              </select>
            </label>
          </div>
          <div>
            <label className="flex mt-5 items-center text-lg font-medium mb-2">
              <input
                type="checkbox"
                name="wings"
                checked={traits.wings}
                onChange={handleChange}
                className="custom-checkbox mr-2"
              />
              {t('animalGenerator.wings')}
            </label>
          </div>
          <div>
            <button onClick={handleExport} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-full mt-4">
              {t('animalGenerator.export')}
            </button>
          </div>
        </div>
      </div>
      <div className="w-5/6 p-6 bg-gray-50 flex items-center justify-center border-l border-gray-300">
        <div className="w-full h-full">
          <div
            ref={containerRef}
            className="w-full h-full"
            style={{ minHeight: '0', height: '100%' }}
          />
        </div>
      </div>
    </div>

  );
};

export default AnimalGenerator;
