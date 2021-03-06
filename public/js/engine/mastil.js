

let tab_notes = MidiConvert.load("midis/buleria_01.mid")

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
        "16d":0.1625,
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
};
let reverb = new Tone.JCReverb(0.3).connect(Tone.Master);
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
const sampler = new Tone.Sampler({
    "E3" : "guitar/E2.mp3",
    "G3" : "guitar/G2.mp3",
    "A#3" : "guitar/Asharp2.mp3",
    "C#4" : "guitar/Csharp3.mp3",
    "E4" : "guitar/E3.mp3",
    "G4" : "guitar/G3.mp3",
    "A#4" : "guitar/Asharp3.mp3",
    "C#5" : "guitar/Csharp4.mp3",
    "E5" : "guitar/E4.mp3",
    "G5" : "guitar/G4.mp3",
    "A#5" : "guitar/Asharp4.mp3",
    "C#6" : "guitar/Csharp5.mp3",
    "E6" : "guitar/E5.mp3",
}).chain(reverb);

let lastEvent = null;
let svg_text_index = 0;

function fretboard_draw(event, last){
    console.error(event)
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
                        console.log(fretSelected)
                    })
                }
            }
        }
    })
}
function clean_fretboard (){
    for (i=1; i<=6;i++ ){
        for (e = 0; e<=12; e++ ){
            let fretSelected = i + "_" + e ;
            let unselected_fret = `images/normal/` + fretSelected + `.png`;
            document.getElementById(fretSelected).src = unselected_fret;
        }
    }

}
function remove_tab() {

    var tab_div = document.getElementById('tab_div');
    var tab = document.getElementById('mySVGDiv')
    tab.parentNode.removeChild(tab);
    var iDiv = document.createElement('div');
    iDiv.id = 'mySVGDiv';
    tab_div.appendChild(iDiv);

}
function draw_current_note(index) {
    let current = document.getElementsByTagName('text')[index];
    let last = document.getElementsByTagName('text')[index -1];
    if (index ==  0){
        $(last).css("fill", "black")
        $(last).css('stroke-opacity', '0');
    }
    $(current).css("fill", "red");
    $(current).css('stroke', 'red');
    $(current).css('stroke-width', '6px');
    $(current).css('stroke-opacity', '0.1');
    $(last).css("fill", "black");
    $(last).css('stroke-opacity', '0');
}
function playNote(time, event) {
    Tone.context.resume().then(() => {
/*
            synth.triggerAttackRelease(event.name, event.duration, time, event.velocity);
*/
            sampler.triggerAttackRelease(event.name, event.duration +0.1 , time);
            draw_current_note(svg_text_index);
            fretboard_draw(event, lastEvent);
            lastEvent = event;

            svg_text_index +=1;
            if (Tone.Transport.progress < 0.009){
                svg_text_index = 1;
                let first = document.getElementsByTagName('text')[0];
                $(first).css("fill", "red");
                $(first).css('stroke', 'red');
                $(first).css('stroke-width', '6px');
                $(first).css('stroke-opacity', '0.1');
            }
        }
    )

}
const checkbox = document.querySelector("input[name=play]");
let button = document.getElementById("play");
button.addEventListener('click', function() {
    console.log("pushed")
    function start(){
        if (Tone.Transport.state === "started") {
            Tone.Transport.stop();
        } else {
            Tone.Transport.start("+0.1 ", 0);
        }
    }
    start()


});

function currentSong(){
    let selects = document.getElementById("currentMidi");
    let selectedValue = selects.options[selects.selectedIndex].value;
    console.log(selectedValue)
    clean_fretboard ()
    remove_tab()
    MidiConvert.load("midis/" + selectedValue + ".mid").then(function(midi) {
        Tone.Transport.stop();
        Tone.Transport.start("+0.1 ", 0);
        launcher(midi)
    });
}
tab_notes.then(function(midi) {

launcher(midi)
})
function launcher(midi){
    let notes = ["E","A","D","G","B","e"]
    Tone.Transport.cancel()
    Tone.Transport.bpm.value = midi.bpm;
    Tone.Transport.timeSignature = midi.timeSignature;
    Tone.Transport.loop =true;
    Tone.Transport.loopStart =0;

    let loop_notes = [];
    for (let i= 0 ; i<midi.tracks.length; ++i){
        notes.forEach(function (nota) {

            if (midi.tracks[i].name===nota || midi.tracks[i].instrument===nota){
                let track= midi.tracks[i].notes;
                new Tone.Part(playNote, track).start(0);
                track.forEach(function(note){
                    note.string = nota;
                    loop_notes.push(note.time)
                })
            }}
        )
        let max_time = 0;
        loop_notes.forEach(function(note){
            if (note > max_time){
                max_time = note
            }

        })
        Tone.Transport.loopEnd =max_time + 1;
    }

    fret_to_miditrack(midi);
    tab_parser(midi);
    create_tab(midi);
}
function create_tab(midi) {
    const string_values= {
        'e': 1,
        'B': 2,
        'G': 3,
        'D': 4,
        'A': 5,
        'E': 6,
    }

    VF = Vex.Flow;

    let div = document.getElementById("mySVGDiv")
    const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
    renderer.resize(4000, 200);
    let context = renderer.getContext();
    let stave = new VF.TabStave(10, 40, 1000);
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
    console.log(sort_notes_arr)
    let lastNote = sort_notes_arr[0];
    let duplicate_notes = [];

        let firstNote = true
        for (let i = 0 ; i <= sort_notes_arr.length -1; ++i) {

            if (sort_notes_arr[i].time === lastNote.time && lastNote != sort_notes_arr[0]) {
                if (firstNote) {
                    duplicate_notes[i] = ( [[{
                        str: lastNote.cuerda_parsed,
                        fret: lastNote.fret_parsed
                    }, {
                        str: sort_notes_arr[i].cuerda_parsed,
                        fret: sort_notes_arr[i].fret_parsed
                    }], {duration: sort_notes_arr[i].music_duration, time: sort_notes_arr[i].time}])
                    firstNote = false
                }
                else {

                    duplicate_notes[i -1][0].push({
                        str: sort_notes_arr[i].cuerda_parsed,
                        fret: sort_notes_arr[i].fret_parsed
                    }
                    )
                    firstNote = true
                }
            }
            lastNote = sort_notes_arr[i] }
    function compare(a,b) {
        if (a.str < b.str)
            return -1;
        if (a.str > b.str)
            return 1;
        return 0;
    }
    duplicate_notes.forEach((note) => {
        note[0].sort(compare);
    })

    for (let i = 0 ; i <= sort_notes_arr.length -1; ++i) {

            if (duplicate_notes[i]){
                if (duplicate_notes[i][0].length=== 2){
                    console.error('dos', duplicate_notes[i])
                  /*  console.log(note[0][1]['str'])*/
                    draw_notes.push(

                        new VF.TabNote({
                            positions: [
                                {
                                    str: duplicate_notes[i][0][0]['str'],
                                    fret: duplicate_notes[i][0][0]['fret']
                                },
                                {
                                    str: duplicate_notes[i][0][1]['str'],
                                    fret: duplicate_notes[i][0][1]['fret']
                                }

                            ],
                            duration: duplicate_notes[i][1].duration,
                            time: duplicate_notes[i][1].time,
                        })

                    )


                }
                if (duplicate_notes[i][0].length=== 3){
                    console.error('tres' ,duplicate_notes[i])
                    draw_notes.push(

                        new VF.TabNote({
                            positions: [
                                {
                                    str: duplicate_notes[i][0][0]['str'],
                                    fret: duplicate_notes[i][0][0]['fret']
                                },
                                {
                                    str: duplicate_notes[i][0][1]['str'],
                                    fret: duplicate_notes[i][0][1]['fret']
                                },
                                {
                                    str: duplicate_notes[i][0][2]['str'],
                                    fret: duplicate_notes[i][0][2]['fret']
                                }


                            ],
                            duration: duplicate_notes[i][1].duration,
                            time: duplicate_notes[i][1].time,
                        })

                    )

                }
                if (duplicate_notes[i][0].length=== 4){
                    console.error('cuatro', duplicate_notes[i])
                    draw_notes.push(

                        new VF.TabNote({
                            positions: [
                                {
                                    str: duplicate_notes[i][0][0]['str'],
                                    fret: duplicate_notes[i][0][0]['fret']
                                },
                                {
                                    str: duplicate_notes[i][0][1]['str'],
                                    fret: duplicate_notes[i][0][1]['fret']
                                },
                                {
                                    str: duplicate_notes[i][0][2]['str'],
                                    fret: duplicate_notes[i][0][2]['fret']
                                },
                                {
                                    str: duplicate_notes[i][0][3]['str'],
                                    fret: duplicate_notes[i][0][3]['fret']
                                }
                            ],
                            duration: duplicate_notes[i][1].duration,
                            time: duplicate_notes[i][1].time,
                        })

                    )


                }

               /* draw_notes.splice(i -1,1)
                i += 1*/
            }

        else {
                draw_notes.push(

                    new VF.TabNote({
                        positions: [
                            {
                                str: sort_notes_arr[i].cuerda_parsed,
                                fret: sort_notes_arr[i].fret_parsed
                            }
                        ],
                        duration: sort_notes_arr[i].music_duration,
                        time: sort_notes_arr[i].time,
                    })

                )
            }

    console.log(i)
    }
    console.error(draw_notes)
    VF.Formatter.FormatAndDraw(context, stave, draw_notes);


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
                            nota.fret= frets[fret][nota.name].slice(2,4)
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
