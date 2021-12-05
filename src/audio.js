import sound from './calm_breathing.wav';
const audio = new Audio(sound);

export const playSound = () => {   
    document.body.addEventListener("mousemove", function () {       
        audio.play(); 
        audio.volume = 0.5;      
  })
    audio.loop = true;
  }

export const changeVolume = (decision) => {
    if(decision){
        if(audio.volume > 0.001){
            audio.volume -= 0.001;
        }
        
    } else {
        if(audio.volume < 0.999){
            audio.volume += 0.001;
        }
        
    }

    console.log(audio.volume);
}
