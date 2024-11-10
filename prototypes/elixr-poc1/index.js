import {
	AmbientLight,
	Color,
	DirectionalLight,
	GameSystem,
	Mesh,
	MeshStandardMaterial,
	PhysicsMaterial,
	PlaneCollider,
	PlaneGeometry,
	RigidbodyType,
	SphereCollider,
	SphereGeometry,
	VRButton,
	initEngine,
	AssetManager,
	MeshLambertMaterial,
	THREE,
} from 'elixr';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { PCDLoader } from 'three/addons/loaders/PCDLoader.js';

		// url: 'https://elysian.fun/assets/gltf/props.gltf',
const asset4 = 'assets/scene.gltf';
const asset3 = 'assets/cartoon_lowpoly_small_city_free_pack/scene.gltf';
var modelroot;
const assets = {
	props: {
		url: asset3,
		type: 'GLTF',
		callback: (gltf) => {
			console.log("loaded: ", gltf);
		},
	},
};

class ExampleSystem extends GameSystem {
	init() {
		const pmat = new PhysicsMaterial({ friction: 1, restitution: 1 });
		const sphere = this.createRigidbody()
			.add(new SphereCollider(1, false, pmat))
			.add(
				new Mesh(
					new SphereGeometry(1, 32, 32),
					new MeshStandardMaterial({ color: 0xff0000 }),
				),
			);
		sphere.position.set(0, 5, 0);
		sphere.updateTransform();
		sphere.colliderVisible = true;
		this.scene.add(sphere);
		this.floor = this.createRigidbody({ type: RigidbodyType.Kinematic })
			.add(new PlaneCollider(10, 10, false, pmat))
			.add(
				new Mesh(
					new PlaneGeometry(10, 10),
					new MeshStandardMaterial({ color: 0x00ff00 }),
				),
			);
		this.floor.position.set(0, 0, 0);
		// this.floor.position.set(0, -1, 0);
		this.floor.rotateX(-Math.PI / 2);
		this.floor.colliderVisible = true;
	}

	update(delta) {
		// This area is edited to make the animation of the scene
		/*
		this.floor.position.y += delta;
		if (this.floor.position.y > 1) {
			this.floor.position.y = -1;
		}
		*/
		// console.log(this.sphereRigidBody.parent.position.toArray());
	}
}

initEngine(
	document.getElementById('scene-container'),
	{ enablePhysics: true },
	assets,
).then((world) => {
	world.registerSystem(ExampleSystem);
	world.scene.background = new Color(0x000000);

	// Add ambient light
	const ambientLight = new AmbientLight(new Color(0xffffff), 1);
	world.scene.add(ambientLight);

	// XXX world.scene.add(assets);
	// world.scene.add(new THREE.AmbientLight(0xffffff, 0.5));
	const gltfLoader = new GLTFLoader();
  	const url1 = asset4;
	gltfLoader.load(url1, (gltf) => {
		modelroot = gltf.scene;

		world.scene.add(modelroot);
		// world.model.position.set(0,5.5,-2);
		// world.model.material.opacity(0.5);
		// Attempting
		/*
		setTimeout(function() {
			// fadeModel(modelroot.children[0]);
			// This hides the model
			// modelroot.children[0].visible = false;
			// console.log(modelroot);
			fadeModel(modelroot.children[0], 0.1, 1000, 0.1);
		}, 15000);
		*/
	});
	// Add directional light
	const directionalLight = new DirectionalLight(new Color(0xffffff), 0.5);
	directionalLight.position.set(0, 1, 0);
	world.scene.add(directionalLight);

	// Set camera position
	world.camera.position.set(0, 0, 10);
	console.log(world.camera.position);
	globalThis.world = world;

	const vrButton = document.getElementById('vr-button');
	VRButton.convertToVRButton(vrButton, world.renderer);
});

function fadeModel(model, opacity, rate, increment) {
	console.log(model);
	/*
	model.children[0].traverse(n => { if ( n.isMesh ) {
		n.materials[0].transparent = true;
		n.material.opacity = 0.1
	}});
	*/
	// for (child in model.children[0].children) {
	for(const child of model.children[0].children) {
		console.log("checking on child");
		if (child.isMesh) {
			console.log("child is mesh");
			child.material.transparent = true;
			child.material.opacity = 0.1;
		}
	}
	console.log(model);
	/*
	model.materials[0].transparent = true;
	setTimeout(function() {
		if (model.material.opacity === opacity) {
			return;
		} else {
			fadeModel(model, opacity, rate, increment);
		}
	}, rate);
	*/
}

function fadeMaterial(model) {
	console.log(model);
	model.material.opacity(0.5);

	model.traverse(n => { if ( n.isMesh ) {
		n.castShadow = true; 
		n.receiveShadow = true;
		if(n.material.map) n.material.map.anisotropy = 1;

	}});
}