uniform float time;
varying vec2 vUv;
varying vec3 vPosition;
uniform sampler2D texture1;

void main()
{
  vec4 pattern = texture2D(texture1, vUv);
  gl_FragColor = vec4(vUv, 0, 1);
  gl_FragColor = pattern;
}
