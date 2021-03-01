uniform vec2 uMouse;
varying vec2 vUv;

attribute float aOffset;
attribute float aSpeed;

void main() {
  vUv = uv;
  vec3 pos = position;

  pos.z = position.z + aSpeed;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.);

  gl_PointSize = 750. * ( 1. / -mvPosition.z );
  gl_Position = projectionMatrix * mvPosition;
}
