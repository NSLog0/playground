uniform sampler2D utexture;
varying vec3 vColor;
varying vec2 vUv;

void main() {
  gl_FragColor = texture2D(utexture, vUv);
}
