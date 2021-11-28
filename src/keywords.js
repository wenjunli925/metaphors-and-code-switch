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
    constructor(name, decision, color){
        this.name = name;
        this.decision = decision;
        this.color = color;
    }
}

const Modules = [];
for (let k = 0; k < 25; k++){
    Modules[k] = new Word (keywords[k], 2, "blue");
    // console.log(Modules[k]);
}


export const drawKeywords = (ctx, index, des) => {
    for (let i = 0; i < 5; i++){
        for (let j = 0; j < 5; j++){

            ctx.fillStyle = "blue";

            if((i * 5 + j) == index){
                Modules[i * 5 + j].decision = des;

                ctx.fillStyle = "yellow";
            }

            let m = Modules[i * 5 + j];
            
            
            ctx.font = '40px Impact';
            ctx.fill();


            if(m.decision == 0){
                ctx.fillText(m.name, i*225, j*100+120); 
            }

            if(m.decision == 1){
                ctx.fillText(m.name, i*225, j*100+80); 
            }

            if(m.decision == 2){
                ctx.fillText(m.name, i*225, j*100+100);  
            }
                     
        }
        
    }

    
}