"use client";

import { useEffect, useRef } from "react";

const vertexSource = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentSource = `
  precision mediump float;
  uniform float u_time;
  uniform vec2 u_resolution;
  varying vec2 v_uv;

  float softCircle(vec2 uv, vec2 center, float radius) {
    float d = distance(uv, center);
    return smoothstep(radius, radius - 0.08, d);
  }

  void main() {
    vec2 uv = v_uv;
    float t = u_time * 0.06;
    vec3 base = vec3(0.96, 0.98, 1.0);
    float blob1 = softCircle(uv, vec2(0.25 + 0.08 * sin(t * 2.0), 0.65), 0.42);
    float blob2 = softCircle(uv, vec2(0.75, 0.28 + 0.1 * cos(t * 1.7)), 0.5);
    float wave = 0.5 + 0.5 * sin((uv.x + uv.y) * 8.0 + t * 5.0);
    vec3 color = base;
    color = mix(color, vec3(0.72, 0.86, 1.0), blob1);
    color = mix(color, vec3(0.46, 0.68, 0.98), blob2);
    color = mix(color, vec3(0.82, 0.91, 1.0), wave * 0.08);
    gl_FragColor = vec4(color, 1.0);
  }
`;

function createShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
) {
  const shader = gl.createShader(type);
  if (!shader) {
    return null;
  }
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext) {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  if (!vertexShader || !fragmentShader) {
    return null;
  }
  const program = gl.createProgram();
  if (!program) {
    return null;
  }
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

export default function WebGLBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const gl = canvas.getContext("webgl", {
      antialias: true,
      premultipliedAlpha: true,
    });
    if (!gl) {
      return;
    }

    const program = createProgram(gl);
    if (!program) {
      return;
    }

    const positionLocation = gl.getAttribLocation(program, "a_position");
    const timeLocation = gl.getUniformLocation(program, "u_time");
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.floor(canvas.clientWidth * dpr);
      const height = Math.floor(canvas.clientHeight * dpr);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
      if (resolutionLocation) {
        gl.uniform2f(resolutionLocation, width, height);
      }
    };

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const render = (time: number) => {
      gl.useProgram(program);
      resize();
      gl.enableVertexAttribArray(positionLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
      if (timeLocation) {
        gl.uniform1f(timeLocation, time * 0.001);
      }
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      if (!prefersReducedMotion) {
        frameRef.current = requestAnimationFrame(render);
      }
    };

    render(0);

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return <canvas className="webgl-canvas" ref={canvasRef} aria-hidden="true" />;
}
