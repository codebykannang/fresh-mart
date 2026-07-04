import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeDScene() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- SETUP SCENE, CAMERA, & RENDERER ---
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    // Add soft green ambient haze
    scene.fog = new THREE.FogExp2(0x022c22, 0.015);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // --- LIGHTS ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x34d399, 1.5); // Emerald light from top-left
    dirLight1.position.set(-5, 8, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xf59e0b, 1.2); // Warm gold light from bottom-right
    dirLight2.position.set(5, -5, 2);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffffff, 1, 10);
    pointLight.position.set(0, 0, 2);
    scene.add(pointLight);

    // --- MAIN 3D GLOBE / EARTH SPHERE ---
    // Represents organic world/green farm core
    const globeGeometry = new THREE.IcosahedronGeometry(2.5, 4);
    
    // Create a custom wireframe shader-like shiny material for the organic grid
    const globeMaterial = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      roughness: 0.2,
      metalness: 0.1,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    
    const globeSolidMaterial = new THREE.MeshStandardMaterial({
      color: 0x064e3b,
      roughness: 0.8,
      metalness: 0.2,
      transparent: true,
      opacity: 0.15
    });

    const globeGroup = new THREE.Group();
    const globeWire = new THREE.Mesh(globeGeometry, globeMaterial);
    const globeSolid = new THREE.Mesh(globeGeometry, globeSolidMaterial);
    globeGroup.add(globeWire);
    globeGroup.add(globeSolid);
    scene.add(globeGroup);

    // --- FLOATING FRUITS & LEAVES ---
    const floatingGroup = new THREE.Group();
    scene.add(floatingGroup);

    const items = [];

    // Materials
    const leafMaterial = new THREE.MeshStandardMaterial({
      color: 0x34d399,
      roughness: 0.3,
      metalness: 0.1,
      side: THREE.DoubleSide
    });

    const mangoMaterial = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.4,
      metalness: 0.1
    });

    const lemonMaterial = new THREE.MeshStandardMaterial({
      color: 0xfacc15,
      roughness: 0.3,
      metalness: 0.05
    });

    const coconutMaterial = new THREE.MeshStandardMaterial({
      color: 0xa3e635,
      roughness: 0.6,
      metalness: 0.1
    });

    // Helper: Create a Leaf Mesh
    const createLeafGeometry = () => {
      const geom = new THREE.BufferGeometry();
      const vertices = new Float32Array([
        0, 0, 0,
        0.5, 0.8, 0.2,
        0, 1.5, 0,
        -0.5, 0.8, 0.2,
        0, 0, 0,
        0.4, 0.7, -0.2,
        0, 1.4, 0,
        -0.4, 0.7, -0.2
      ]);
      const indices = [
        0, 1, 2,
        0, 2, 3,
        4, 6, 5,
        4, 7, 6
      ];
      geom.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
      geom.setIndex(indices);
      geom.computeVertexNormals();
      return geom;
    };

    // Instantiate and position items
    const itemCount = 8;
    for (let i = 0; i < itemCount; i++) {
      let mesh;
      const typeIdx = i % 4;

      if (typeIdx === 0) {
        // Leaf
        mesh = new THREE.Mesh(createLeafGeometry(), leafMaterial);
        mesh.scale.setScalar(0.7 + Math.random() * 0.5);
      } else if (typeIdx === 1) {
        // Mango (Capsule deformed)
        const geom = new THREE.CapsuleGeometry(0.3, 0.5, 8, 16);
        mesh = new THREE.Mesh(geom, mangoMaterial);
        // Warp it slightly to make it look like a mango
        const pos = geom.attributes.position;
        for (let j = 0; j < pos.count; j++) {
          let y = pos.getY(j);
          if (y > 0) {
            pos.setX(j, pos.getX(j) * 1.2);
            pos.setZ(j, pos.getZ(j) * 0.9);
          }
        }
        geom.computeVertexNormals();
      } else if (typeIdx === 2) {
        // Lemon (Ellipsoid sphere)
        const geom = new THREE.SphereGeometry(0.35, 16, 16);
        mesh = new THREE.Mesh(geom, lemonMaterial);
        mesh.scale.set(1.4, 0.9, 0.9);
      } else {
        // Coconut (Short capsule/cylinder)
        const geom = new THREE.CylinderGeometry(0.4, 0.4, 0.7, 16);
        mesh = new THREE.Mesh(geom, coconutMaterial);
      }

      // Random position in space
      const angle = (i / itemCount) * Math.PI * 2;
      const radius = 3.5 + Math.random() * 1.5;
      mesh.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 2 - 1
      );

      // Rotation properties
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        0
      );

      // Save custom animation details
      items.push({
        mesh,
        rotSpeed: {
          x: (Math.random() - 0.5) * 0.015,
          y: (Math.random() - 0.5) * 0.015,
          z: (Math.random() - 0.5) * 0.01
        },
        floatSpeed: 0.005 + Math.random() * 0.01,
        floatOffset: Math.random() * 100,
        baseY: mesh.position.y
      });

      floatingGroup.add(mesh);
    }

    // --- PARTICLE SYSTEM (GOLDEN POLLEN) ---
    const particleCount = 180;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = [];

    for (let i = 0; i < particleCount; i++) {
      // Spread particles in a box
      particlePositions[i * 3] = (Math.random() - 0.5) * 16;     // X
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 12; // Y
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 8;  // Z

      particleSpeeds.push({
        x: (Math.random() - 0.5) * 0.005,
        y: 0.003 + Math.random() * 0.008,
        z: (Math.random() - 0.5) * 0.005,
        osc: Math.random() * 0.02,
        oscOffset: Math.random() * 100
      });
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    // Custom Canvas point drawing texture for round particles
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 16;
    pCanvas.height = 16;
    const ctx = pCanvas.getContext('2d');
    const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    grad.addColorStop(0, 'rgba(245, 158, 11, 1)'); // Amber center
    grad.addColorStop(0.3, 'rgba(251, 191, 36, 0.8)');
    grad.addColorStop(1, 'rgba(251, 191, 36, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 16, 16);

    const pTexture = new THREE.CanvasTexture(pCanvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.15,
      map: pTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.75
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // --- MOUSE TRACKING ---
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (e) => {
      // Map to [-1, 1] range
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // --- SCROLL ACTION ---
    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);

    // --- ANIMATION LOOP ---
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smoothly interpolate mouse coordinates for organic inertia (lerp)
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // 1. Globe Rotation + Mouse Parallax
      globeGroup.rotation.y = elapsedTime * 0.05;
      globeGroup.rotation.x = elapsedTime * 0.03;
      
      // Slight scene rotation based on mouse coordinates
      scene.rotation.y = mouse.x * 0.25;
      scene.rotation.x = -mouse.y * 0.15;

      // Scroll effect: move scene down or tilt it as user scrolls
      scene.position.y = -scrollY * 0.003;

      // 2. Animate Floating Items
      items.forEach((item) => {
        // Rotate item
        item.mesh.rotation.x += item.rotSpeed.x;
        item.mesh.rotation.y += item.rotSpeed.y;

        // Bob up and down using sine wave
        item.mesh.position.y = item.baseY + Math.sin(elapsedTime + item.floatOffset) * 0.25;

        // Add subtle react to mouse movement
        item.mesh.position.x += (mouse.x * 0.05 - item.mesh.position.x * 0.005) * 0.1;
      });

      // 3. Animate Golden Pollen Particles
      const posAttr = particleGeometry.attributes.position;
      for (let i = 0; i < particleCount; i++) {
        const speed = particleSpeeds[i];

        // Move upwards
        posAttr.setY(i, posAttr.getY(i) + speed.y);

        // Drift sideways
        posAttr.setX(i, posAttr.getX(i) + speed.x + Math.sin(elapsedTime * 2 + speed.oscOffset) * 0.003);
        posAttr.setZ(i, posAttr.getZ(i) + speed.z);

        // Wrap around boundary box limits
        if (posAttr.getY(i) > 6) {
          posAttr.setY(i, -6);
          posAttr.setX(i, (Math.random() - 0.5) * 16);
        }
        if (posAttr.getX(i) > 8 || posAttr.getX(i) < -8) {
          posAttr.setX(i, -posAttr.getX(i));
        }
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // --- RESIZE HANDLER ---
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // --- CLEANUP ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      // Dispose resources
      globeGeometry.dispose();
      globeMaterial.dispose();
      globeSolidMaterial.dispose();
      leafMaterial.dispose();
      mangoMaterial.dispose();
      lemonMaterial.dispose();
      coconutMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      pTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="three-canvas-container three-canvas-interactive"
      style={{ 
        position: 'absolute', 
        inset: 0, 
        width: '100%', 
        height: '100%', 
        overflow: 'hidden'
      }} 
    />
  );
}
