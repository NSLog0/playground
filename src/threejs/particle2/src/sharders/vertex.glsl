uniform float time;
varying vec2 vUv;
varying vec3 vPosition;
uniform sampler2D pattern;

void main() {
  vUv = uv;
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = 3.0;
  gl_Position = projectionMatrix * mvPosition;
}
