let keys = {}
document.onkeydown = function(e) {
    e.preventDefault()
    keys[e.key] = true
    keys[e.keyCode] = true
}
document.onkeyup = function(e) {
    e.preventDefault()
    keys[e.key] = false
    keys[e.keyCode] = false
}

const gl = new WebGL()
gl.initializeContext()

gl.fullScreen()
gl.size(600, 400)

vertices = [
     1, 1,
    -1, 1,
     1,-1,
    -1,-1
]

indices = [
    0, 1, 2,
    1, 2, 3
]

const vertexShader = `
attribute vec2 aPosition;
varying vec2 vPosition;

void main() {
    gl_Position = vec4(aPosition, 0.0, 1.0);

    vPosition = aPosition;
}
`
const fragmentShader = document.getElementById("fragmentShader").text


const program = gl.createProgram(vertexShader, fragmentShader);

const vertexBuffer = gl.createBuffer(new Float32Array(vertices), gl.ctx.ARRAY_BUFFER)
const indexBuffer = gl.createBuffer(new Uint16Array(indices), gl.ctx.ELEMENT_ARRAY_BUFFER)

const v2Position = gl.vertexAttrib(program, "aPosition", vertexBuffer, 2)
const camPos = gl.getUniform(program, "camPos");
const camLk = gl.getUniform(program, "camLook");

let cam = [0, 0, 0]
let camLook = [0, 0, -1]

gl.ctx.useProgram(program)

function render() {
    if(keys.a) {
        cam[0] -= 0.1;
    }
    if(keys.d) {
        cam[0] += 0.1;
    }
    if(keys.w) {
        cam[2] -= 0.1;
    }
    if(keys.s) {
        cam[2] += 0.1;
    }
    
    if(keys[37]) {
        camLook[0] -= 0.1;
    }
    if(keys[39]) {
        camLook[0] += 0.1;
    }
    if(keys[38]) {
        camLook[2] -= 0.1;
    }
    if(keys[40]) {
        camLook[2] += 0.1;
    }

    if(keys[32]) {
        cam[1] += 0.1;
    }
    if(keys[16]) {
        cam[1] -= 0.1;
    }
    
    gl.ctx.uniform3fv(camPos, cam)
    gl.ctx.uniform3fv(camLk, camLook)
    
    gl.ctx.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.ctx.viewport(0.0, 0.0, gl.canvas.width, gl.canvas.height)

    gl.ctx.clear(gl.ctx.COLOR_BUFFER_BIT)

    gl.ctx.drawElements(gl.ctx.TRIANGLES, indices.length, gl.ctx.UNSIGNED_SHORT, 0)
    
    window.requestAnimationFrame(render);
}

render()