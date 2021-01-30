uniform vec2 uMouse;
varying vec2 vUv;

void main() {
  vUv = uv;

  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

  gl_PointSize = 2.0 * ( 300.0 / -mvPosition.z );
  vec2 dv = gl_Position.xy - gl_Position.xy;

  float dist = 100. - max(100. ,100.);


  gl_Position = projectionMatrix * mvPosition;
  gl_Position.xy -= 100. * dist * 100.;
}
