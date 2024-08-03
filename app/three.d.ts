declare module 'three/examples/jsm/loaders/GLTFLoader' {
    import { Loader } from 'three';
    import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
    export class GLTFLoader extends Loader {
      constructor();
      load(url: string, onLoad: (gltf: GLTF) => void, onProgress?: (event: ProgressEvent) => void, onError?: (error: ErrorEvent) => void): void;
    }
  }

  declare module 'three/examples/jsm/controls/OrbitControls' {
    import { Camera, EventDispatcher, Object3D, Vector2 } from 'three';
  
    export class OrbitControls extends EventDispatcher {
      constructor(camera: Camera, domElement: HTMLElement);
  
      enabled: boolean;
      target: Vector2;
      minDistance: number;
      maxDistance: number;
      minPolarAngle: number;
      maxPolarAngle: number;
      minAzimuthAngle: number;
      maxAzimuthAngle: number;
      enableDamping: boolean;
      dampingFactor: number;
      enableZoom: boolean;
      zoomSpeed: number;
      enableRotate: boolean;
      rotateSpeed: number;
      enablePan: boolean;
      panSpeed: number;
  
      update(): void;
      dispose(): void;
    }
  }

  declare module 'three/examples/jsm/exporters/GLTFExporter' {
    import * as THREE from 'three';
  
    export class GLTFExporter {
      constructor();
  
      parse(
        input: THREE.Object3D,
        onCompleted: (gltf: any) => void,
        options?: {
          binary?: boolean;
          trs?: boolean;
          onlyVisible?: boolean;
          truncateDrawRange?: boolean;
          embedImages?: boolean;
          animations?: THREE.AnimationClip[];
          forceIndices?: boolean;
          forcePowerOfTwoTextures?: boolean;
        }
      ): void;
  
      parseAsync(
        input: THREE.Object3D,
        options?: {
          binary?: boolean;
          trs?: boolean;
          onlyVisible?: boolean;
          truncateDrawRange?: boolean;
          embedImages?: boolean;
          animations?: THREE.AnimationClip[];
          forceIndices?: boolean;
          forcePowerOfTwoTextures?: boolean;
        }
      ): Promise<any>;
    }
  }
  