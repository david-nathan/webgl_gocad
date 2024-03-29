﻿///<reference path="../../../_references.ts" /> 
angular.module("webglApp")
    .directive("globeCanvas", function () {
        function link(scope, element, attrs) {
            // global variables
            var renderer;
            var scene;
            var camera;
            var control;
            var stats;
            var cameraControl;

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
                renderer.setSize(windowWidth, windowHeight);
                renderer.shadowMapEnabled = true;

                // create a sphere
                var sphereGeometry = new THREE.SphereGeometry(15, 60, 60);
                var sphereMaterial = createEarthMaterial();
                var earthMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
                earthMesh.name = 'earth';
                scene.add(earthMesh);

                // create a cloudGeometry, slighly bigger than the original sphere
                var cloudGeometry = new THREE.SphereGeometry(15.25, 60, 60);
                var cloudMaterial = createCloudMaterial();
                var cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
                cloudMesh.name = 'clouds';
                scene.add(cloudMesh);

                // position and point the camera to the center of the scene
                camera.position.x = 25;
                camera.position.y = 26;
                camera.position.z = 23;
                camera.lookAt(scene.position);

                // add controls
                cameraControl = new THREE.OrbitControls(camera);


                // setup the control object for the control gui
                control = new function () {
                    this.rotationSpeed = 0.001;
                };

                // add extras
                //addControlGui(control);
                //addStatsObject();


                // add the output of the renderer to the html element
                //document.body.appendChild(renderer.domElement);
                d3.select(element[0]).node().appendChild(renderer.domElement);
                // call the render function, after the first render, interval is determined
                // by requestAnimationFrame
                render();
            }

            function createEarthMaterial() {
                // 4096 is the maximum width for maps
                var earthTexture = THREE.ImageUtils.loadTexture("../../../../assets/textures/earthmap4k.jpg");

                var earthMaterial = new THREE.MeshBasicMaterial();
                earthMaterial.map = earthTexture;

                return earthMaterial;
            }

            function createCloudMaterial() {
                var cloudTexture = THREE.ImageUtils.loadTexture("../../../../assets/textures/fair_clouds_4k.png");

                var cloudMaterial = new THREE.MeshBasicMaterial();
                cloudMaterial.map = cloudTexture;
                cloudMaterial.transparent = true;


                return cloudMaterial;
            }

            function addControlGui(controlObject) {
                var gui = new dat.GUI();
                gui.add(controlObject, 'rotationSpeed', -0.01, 0.01);
            }

            function addStatsObject() {
                stats = new Stats();
                stats.setMode(0);

                stats.domElement.style.position = 'absolute';
                stats.domElement.style.left = '0px';
                stats.domElement.style.top = '0px';

                document.body.appendChild(stats.domElement);
            }


            /**
             * Called when the scene needs to be rendered. Delegates to requestAnimationFrame
             * for future renders
             */
            function render() {

                // update stats
                //stats.update();

                // update the camera
                cameraControl.update();

                scene.getObjectByName('earth').rotation.y += control.rotationSpeed;
                scene.getObjectByName('clouds').rotation.y += control.rotationSpeed * 1.1;

                // and render the scene
                renderer.render(scene, camera);

                // render using requestAnimationFrame
                requestAnimationFrame(render);
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

            init();
            handleResize();
            d3.select(window).on("resize", handleResize);

        }
        return {
            link: link,
            restrict: 'E',
            replace: false,
            templateUrl: 'app/components/directives/globecanvas/globecanvas_template.html',
            scope: {}
        };
    }); 