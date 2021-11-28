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
        if(audio.volume < 0.99){
            audio.volume += 0.01;
        }
        
    } else {
        if(audio.volume > 0.01){
            audio.volume -= 0.01;
        }
        
    }

    console.log(decision);
    console.log(audio.volume);
}
