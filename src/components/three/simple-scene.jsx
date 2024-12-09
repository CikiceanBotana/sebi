'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const SimpleScene = ({ bassValue = 0 }) => {
  const mountRef = useRef(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [error, setError] = useState('');
  const modelRef = useRef(null);
  const initialScaleRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      35,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.5, 11);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    
    while (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }
    mountRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const gridSize = 3;
    const spread = 10;
    const intensity = 0.12;

    for (let x = -1; x <= 1; x++) {
        for (let z = -1; z <= 1; z++) {
            const light = new THREE.DirectionalLight(0xffffff, intensity);
            light.position.set(x * spread, 0, 15 + (z * spread));
            light.target.position.set(x * spread * 0.5, 0, 0);
            scene.add(light);
            scene.add(light.target);
        }
    }

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.3);
    hemiLight.position.set(0, 15, 0);
    scene.add(hemiLight);

    const manager = new THREE.LoadingManager();
    manager.onProgress = (url, loaded, total) => {
      const percentage = (loaded / total) * 100;
      setLoadingProgress(Math.round(percentage));
    };

    const loader = new GLTFLoader(manager);

    try {
      loader.load(
        '/models/tablou.glb',
        (gltf) => {
          const model = gltf.scene;
          const box = new THREE.Box3().setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());

          const maxDim = Math.max(size.x, size.y, size.z);
          const scale = 6.5 / maxDim;
          model.scale.setScalar(scale);
          initialScaleRef.current = scale;

          // Modified position - moved 1 unit to the left (-X direction)
          model.position.set(
            (-center.x * scale) - 0.25, // Subtract 1 to move left
            -center.y * scale + 0.2,
            -center.z * scale
          );
          model.rotation.set(0, 0, 0);

          scene.add(model);
          modelRef.current = model;
          setLoadingProgress(100);
        },
        undefined,
        (error) => {
          console.error('Error loading model:', error);
          setError(`Failed to load 3D model: ${error.message}`);
        }
      );
    } catch (err) {
      console.error('Exception while loading:', err);
      setError(`Exception while loading: ${err}`);
    }

    const mouse = new THREE.Vector2();
    const windowHalf = new THREE.Vector2(
      window.innerWidth / 2,
      window.innerHeight / 2
    );

    const handleMouseMove = (event) => {
      mouse.x = (event.clientX - windowHalf.x) / windowHalf.x;
      mouse.y = (event.clientY - windowHalf.y) / windowHalf.y;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (modelRef.current) {
        const elapsedTime = clock.getElapsedTime();
        modelRef.current.position.y += Math.sin(elapsedTime) * 0.0005;
        modelRef.current.position.x += Math.cos(elapsedTime * 0.5) * 0.0003;

        const targetRotationX = mouse.y * 0.1;
        const targetRotationY = mouse.x * 0.1;
        
        modelRef.current.rotation.x += (targetRotationX - modelRef.current.rotation.x) * 0.02;
        modelRef.current.rotation.y += (targetRotationY - modelRef.current.rotation.y) * 0.02;

        // Update scale based on bass value
        if (initialScaleRef.current) {
          const scaleMultiplier = 1 + (bassValue * 0.15);
          const newScale = initialScaleRef.current * scaleMultiplier;
          modelRef.current.scale.setScalar(newScale);
        }
      }
      
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (mountRef.current) {
        while (mountRef.current.firstChild) {
          mountRef.current.removeChild(mountRef.current.firstChild);
        }
      }
      renderer.dispose();
      if (modelRef.current) {
        scene.remove(modelRef.current);
        modelRef.current.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.geometry.dispose();
            if (object.material.dispose) {
              object.material.dispose();
            }
          }
        });
      }
    };
  }, [bassValue]);

  return (
    <div className="w-full h-full relative flex items-center justify-center overflow-visible">
      {error ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-[#FAFAFA] opacity-50">{error}</p>
        </div>
      ) : loadingProgress < 100 ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-[#FAFAFA] opacity-50">
            Loading model... {loadingProgress}%
          </p>
        </div>
      ) : null}
      <div ref={mountRef} className="w-full h-full absolute inset-0 overflow-visible" />
    </div>
  );
};

export default SimpleScene;