import { rand } from "@tensorflow/tfjs-core";

const keywords = [
    "Feelings",
    "Spirits",
    "Sleep",
    "Work",
    "Health",
    "Power",
    "Control",
    "Income",
    "Mistakes",
    "Savings",
    "Heat",
    "Status",
    "Position",
    "Relationships",
    "Wellbeing",
    "Standards",
    "Energy",
    "Noise",
    "Voice",
    "Eyesight",
    "Hands",
    "Consciousness",
    "Questions",
    "Sun",
    "Holidays"
];

class Word {
    constructor(name, decision, color, offset){
        this.name = name;
        this.decision = decision;
        this.color = color;
        this.offset = offset;
    }
}

const Modules = [];
for (let k = 0; k < 25; k++){
    Modules[k] = new Word (keywords[k], 2, "#2F4F4F", Math.random() * (170 - 70) + 120);
    // console.log(Modules[k]);
}


export const drawKeywords = (ctx, index, des) => {
    for (let i = 0; i < 5; i++){
        for (let j = 0; j < 5; j++){

            ctx.fillStyle = "#2F4F4F";

            if((i * 5 + j) == index){
                Modules[i * 5 + j].decision = des;

                ctx.fillStyle = "#B22222";
            }

            let m = Modules[i * 5 + j];
            
            
            ctx.font = '50px "Special Elite"';
            ctx.textAlign = "center";
            ctx.fill();


            if(m.decision == 0){
                ctx.fillText(m.name, i*300 + m.offset, j*160+120); 
            }

            if(m.decision == 1){
                ctx.fillText(m.name, i*300 + m.offset, j*160+80); 
            }

            if(m.decision == 2){
                ctx.fillText(m.name, i*300 + m.offset, j*160+100);  
            }
                     
        }
        
    }

    
}