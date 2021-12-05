import { rand } from "@tensorflow/tfjs-core";

const keywords = [
    "Joy",
    "Love",
    "Devotion",
    "Suffering",
    "Weeping",
    "Anxiety",
    "Grief",
    "Dejection",
    "Despair",
    "Anger",
    "Hatred",
    "Disdain",
    "Contempt",
    "Disgust",
    "Guilt",
    "Pride",
    "Patience",
    "Helplessness",
    "Shyness",
    "Affirmation",
    "Surprise",
    "Fear",
    "Modesty",
    "Blushing",
    "Sulkiness"
];

class Word {
    constructor(name, decision, color, xoffset, yoffset){
        this.name = name;
        this.decision = decision;
        this.color = color;
        this.xoffset = xoffset;
        this.yoffset = yoffset;
    }
}

const Modules = [];
for (let k = 0; k < 25; k++){
    Modules[k] = new Word (keywords[k], 2, "#2F4F4F", Math.random() * (300 - 0) + 0, Math.random() * (60 - 10) + 10);
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


            if(m.decision == false){
                ctx.fillText(m.name, i*300 + m.xoffset, j*160+120 + m.yoffset); 
            }

            else if(m.decision == true){
                ctx.fillText(m.name, i*300 + m.xoffset, j*160+80 + m.yoffset); 
            }

            else{
                ctx.fillText(m.name, i*300 + m.xoffset, j*160+100 + m.yoffset);  
            }
                     
        }
        
    }

    
}

export const decisionOutput = (output) => {
    let node_1, node_2, node_3, node_4, node_5, node_6, node_7, node_8, node_9, node_10, node_11, node_12, node_13;
    let node_a, node_b, node_c, node_d, node_e, node_f, node_g, node_h, node_i, node_j, node_k, node_l;
    if (keywords[0].decision || keywords[1].decision){
        node_1 = true;
    } else {
        node_1 = false;
    }

    if (keywords[2].decision & keywords[3].decision){
        node_2 = true;
    } else {
        node_2 = false;
    }

    if (!(keywords[4].decision & keywords[5].decision)){
        node_3 = true;
    } else {
        node_3 = false;
    }

    if (keywords[6].decision & keywords[7].decision){
        node_4 = true;
    } else {
        node_4 = false;
    }

    if (!(keywords[8].decision || keywords[9].decision)){
        node_5 = true;
    } else {
        node_5 = false;
    }

    if (!(keywords[10].decision || keywords[11].decision)){
        node_6 = true;
    } else {
        node_6 = false;
    }

    if (!(keywords[12].decision && keywords[13].decision)){
        node_7 = true;
    } else {
        node_7 = false;
    }

    if (keywords[14].decision && keywords[15].decision){
        node_8 = true;
    } else {
        node_8 = false;
    }

    if (keywords[16].decision || keywords[17].decision){
        node_9 = true;
    } else {
        node_9 = false;
    }

    if (keywords[18].decision || keywords[19].decision){
        node_10 = true;
    } else {
        node_10 = false;
    }

    if (keywords[20].decision && keywords[21].decision){
        node_11 = true;
    } else {
        node_11 = false;
    }

    if (keywords[22].decision || keywords[23].decision){
        node_12 = true;
    } else {
        node_12 = false;
    }

    if (!keywords[24].decision){
        node_13 = true;
    } else {
        node_13 = false;
    }

    if (node_1 || node_4){
        node_a = true;
    } else {
        node_a = false;
    }

    if (node_2 || node_11){
        node_b = true;
    } else {
        node_b = false;
    }

    if (node_3 & node_5){
        node_c = true;
    } else {
        node_c = false;
    }

    if (node_6 || node_7){
        node_d = true;
    } else {
        node_d = false;
    }

    if (node_8 || node_13){
        node_e = true;
    } else {
        node_e = false;
    }

    if (node_9 || node_10){
        node_f = true;
    } else {
        node_f = false;
    }

    if (node_f || node_12){
        node_g = true;
    } else {
        node_g = false;
    }

    if (node_g || node_a){
        node_h = true;
    } else {
        node_h = false;
    }

    if (node_b || node_c){
        node_i = true;
    } else {
        node_i = false;
    }

    if (node_e || node_h){
        node_j = true;
    } else {
        node_j = false;
    }

    if (node_i || node_d){
        node_k = true;
    } else {
        node_k = false;
    }

    if (node_j || node_k){
        node_l = true;
    } else {
        node_l = false;
    }

    output  = node_l;

}