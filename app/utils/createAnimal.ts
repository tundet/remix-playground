import * as THREE from 'three';
import { AnimalTraits } from '~/types/AnimalTraits';

export function createAnimal(scene: THREE.Scene, traits: AnimalTraits): THREE.Group {
    const animal = new THREE.Group();
    const { color, horns, eyes, legs, wings, tail, snout } = traits;

    const animalColor = new THREE.Color(color);

    // Body
    const bodyGeometry = new THREE.BoxGeometry(2, 1, 1);
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: animalColor });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.set(0, 0.5, 0);
    animal.add(body);

    // Head
    const headGeometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
    const headMaterial = new THREE.MeshStandardMaterial({ color: animalColor });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.set(1.4, 1, 0);
    animal.add(head);

    // Eyes
    const eyeSize = eyes === 1 ? 0.1 : eyes === 2 ? 0.15 : 0.2;
    const eyeGeometry = new THREE.SphereGeometry(eyeSize, 16, 16);
    const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });

    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(1.8, 1.2, 0.2);
    animal.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(1.8, 1.2, -0.2);
    animal.add(rightEye);

    // Horns & Snouts
    createHorns(animal, horns, animalColor);
    createSnout(animal, snout, animalColor);

    // Legs
    const legSizes = [0.5, 1, 1.5];
    const legSize = legSizes[legs - 1] || 1;
    const legGeometry = new THREE.BoxGeometry(0.3, legSize, 0.3);
    const legMaterial = new THREE.MeshStandardMaterial({ color: animalColor });

    const legOffsetY = - 0.1 - legSize / 8;

    for (let i = 0; i < 4; i++) {
        const leg = new THREE.Mesh(legGeometry, legMaterial);
        leg.position.set((i < 2 ? 0.8 : -0.8), legOffsetY, (i % 2 === 0 ? 0.35 : -0.35));
        animal.add(leg);
    }

    // Wings
    if (wings > 0) {
        const wingGeometry = new THREE.PlaneGeometry(1.5, 0.5);
        const wingMaterial = new THREE.MeshStandardMaterial({ color: animalColor });

        for (let i = 0; i < wings; i++) {
            const wing = new THREE.Mesh(wingGeometry, wingMaterial);
            wing.position.set(0, 1, i % 2 === 0 ? 0.8 : -0.8);
            wing.rotation.z = Math.PI / 4;
            animal.add(wing);
        }
    }

    // Tail
    if (tail > 0) {
        const tailGeometry = createTail(tail);
        const tailMaterial = new THREE.MeshStandardMaterial({ color: animalColor });
        const tailMesh = new THREE.Mesh(tailGeometry, tailMaterial);
        tailMesh.position.set(-1, 0.5, 0);
        tailMesh.rotation.z = Math.PI / 4;
        animal.add(tailMesh);
    }

    scene.add(animal);
    return animal;
}

const createHorns = (animal: THREE.Group, type: number, color: THREE.Color) => {
    const hornMaterial = new THREE.MeshStandardMaterial({ color });
    let hornGeometry;
    switch (type) {
        case 1: // Unicorn Horn
            hornGeometry = new THREE.ConeGeometry(0.1, 1, 32);
            const unicornHorn = new THREE.Mesh(hornGeometry, hornMaterial);
            unicornHorn.position.set(1.6, 1.6, 0);
            animal.add(unicornHorn);
            break;
        case 2: // Goat Horn
            hornGeometry = new THREE.TorusGeometry(0.1, 0.1, 16, 100, Math.PI);
            const leftGoatHorn = new THREE.Mesh(hornGeometry, hornMaterial);
            leftGoatHorn.position.set(1.6, 1.4, 0.3);
            animal.add(leftGoatHorn);
            const rightGoatHorn = new THREE.Mesh(hornGeometry, hornMaterial);
            rightGoatHorn.position.set(1.6, 1.4, -0.3);
            animal.add(rightGoatHorn);
            break;
        case 3: // Devil Horn
            hornGeometry = new THREE.ConeGeometry(0.1, 0.2, 32);
            const leftDevilHorn = new THREE.Mesh(hornGeometry, hornMaterial);
            leftDevilHorn.position.set(1.6, 1.5, 0.3);
            animal.add(leftDevilHorn);
            const rightDevilHorn = new THREE.Mesh(hornGeometry, hornMaterial);
            rightDevilHorn.position.set(1.6, 1.5, -0.3);
            animal.add(rightDevilHorn);
            break;
        default:
            break;
    }
};

const createTail = (type: number) => {
    let tailGeometry;
    switch (type) {
        case 1: // Short Tail
            tailGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.5, 32);
            break;
        case 2: // Medium Tail
            tailGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 32);
            break;
        case 3: // Long Tail
            tailGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1.5, 32);
            break;
        default:
            tailGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 32);
    }
    return tailGeometry;
};

const createSnout = (animal: THREE.Group, type: number, color: THREE.Color) => {
    const snoutMaterial = new THREE.MeshStandardMaterial({ color });
    let snoutGeometry;
    switch (type) {
        case 1: // Crocodile Snout
            snoutGeometry = new THREE.BoxGeometry(1.8, 0.4, 0.8);
            break;
        case 2: // Dog Snout
            snoutGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.4, 32);
            break;
        case 3: // Pig Snout
            snoutGeometry = new THREE.SphereGeometry(0.2, 32, 32);
            break;
        default:
            snoutGeometry = new THREE.BoxGeometry(0.5, 0.2, 0.2);
    }
    const snoutMesh = new THREE.Mesh(snoutGeometry, snoutMaterial);
    snoutMesh.position.set(2, 0.9, 0);
    animal.add(snoutMesh);
};