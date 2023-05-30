# WebGL-Raytracer
Raytracer mainly composed in the fragment shader. Uses WebGL to render two triangles that cover the screen, and then pass the x and y interpolated coordinates to the fragment shader for later use in casting the rays from the camera. Based off of tutorial "Ray Tracing in One Weekend", but recursion had to be avoided as it does not work in WebGL shaders.
