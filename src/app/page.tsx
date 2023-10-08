"use client"
import Image from 'next/image'
import {useEffect} from "react";
import * as THREE from "three";
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import Stats from 'three/examples/jsm/libs/stats.module'
// Instantiate a loader
const loader = new GLTFLoader();

// Optional: Provide a DRACOLoader instance to decode compressed mesh data
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/public/');
loader.setDRACOLoader(dracoLoader);


export default function Home() {
    useEffect(() => {
        const scene = new THREE.Scene()
        const light = new THREE.SpotLight();
        const ambientLight = new THREE.AmbientLight(0x404040); // luz ambiente suave
        const renderer = new THREE.WebGLRenderer()


        scene.add(new THREE.AxesHelper(5))
        scene.add(light);
        scene.add(ambientLight);
        light.position.set(5, 5, 5)
        scene.add(light)

        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        )

        camera.position.z = 2


        renderer.shadowMap.enabled = true
        renderer.setSize(window.innerWidth, window.innerHeight)
        document.body.appendChild(renderer.domElement)

        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true

        const loader = new GLTFLoader()

        loader.load(
            // resource URL
            'moon_v3_light.gltf',
            // called when the resource is loaded
            function (gltf) {

                // gltf.scene.scale.set(10, 10, 10);  // Ajusta a escala do modelo
                // gltf.scene.position.set(0, 0, -5);  // Ajusta a posição do modelo

                gltf.animations; // Array<THREE.AnimationClip>
                gltf.scene; // THREE.Group
                gltf.scenes; // Array<THREE.Group>
                gltf.cameras; // Array<THREE.Camera>
                gltf.asset; // Object
                scene.add(gltf.scene);

            },
            // called while loading is progressing
            function (xhr) {

                console.log((xhr.loaded / xhr.total * 100) + '% loaded');

            },
            // called when loading has errors
            function (error) {
                console.log(error)
                console.log('An error happened');

            }
        );

        window.addEventListener('resize', onWindowResize, false)

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
            render()
        }

        const stats = new Stats()
        // document.body.appendChild(stats.dom)

        function animate() {
            requestAnimationFrame(animate)

            controls.update()

            render()

            stats.update()
        }

        function render() {
            renderer.render(scene, camera)
        }


        animate();
    }, [])
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div>
            </div>
        </main>
    )
}
