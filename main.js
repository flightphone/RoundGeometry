import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoundGeometry, makeGeometry } from './RoundGeometry';
import { OBJExporter } from 'three/addons/exporters/OBJExporter.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { VertexNormalsHelper } from 'three/addons/helpers/VertexNormalsHelper.js';


const params = {
   
    vertices: '{"1":{"id":1,"x":-450,"y":-150,"upper_edge_rounded":true,"lower_edge_rounded":false,"next":2,"prev":4},"2":{"id":2,"x":-450,"y":150,"upper_edge_rounded":true,"lower_edge_rounded":false,"next":3,"prev":1},"3":{"id":3,"x":450,"y":150,"upper_edge_rounded":true,"lower_edge_rounded":true,"next":4,"prev":2},"4":{"id":4,"x":450,"y":-150,"upper_edge_rounded":true,"lower_edge_rounded":true,"next":1,"prev":3}}',
    radius: 6,
    segments: 3,
    size: 38,
    wireframe: false,
    update: CreatePanel,
    exportASCII: exportASCII,
    version:"3.0"
};



const gui = new GUI();

gui.add(params, 'vertices').name('Vertices (JSON)');
gui.add(params, 'radius').name('Radius');
gui.add(params, 'segments').name('segments');
gui.add(params, 'size').name('Size');
gui.add(params, 'wireframe').name('Wireframe');
gui.add(params, 'update').name('Update');
gui.add(params, 'exportASCII').name('Export');
gui.add(params, 'version').name('Version');


gui.open();

//init scene
let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);



const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 500);
const scene = new THREE.Scene();
//look
camera.position.set(0, 0, 1);
camera.up.set(0, 1, 0);
camera.lookAt(0, 0, 0);

let exporter = new OBJExporter();

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 5);
hemiLight.position.set(0, 20, 0);
scene.add(hemiLight);

{
    const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
    directionalLight.position.set(0, 10, 10);
    scene.add(directionalLight);
}

{
    const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
    directionalLight.position.set(0, -10, -10);
    scene.add(directionalLight);
}

const loader = new THREE.TextureLoader();
const texture = loader.load("img/texture.png");
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;


const materialRound = new THREE.MeshLambertMaterial({
    color: new THREE.Color(0x5F5F5F),
    side: THREE.DoubleSide,
    map: texture
});

const materialWire = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x000000),
    side: THREE.DoubleSide,
    wireframe: true,
    
});



let me = null;
let me2 = null;
let helper = null;



CreatePanel();

//mouse rotate
let controls = new OrbitControls(camera, renderer.domElement);
controls.update();
window.addEventListener('resize', onWindowResize);
requestAnimationFrame(render);





function CreatePanel() {

    const par = {
        vertices:JSON.parse(params.vertices), 
        radius: params.radius, 
        segments: params.segments, 
        size: params.size
    }
    const geom = makeGeometry(par);
    if (me)
        scene.remove(me);
    if (me2)
        scene.remove(me2);
    if (helper)    
        scene.remove(helper);
    me2 = null;
    me = new THREE.Mesh(geom, materialRound);
    scene.add(me);

    helper = new VertexNormalsHelper( me, 1, 0xff0000 );
    scene.add(helper);
    if (params.wireframe) {
        me2 = new THREE.Mesh(geom, materialWire);
        scene.add(me2);
    }
}


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function render(time) {
    time *= 0.001; // convert to seconds;
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}





function exportASCII() {

    const result = exporter.parse(me);
    saveString(result, 'rounded.obj');

}



const link = document.createElement('a');
link.style.display = 'none';
document.body.appendChild(link);

function save(blob, filename) {

    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();

}

function saveString(text, filename) {

    save(new Blob([text], { type: 'text/plain' }), filename);

}

function saveArrayBuffer(buffer, filename) {

    save(new Blob([buffer], { type: 'application/octet-stream' }), filename);

}
