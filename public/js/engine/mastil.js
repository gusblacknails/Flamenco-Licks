
var frets = {
    sexta: {
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
    quinta: {
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
    cuarta: {
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
    tercera: {
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
    segunda: {
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
    primera: {
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
}
var synth = new Tone.PolySynth(8, Tone.Synth, {
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
var sixthString = 0

var fifthString = 0
var fourthString = 0
var thirdString = 0
var secondString = 0
var firstString = 0







//al empezar el transport se acciona currentPicado

function drawnote(event, last) {
    var currentEvent = event.name
    var lastEvent = last
    var notesXstring = 3
    // console.log(event.name)


    for (note in frets.sexta) {


        if (event.name === note && sixthString < notesXstring) {
            var fretSelected = frets.sexta[currentEvent]
            var lastfretSelected = frets.sexta[lastEvent]
            var pointImage = `images/selected/${frets.sexta[lastEvent]}.png`
            var currentImage = `images/current/images/${frets.sexta[note]}.png`
            Tone.Draw.schedule(function() {
                document.getElementById(fretSelected).src = currentImage;
                document.getElementById(lastfretSelected).src = pointImage;
            })
            sixthString += 1

        }
    }
    if(sixthString === notesXstring){
        for (note in frets.quinta) {

        if (event.name === note && fifthString < notesXstring) {
             fretSelected = frets.quinta[currentEvent]
            if (fifthString == 0) {
                 lastfretSelected = frets.sexta[lastEvent]
                 pointImage = `images/selected/${frets.sexta[lastEvent]}.png`
            } else {
                 lastfretSelected = frets.quinta[lastEvent]
                 pointImage = `images/selected/${frets.quinta[lastEvent]}.png`
            }
             currentImage = `images/current/images/${frets.quinta[note]}.png`
            Tone.Draw.schedule(function() {

                document.getElementById(fretSelected).src = currentImage;
                document.getElementById(lastfretSelected).src = pointImage;
            })
            fifthString += 1
        }
    }
    }
    
    if(fifthString === notesXstring){ for (note in frets.cuarta) {

        if (event.name === note && fourthString < notesXstring) {
             fretSelected = frets.cuarta[currentEvent]
            if (fourthString == 0) {
                 lastfretSelected = frets.quinta[lastEvent]
                 pointImage = `images/selected/${frets.quinta[lastEvent]}.png`
            } else {
                 lastfretSelected = frets.cuarta[lastEvent]
                 pointImage = `images/selected/${frets.cuarta[lastEvent]}.png`
            }

             currentImage = `images/current/images/${frets.cuarta[note]}.png`
            Tone.Draw.schedule(function() {
                document.getElementById(fretSelected).src = currentImage;
                document.getElementById(lastfretSelected).src = pointImage;
            })
            fourthString += 1
        }
    }}

    if(fourthString === notesXstring){
        for (note in frets.tercera) {

        if (event.name === note && thirdString < notesXstring) {
             fretSelected = frets.tercera[currentEvent]
            if (thirdString == 0) {
                 lastfretSelected = frets.cuarta[lastEvent]
                 pointImage = `images/selected/${frets.cuarta[lastEvent]}.png`
            } else {
                 lastfretSelected = frets.tercera[lastEvent]
                 pointImage = `images/selected/${frets.tercera[lastEvent]}.png`
            }

             currentImage = `images/current/images/${frets.tercera[note]}.png`
            Tone.Draw.schedule(function() {
                document.getElementById(fretSelected).src = currentImage;
                document.getElementById(lastfretSelected).src = pointImage;
            })
            thirdString += 1
        }
    }
    // console.log(thirdString)
    }
    if(thirdString === notesXstring){

        for (note in frets.segunda) {

        if (event.name === note && secondString < notesXstring) {

            fretSelected = frets.segunda[currentEvent]
            if (secondString == 0) {
                 lastfretSelected = frets.tercera[lastEvent]
                 pointImage = `images/selected/${frets.tercera[lastEvent]}.png`
            } else {
                 lastfretSelected = frets.segunda[lastEvent]
                 pointImage = `images/selected/${frets.segunda[lastEvent]}.png`
            }

            currentImage = `images/current/images/${frets.segunda[note]}.png`
            Tone.Draw.schedule(function() {

                document.getElementById(fretSelected).src = currentImage;
                document.getElementById(lastfretSelected).src = pointImage;
            })
            secondString += 1
        }

    }}
    if(secondString === notesXstring){
         for (note in frets.primera) {

        if (event.name === note) {
             fretSelected = frets.primera[currentEvent]
            if (firstString == 0) {
                 lastfretSelected = frets.segunda[lastEvent]
                 pointImage = `images/selected/${frets.segunda[lastEvent]}.png`
            } else {
                 lastfretSelected = frets.primera[lastEvent]
                 pointImage = `images/selected/${frets.primera[lastEvent]}.png`
            }
            currentImage = `images/current/images/${frets.primera[note]}.png`
            Tone.Draw.schedule(function() {

                document.getElementById(fretSelected).src = currentImage;
                document.getElementById(lastfretSelected).src = pointImage;
            })
            firstString += 1
        }
    }
    }
   
}

var lastEvent = null

function playNote(time, event) {


    synth.triggerAttackRelease(event.name, event.duration, time, event.velocity);
    drawnote(event, lastEvent)


    lastEvent = event.name
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

        console.log(midi.tracks[0].name)
        var melody = midi.get(midi.tracks[0].name).notes;
        console.log(melody)
        // make sure you set the tempo before you schedule the events
        Tone.Transport.bpm.value = midi.bpm;
        Tone.Transport.timeSignature = midi.timeSignature;
        var currentPicado = new Tone.Part(playNote, melody).start(0);

    });

    console.log(currentMidi[selectedValue])
}

function drawnote_2(event) {

    console.log(event)


}

MidiConvert.load("midis/mc_v3.mid").then(function(midi) {

    console.log(midi)

    var melody_sexta = midi.tracks[1].notes;
    melody_sexta.forEach(function(element){
        element.string = "E"
    });

    var melody_quinta = midi.tracks[2].notes;
    melody_quinta.forEach(function(element){
        element.string = "A"
    });
    var melody_cuarta = midi.tracks[3].notes;
    melody_cuarta.forEach(function(element){
        element.string = "D"
    });
    var melody_tercera = midi.tracks[4].notes;
    melody_tercera.forEach(function(element){
        element.string = "G"
    });
    var melody_segunda = midi.tracks[5].notes;
    melody_segunda.forEach(function(element){
        element.string = "B"
    });
    var melody_primera = midi.tracks[6].notes;
    melody_primera.forEach(function(element){
        element.string = "e"
    });
    console.log(melody_sexta)
    console.log(melody_segunda)


    // make sure you set the tempo before you schedule the events
    Tone.Transport.bpm.value = midi.bpm;
    Tone.Transport.timeSignature = midi.timeSignature;
    var sexta = new Tone.Part(playNote, melody_sexta).start(0);

    var quinta = new Tone.Part(playNote, melody_quinta).start(0);

    var cuarta = new Tone.Part(playNote, melody_cuarta).start(0);

    var tercera = new Tone.Part(playNote, melody_tercera).start(0);

    var segunda = new Tone.Part(playNote, melody_segunda).start(0);

    var primera = new Tone.Part(playNote, melody_primera).start(0);

});


// MidiConvert.load("midis/mc_v3.mid").then(function(midi) {
//
//     console.log(midi.tracks[2].notes)
//
//     var melody_sexta = midi.tracks[1].notes;
//     var melody_quinta = midi.tracks[2].notes;
//     var melody_cuarta = midi.tracks[3].notes;
//     var melody_tercera = midi.tracks[4].notes;
//     var melody_segunda = midi.tracks[5].notes;
//     var melody_primera = midi.tracks[6].notes;
//
//     console.log(melody_sexta)
//     console.log(melody_quinta)
//     // make sure you set the tempo before you schedule the events
//     Tone.Transport.bpm.value = midi.bpm;
//     Tone.Transport.timeSignature = midi.timeSignature;
//     var sexta = new Tone.Part(playNote, melody_sexta).start(0);
//     var quinta = new Tone.Part(playNote, melody_quinta).start(0)
//     var cuarta = new Tone.Part(playNote, melody_cuarta).start(0)
//     var tercera = new Tone.Part(playNote, melody_tercera).start(0)
//     var segunda = new Tone.Part(playNote, melody_segunda).start(0)
//     var primera = new Tone.Part(playNote, melody_primera).start(0)
// });

// MidiConvert.load("midis/mc_v3.mid").then(function(midi) {
//
//     console.log(midi)
//     var melody = midi.get(midi.tracks[2].name).notes;
//     console.log(melody)
//     // make sure you set the tempo before you schedule the events
//     Tone.Transport.bpm.value = midi.bpm;
//     Tone.Transport.timeSignature = midi.timeSignature;
//     ;
//
// });