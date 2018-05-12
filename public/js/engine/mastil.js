const tab_notes = MidiConvert.load("midis/Picados.mid")
const frets = {
    E: {
        'E3': "6_0",
        'F3': "6_1",
        'F#3': "6_2",
        'G3': "6_3",
        'G#3': "6_4",
        'A3': "6_5",
        'A#3': "6_6",
        'B3': "6_7",
        'C4': "6_8",
        'C#4': "6_9",
        'D4': "6_10",
        'D#4': "6_11",
        'E4': "6_12"
    },
    A: {
        'A3': "5_0",
        'A#3': "5_1",
        'B3': "5_2",
        'C4': "5_3",
        'C#4': "5_4",
        'D4': "5_5",
        'D#4': "5_6",
        'E4': "5_7",
        'F4': "5_8",
        'F#4': "5_9",
        'G4': "5_10",
        'G#4': "5_11",
        'A4': "5_12"
    },
    D: {
        'D4': "4_0",
        'D#4': "4_1",
        'E4': "4_2",
        'F4': "4_3",
        'F#4': "4_4",
        'G4': "4_5",
        'G#4': "4_6",
        'A4': "4_7",
        'A#4': "4_8",
        'B4': "4_9",
        'C5': "4_10",
        'C#5': "4_11",
        'D5': "4_12"
    },
    G: {
        'G4': "3_0",
        'G#4': "3_1",
        'A4': "3_2",
        'A#4': "3_3",
        'B4': "3_4",
        'C5': "3_5",
        'C#5': "3_6",
        'D5': "3_7",
        'D#5': "3_8",
        'E5': "3_9",
        'F5': "3_10",
        'F#5': "3_11",
        'G5': "3_12"
    },
    B: {
        'B4': "2_0",
        'C5': "2_1",
        'C#5': "2_2",
        'D5': "2_3",
        'D#5': "2_4",
        'E5': "2_5",
        'F5': "2_6",
        'F#5': "2_7",
        'G5': "2_8",
        'G#5': "2_9",
        'A5': "2_10",
        'A#5': "2_11",
        'B5': "2_12"
    },
    e: {
        'E5': "1_0",
        'F5': "1_1",
        'F#5': "1_2",
        'G5': "1_3",
        'G#5': "1_4",
        'A5': "1_5",
        'A#5': "1_6",
        'B5': "1_7",
        'C6': "1_8",
        'C#6': "1_9",
        'D6': "1_10",
        'D#6': "1_11",
        'E6': "1_12"
    },
};
const durations={
    "120":{
        "w": 2.000,
        "h": 1.000,
        "hd":1.500,
        "q":0.500,
        "qd":0.750,
        "8":0.250,
        "8d":0.375,
        "16":0.125,
        "16d":0.1875,
        "32":0.0625,
        "32d":0.09372,
        "64":0.03125,
        "64d":0.046875,
    },
    "60":{
        "w":4.000 ,
        "h":2.000,
        "hd":3.000,
        "q":1.000,
        "qd":1.500,
        "8":0.500,
        "8d":0.750,
        "16":0.250,
        "16d":0.375,
        "32":0.125,
        "32d":0.1875,
        "64":0.0625,
        "64d":0.03125,
    }
}
const synth = new Tone.PolySynth(8, Tone.Synth, {
    "oscillator ": {
        "type ": "sine3 "
    },
    "envelope ": {
        "attack ": 0.03,
        "decay ": 0.1,
        "sustain ": 0.2,
        "release ": 0.6
    }
}).toMaster();

function fretboard_draw(event, last){
    const cuerdas = ["E","A","D","G","B","e"];
    let currentEvent = event;
    let lastEvent = last || "event" + currentEvent;
    let laststring = lastEvent.string ;
    let lastname = lastEvent.name;

    cuerdas.forEach(function(cuerda) {
        if (event.string === cuerda) {
            for (let note in frets[cuerda]) {
                if (event.name === note || event.instrument === note) {
                    let fretSelected = frets[cuerda][currentEvent.name];
                    let lastfretSelected = fretSelected;
                    cuerdas.forEach(function(current_cuerda){
                        if (laststring === current_cuerda) {
                            lastfretSelected = frets[current_cuerda][lastname]
                        }
                    });
                    let pointImage = `images/selected/` + lastfretSelected + `.png`;
                    let currentImage = `images/current/images/${frets[cuerda][note]}.png`;
                    Tone.Draw.schedule(function () {
                        document.getElementById(fretSelected).src = currentImage;
                        document.getElementById(lastfretSelected).src = pointImage;
                    })
                }
            }
        }
    })
}

function draw_current_note(index) {
    let current = document.getElementsByTagName('text')[index];
    let last = document.getElementsByTagName('text')[index -1];
    $(current).css("fill", "red");
    $(last).css("fill", "black");
}

let lastEvent = null
let svg_text_index = 0
function playNote(time, event) {
    Tone.context.resume().then(() => {
        synth.triggerAttackRelease(event.name, event.duration, time, event.velocity);
    })
    fretboard_draw(event, lastEvent)
    draw_current_note(svg_text_index)
    lastEvent = event
    svg_text_index +=1
}
//acciona el midi con el boton "play" y empieza el transport
var button = document.getElementById("play");
button.addEventListener("click ", function() {

    if (Tone.Transport.state === "started ") {
        Tone.Transport.stop();
    } else {
        Tone.Transport.start("+0.1 ", 0);
    }
});


//cambia el midi segun lo que se escoja en el select
function currentSong(){
    var currentMidi= ["buleria_Aflaco.mid","Picado_Tango_A_F.mid","buleria_Aflaco.mid.mid"];
    var selects = document.getElementById("currentMidi");
    var selectedValue = selects.options[selects.selectedIndex].value;
    MidiConvert.load("midis/" + currentMidi[selectedValue]).then(function(midi) {

        console.log(midi.tracks[0].name);
        var melody = midi.get(midi.tracks[0].name).notes;
        console.log(melody);
        // make sure you set the tempo before you schedule the events
        Tone.Transport.bpm.value = midi.bpm;
        Tone.Transport.timeSignature = midi.timeSignature;
        var currentPicado = new Tone.Part(playNote, melody).start(0);

    });
}
tab_notes.then(function(midi) {

let notes = ["E","A","D","G","B","e"]
Tone.Transport.bpm.value = midi.bpm;
Tone.Transport.timeSignature = midi.timeSignature;

 for (var i= 0 ; i<midi.tracks.length; ++i){
     notes.forEach(function (nota) {
         if (midi.tracks[i].name===nota || midi.tracks[i].instrument===nota){
             var track= midi.tracks[i].notes
             new Tone.Part(playNote, track).start(0);
             track.forEach(function(note){
                 note.string = nota
             })
         }
     })
 }
fret_to_miditrack(midi)
tab_parser(midi)
create_tab(midi)
})

function create_tab(midi) {

    VF = Vex.Flow;

    let div = document.getElementById("mySVGDiv")
    const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
    renderer.resize(4000, 200);
    let context = renderer.getContext();
    let stave = new VF.TabStave(10, 40, 800);
    stave.addClef("tab").setContext(context).draw();
    let draw_notes = []
    let sort_notes = []
    let sort_notes_arr = []

    for (let i = 1; i < midi.tracks.length; ++i) {
        let notes = midi.tracks[i].notes
        sort_notes.push(notes)
    }
    for (let i = 0; i < sort_notes.length; ++i) {
        let notes = sort_notes[i]
        notes.forEach(function (note) {
             sort_notes_arr.push(note)
        })
    }
    sort_notes_arr.sort(function(a, b) {
        return a.time - b.time;
    });
        sort_notes_arr.forEach(function(note) {
            draw_notes.push(new VF.TabNote({
                positions: [{str: note.cuerda_parsed, fret: note.fret_parsed}],
                duration: note.music_duration,
                time: note.time,

            }
            ))

        })

     VF.Formatter.FormatAndDraw(context, stave, draw_notes);
return draw_notes

}

function tab_parser(midi){
    for (let i = 1; i < midi.tracks.length; ++i) {
        let notes = midi.tracks[i].notes
        for (let note in notes) {
            let cuerda = notes[note]["string"]
            let cuerdas = ["e", "B", "G", "D", "A", "E"]
            notes[note]["cuerda_parsed"] = string_parse(cuerda, cuerdas)
            notes[note]["fret_parsed"] = parseInt(notes[note]["fret"])
        }
    }
}
function string_parse(cuerda, cuerdas) {
     for (let i = 0; i < cuerdas.length; i++) {
          if (cuerda === cuerdas[i]) {
              cuerda = i + 1
          }
     }
     return cuerda
}
function fret_to_miditrack(midi){
    for (let i= 0 ; i<midi.tracks.length; ++i){
        let track = midi.tracks[i].notes
        track.forEach(function (nota) {
            for(let fret in frets){
                if (nota.string===fret){
                    for  (let note in fret){
                        if (frets[fret][nota.name]){
                            nota.fret= frets[fret][nota.name].slice(2,3)
                        }
                    }
                }
            }
        })
    }
    duration_parser(midi)

}
function duration_parser(midi){
    for (let i= 0 ; i<midi.tracks.length; ++i){
        let track = midi.tracks[i].notes
        if(midi.header.bpm===120){
            track.forEach(function (nota) {
                for (let duration in durations["120"]){
                if ( durations["120"][duration] + 0.010 >= nota.duration && nota.duration >= durations["120"][duration] - 0.010){
                    nota.music_duration= duration
                }
                }
            })
        }

    }

}
