uniform sampler2D texture1;
varying vec3 vColor;
varying vec2 vUv;

void main() {
  gl_FragColor = texture2D(texture1, vUv);
}
