# Immersive Book 2.0
## Concept: Dive into Fantasy Books' 3D World! 
This is the **Immersive Book 2.0** project, an Immerse The Bay 2024 team project at Stanford on 11/8-10, 2024.

Original project idea is described [here](https://qiita.com/truedata_iotone/items/e73aa5dc98a9fba46a60#book20---a-rethinking-of-books-in-xr)

Devpost from the hackathon is here: https://devpost.com/software/immersivebook2-0

## Team
- David Kordsmeier
- Kazuki Yoda
- Victor Arroyo
- Youssif Seisa

# Get Started
## Build & Launch Server
```
cd ImmersiveBook2\prototypes\elixr-poc1
npm install
npm serve
```

## Demo
1. On Meta Quest3 (or similar versions), connect to the same local WiFi network as the web server (`XR Hackathon 5GHz` at the venue)
2. Open the browser and type the local IPv4 address + port, such as `https://10.20.30.40:8081/`
3. Allow VR mode on the browser. (Enable if not yet by the browser settings.)
4. Click the gray `Enter VR` button at the top-left with the Meta Quest controller.

# Architecture
### Hardware Requirements
- Meta Quest 3/3s (VR)
- Chrome Browser/PC/Mac/Linux
- NVIDIA GPU

### Software Requirements
- Node.js (Web server)
- Three.js (3D rendering)
- WebXR (VR mode on WEB browser)
- Python (backend/ML)

### External AI/ML Tools Used for Research
- Stable Diffusion (SDXL) (Image Generation)
- A1111 WebUI (Pipeline/API for Stable Diffusion)
- [ControlNet](https://github.com/lllyasviel/ControlNet) (Guided image generation on Stable Diffusion)
- [DUSt3R: Geometric 3D Vision Made Easy](https://github.com/naver/dust3r) (Image to multi-view consistent poing cloud)
- [LucidDreamer: Domain-free Generation of 3D Gaussian Splatting Scenes](https://github.com/luciddreamer-cvlab/LucidDreamer) (point cloud)
- [DreamScene360: Unconstrained Text-to-3D Scene Generation with Panoramic Gaussian Splatting](https://github.com/ShijieZhou-UCLA/DreamScene360)
- OpenAI API (GPT-4o/4V) (Preprocessing of book/texts and Stable Diffusion's prompt generation)
- [RunPod](https://www.runpod.io/) (cloud GPU server)

## Code
- src : the final source code
- assets: a JSON file containing links to any static assets
- pipeline: this is the generative AI pipeline in combination with the graphics pipeline
- prototypes: these are early prototypes that may later be thrown out or kept for historical reasons

### Install

- node 16 is fine

### Build

The current design is WebXR base, so not really anything to build, but building helps if you wan to prep for cloud deployment.

### Run

For testing:

npm run serve

## Demo PoC1

The goal for the hackathon was to show off this workflow:

- A Reading Room, where a user can choose between 2-3 books
- The books load a PDF
- In "reader" mode, the user can read line by line from a real PDF
- The reading can be simply showing the text flowing in space
- as each line is read, a generative pipeline kicks off
- the generative pipeline uses the sentence for a prompt into a stable diffusion endpoint.  This produces one image, which is used to feed to Dustr.  The point cloud format is taken as a .glb file
- The glb is loaded into the scene and appears out the window.
- Continue until the user puts the book away

### Performance

TODO

### Live Demo

TODO

# Additional Information

## Attributions

- Elixr Prototype: https://elixrjs.io/index.html
- Meta WebXR example for Quest: https://github.com/meta-quest/webxr-first-steps
- AFrame examples: https://glitch.com/~aframe-basic-guide
- Content: https://sketchfab.com/3d-models/cartoon-lowpoly-small-city-free-pack-edd1c604e1e045a0a2a552ddd9a293e6
- sky.jpg from Basic Scene - A-Frame
- dat.gui https://github.com/dataarts/dat.gui

## Further Reading

- https://developers.meta.com/horizon/documentation/web/webxr-bp/
- https://threejs.org/manual/#en

## Inspirations

- AR.js prototype: https://ar-js-org.github.io/AR.js-Docs/

## Related Work

- BookXRms from MIT Reality Hack 2025:  https://devpost.com/software/bookxrms

## License
MIT/X
