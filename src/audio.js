import sound from './man_breathing.wav';
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
        if(audio.volume > 0.002){
            audio.volume -= 0.002;
        }
        
    } else {
        if(audio.volume < 0.998){
            audio.volume += 0.002;
        }
        
    }

    console.log(audio.volume);
}
