export const HEIGHT = 20;
export const WIDTH = 10;
export const TIME_GAP = 700;
export const newEmpty = () => {
    const data = [];
    for(let i = 0; i < HEIGHT; i++){
        const newLine = [];
        for(let j = 0; j < WIDTH; j++){
            newLine.push(0);
        }
        data.push(newLine);
    }
    return data;
}

export const newBlock = [
    [[1,1,1,1]], //1X4
    [[1,1],[1,1]], // 2X2
    [[1,1,0],[0,1,1]], //Z
    [[0,1,1],[1,1,0]],
    [[0,1,0],[1,1,1]],
    [[1,0,0],[1,1,1]],
    [[0,0,1],[1,1,1]],
    [[1,1,1,1]], //1X4
    [[1,1],[1,1]] // 2X2
];

export const newActive = (mode) => {
    if(mode){
        return newBlock[Math.floor(Math.random()*newBlock.length)];
    }
    else{
        return newBlock[Math.floor(Math.random()* (newBlock.length-2) )];
    }
}

export const newConstants = 208;