var frets = {
        sexta:{
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
        function drawnote(event,last){
         var currentEvent = event.name 
         var lastEvent = last
         
         console.log(currentEvent) 
         console.log(lastEvent)     
                for(var note in frets.sexta){
                
                if(event.name===note){
                        let fretSelected = frets.sexta[currentEvent]
                        let lastfretSelected = frets.sexta[lastEvent]
                        let pointImage = `images/selected/${frets.sexta[lastEvent]}.png`
                        let currentImage = `images/current/images/${frets.sexta[note]}.png`            
                        // console.log(fretSelected)
                        // console.log(lastfretSelected)
                        Tone.Draw.schedule(function(){
                        
                        document.getElementById(fretSelected).src = currentImage;
                        document.getElementById(lastfretSelected).src = pointImage;
                        })
                        }
                }
                for(var note in frets.quinta){
                
                if(event.name===note){
                        let fretSelected = frets.quinta[currentEvent]
                        let lastfretSelected = frets.quinta[lastEvent]
                        let pointImage = `images/selected/${frets.quinta[lastEvent]}.png`
                        let currentImage = `images/current/images/${frets.quinta[note]}.png`            
                        // console.log(fretSelected)
                        // console.log(lastfretSelected)
                        Tone.Draw.schedule(function(){
                        
                        document.getElementById(fretSelected).src = currentImage;
                        document.getElementById(lastfretSelected).src = pointImage;
                        })
                        }
                }
                for(var note in frets.cuarta){
                
                if(event.name===note){
                        let fretSelected = frets.cuarta[currentEvent]
                        let lastfretSelected = frets.cuarta[lastEvent]
                        let pointImage = `images/selected/${frets.cuarta[lastEvent]}.png`
                        let currentImage = `images/current/images/${frets.cuarta[note]}.png`            
                        // console.log(fretSelected)
                        // console.log(lastfretSelected)
                        Tone.Draw.schedule(function(){
                        
                        document.getElementById(fretSelected).src = currentImage;
                        document.getElementById(lastfretSelected).src = pointImage;
                        })
                        }
                }
                for(var note in frets.tercera){
                
                if(event.name===note){
                        let fretSelected = frets.tercera[currentEvent]
                        let lastfretSelected = frets.tercera[lastEvent]
                        let pointImage = `images/selected/${frets.tercera[lastEvent]}.png`
                        let currentImage = `images/current/images/${frets.tercera[note]}.png`            
                        // console.log(fretSelected)
                        // console.log(lastfretSelected)
                        Tone.Draw.schedule(function(){
                        
                        document.getElementById(fretSelected).src = currentImage;
                        document.getElementById(lastfretSelected).src = pointImage;
                        })
                        }
                }
                for(var note in frets.segunda){
                
                if(event.name===note){
                        let fretSelected = frets.segunda[currentEvent]
                        let lastfretSelected = frets.segunda[lastEvent]
                        let pointImage = `images/selected/${frets.segunda[lastEvent]}.png`
                        let currentImage = `images/current/images/${frets.segunda[note]}.png`            
                        // console.log(fretSelected)
                        // console.log(lastfretSelected)
                        Tone.Draw.schedule(function(){
                        
                        document.getElementById(fretSelected).src = currentImage;
                        document.getElementById(lastfretSelected).src = pointImage;
                        })
                        }
                }
                for(var note in frets.primera){
                
                if(event.name===note){
                        let fretSelected = frets.primera[currentEvent]
                        let lastfretSelected = frets.primera[lastEvent]
                        let pointImage = `images/selected/${frets.primera[lastEvent]}.png`
                        let currentImage = `images/current/images/${frets.primera[note]}.png`            
                        // console.log(fretSelected)
                        // console.log(lastfretSelected)
                        Tone.Draw.schedule(function(){
                        
                        document.getElementById(fretSelected).src = currentImage;
                        document.getElementById(lastfretSelected).src = pointImage;
                        })
                        }
                }
           
                
    
        }
        var lastEvent= null
        function playNote(time, event){
            synth.triggerAttackRelease(event.name, event.duration, time, event.velocity);
            drawnote(event,lastEvent)
            lastEvent= event.name
            console.log(lastEvent)
        }
        //acciona el midi con el boton "play" y empieza el transport
        var button = document.getElementById("play");
        button.addEventListener("click ", function(){
            if (Tone.Transport.state === "started "){
                Tone.Transport.stop();
               
            } else {
                Tone.Transport.start("+0.1 ", 0);
                
            }
        });
        //al empezar el transport se acciona currentPicado
        MidiConvert.load("Buleria_Aflaco.mid ").then(function(midi){
            // play right and left hand with a poly synth
            var rightHand = midi.get("Inst 1").notes;
            // var leftHand = midi.get("Piano left ").notes;
            // make sure you set the tempo before you schedule the events
            Tone.Transport.bpm.value = midi.bpm;
            Tone.Transport.timeSignature = midi.timeSignature;
            var currentPicado = new Tone.Part(playNote, rightHand).start(0);
          
        });