// import 'vexflow'

VF = Vex.Flow;
var div = document.getElementById("boo")
var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
renderer.resize(200, 200);
var context = renderer.getContext();


console.log(`context is an instance of: ` + context.constructor.name); 

var stave = new VF.Stave(110, 60, 90);
stave.addClef("treble").addTimeSignature("4/4");
stave.setContext(context).draw();