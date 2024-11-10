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
const asset3 = 'assets/scene.gltf';
const asset5 = 'assets/BookRoomV4ImageTest2.glb'
const asset6 = 'assets/BookRoomV4ImageTest3.glb'
const pointcloudAlice = 'assets/alice.glb'
const pointcloudDiningHall = 'assets/dining_hall.glb'
const pointcloudDeathStar = 'assets/death_star.glb'
const pointcloudCastleBattle = 'assets/castle_battle.glb'
const pointcloudPly = 'assets/alley_10000.ply'
const sound1 = 'assets/frog_in_the_tunnel_MASTR004_intro.ogg';
const gif1	 = 'assets/2-3068368949-Time-lapse-of-our-first-christmas-tree-at-home-in-the.gif';

var model;
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

	// Create a texture loader so we can load our image file
	var textureLoader = new THREE.TextureLoader();

	// Load an image file into a custom material
	var material = new THREE.MeshLambertMaterial({
		map: textureLoader.load(gif1)
	});

	// TODO: Implement this as an animated png
	/*
	// create a plane geometry for the image with a width of 10
	// and a height that preserves the image's aspect ratio
	var geometry = new THREE.PlaneGeometry(10, 10*.75);

	// combine our image geometry and material into a mesh
	var mesh = new THREE.Mesh(geometry, material);

	// set the position of the image mesh in the x,y,z dimensions
	mesh.position.set(0,0,0)
	world.scene.add(mesh);
	*/

	// XXX world.scene.add(assets);
	// world.scene.add(new THREE.AmbientLight(0xffffff, 0.5));
	const gltfLoader = new GLTFLoader();
  	// const url1 = asset5;
	
	// For Hogwarts dining hall
	// const url1 = pointcloudDiningHall;
	// const depthScale = 0.333;
	// const scale = 30;
	// const yShiftScale = 1 / 7;
	// const zShiftScale = 0.7;

	// For Alice in the Wonderland
	// const url1 = pointcloudAlice;
	// const depthScale = 0.333;
	// const scale = 30;
	// const yShiftScale = 0.1;
	// const zShiftScale = 1.0;

	// For Death Star
	// const url1 = pointcloudDeathStar;
	// const depthScale = 0.333;
	// const scale = 30;
	// const yShiftScale = -0.0;
	// const zShiftScale = 1.0;
	
	// For Medieval battle in front of castle
	const url1 = pointcloudCastleBattle;
	const depthScale = 0.333;
	const scale = 50;
	const yShiftScale = 0.1;
	const zShiftScale = 0.5;

	gltfLoader.load(url1, (data) => {

		model = data.scene;
		model.scale.set(scale, scale, scale * depthScale);
		model.position.set(0, scale * yShiftScale, scale * depthScale * zShiftScale);
		model.rotateY(Math.PI);
		world.scene.add(model);
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

	world.renderer.setSize(640, 480);

	// Add directional light
	const directionalLight = new DirectionalLight(new Color(0xffffff), 0.5);
	directionalLight.position.set(0, 1, 0);
	world.scene.add(directionalLight);

	// Set camera position
	world.camera.position.set(0, 0, 10);
	console.log(world.camera.position);
	globalThis.world = world;

	// load up ambient audio
	// AUDIO
    var audioLoader = new THREE.AudioLoader();
    var listener = new THREE.AudioListener();
    var audio = new THREE.Audio(listener);
    audioLoader.load(sound1, function(buffer) {
        audio.setBuffer(buffer);
        audio.setLoop(true);
        audio.play();
    });

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