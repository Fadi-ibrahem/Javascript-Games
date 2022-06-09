//Specifying What will Happen When User Click ON StartGame Button
document.querySelector(".control-buttons span").onclick = function (){
    
    let yourName = prompt("Whats Your Name ?")
    
    if(yourName)
        document.querySelector(".name span").innerHTML = yourName;
    else
        document.querySelector(".name span").innerHTML = "UnKnown";

    //Removing The Button & It's Background From DOM
    document.querySelector(".control-buttons").remove();
};

let duration = 1000;

//Select Blocks Container
let blocksContainer = document.querySelector(".memory-game-blocks");

//Create Array From Game Blocks
let blocks = Array.from(blocksContainer.children);

//Create Range Of Keys
//let blocks = Array.from(Array(blocks.length).keys())
let orderRange = [...Array(blocks.length).keys()];

shuffle(orderRange);

//Add Order Css Property to Game Blocks
blocks.forEach((block, index) =>{

    //Add Css Order Property
    block.style.order = orderRange[index];

    //Add Click Event
    block.addEventListener('click', function(){

        //Trigger The flip-block function
        flipBlock(block);
    })
});

//Create Function Flip Block
function flipBlock(selectedBlock){

    //Add Class is-flipped
    selectedBlock.classList.add('is-flipped');

    //Collect All Flipped Cards
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

    //If There's Two Selected Blocks
    if(allFlippedBlocks.length ===2){
        
        stopClicking();

        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
    }
}

//Creating stopClicking Function 
function stopClicking (){

    blocksContainer.classList.add('no-clicking');

    setTimeout(()=> {
        blocksContainer.classList.remove('no-clicking');
    }, duration)
};

//Creating checkMatchedBlocks Function
function checkMatchedBlocks (firstBlock, secondBlock){

    let triesElement = document.querySelector('.tries span');

    if(firstBlock.dataset.technology === secondBlock.dataset.technology){

        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');

        document.getElementById('success').play();
    }else {

        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

        setTimeout(() => {
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
        }, 1000);

        document.getElementById('fail').play();
    }
}

//Creating Shuffle Function
function shuffle(array){

    //Setting Main Variables
    let current = array.length,
        temp,
        random;

    while( current > 0 ){
        
        //Get Random Number
        random = Math.floor(Math.random() * current);

        //Decrease length By One
        current--;

        //[1]Save Current Element in Stash
        temp = array[current];

        //[2]Current Element = Random Element
        array[current] = array[random];
        
        //[3]Random Element = Element in Stash
        array[random] = temp;
    }

    return array;
}