///<reference path="../../../_references.ts" /> 
angular.module("webglApp")
    .directive("webglCanvas", function () {
    function link(scope, element, attrs) {
        // global variables
        var renderer;
        var scene;
        var camera;
        /**
         * Initializes the scene, camera and objects. Called when the window is
         * loaded by using window.onload (see below)
         */
        function init() {
            var windowWidth = $(".panel-body").width();
            var windowHeight = screen.availHeight - 400;
            // create a scene, that will hold all our elements such as objects, cameras and lights.
            scene = new THREE.Scene();
            // create a camera, which defines where we're looking at.
            camera = new THREE.PerspectiveCamera(45, windowWidth / windowHeight, 0.1, 1000);
            // create a render, sets the background color and the size
            renderer = new THREE.WebGLRenderer();
            renderer.setClearColor(0x000000, 1.0);
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.shadowMapEnabled = true;
            // create the ground plane
            var planeGeometry = new THREE.PlaneGeometry(20, 20);
            var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xcccccc });
            var plane = new THREE.Mesh(planeGeometry, planeMaterial);
            plane.receiveShadow = true;
            // rotate and position the plane
            plane.rotation.x = -0.5 * Math.PI;
            plane.position.x = 0;
            plane.position.y = -2;
            plane.position.z = 0;
            // add the plane to the scene
            scene.add(plane);
            // create a cube
            var cubeGeometry = new THREE.BoxGeometry(6, 4, 6);
            var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
            var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
            cube.castShadow = true;
            // add the cube to the scene
            scene.add(cube);
            // position and point the camera to the center of the scene
            camera.position.x = 15;
            camera.position.y = 16;
            camera.position.z = 13;
            camera.lookAt(scene.position);
            // add spotlight for the shadows
            var spotLight = new THREE.SpotLight(0xffffff);
            spotLight.position.set(10, 20, 20);
            spotLight.shadowCameraNear = 20;
            spotLight.shadowCameraFar = 50;
            spotLight.castShadow = true;
            scene.add(spotLight);
            // add the output of the renderer to the html element
            d3.select(element[0]).node().appendChild(renderer.domElement);
            // call the render function, after the first render, interval is determined
            // by requestAnimationFrame
            render();
        }
        /**
         * Called when the scene needs to be rendered. Delegates to requestAnimationFrame
         * for future renders
         */
        function render() {
            // render using requestAnimationFrame
            requestAnimationFrame(render);
            renderer.render(scene, camera);
        }
        /**
         * Function handles the resize event. This make sure the camera and the renderer
         * are updated at the correct moment.
         */
        function handleResize() {
            var windowWidth = $(".panel-body").width();
            var windowHeight = screen.availHeight - 400;
            camera.aspect = windowWidth / windowHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(windowWidth, windowHeight);
        }
        // calls the handleResize function when the window is resized
        //window.addEventListener('resize', handleResize, false);
        // Attach resize event to handleResize function
        init();
        handleResize();
        d3.select(window).on("resize", handleResize);
    }
    return {
        link: link,
        restrict: 'E',
        replace: false,
        templateUrl: 'app/components/directives/webglcanvas/webglcanvas_template.html',
        scope: {}
    };
});
//# sourceMappingURL=webglcanvas.js.map