

 $("#play").on("click", () => {

         Tone.Transport.start("+0.1")

     })


 $("#stop").on("click", () => {
     Tone.Transport.stop()

 })
