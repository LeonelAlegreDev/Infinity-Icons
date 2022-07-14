const wrapper = document.getElementById('wrapper');

function createNode(element){
    return document.createElement(element);
}
function append(parent, element){
    return parent.appendChild(element);
}
function createRows(){
    let numberOfRows = 99;
    //set the height of the wrapper equal to the hypotenuse of the screen
    let a = window.innerHeight;
    let b = window.innerWidth;
    let c = Math.sqrt(a*a + b*b);

    wrapper.style.height = c.toFixed() + 'px';
    //calculete the number of rows that fit into the wrapper
    while(wrapper.offsetHeight / numberOfRows < 50){
        numberOfRows--;
    }    
    //create rows
    for(let i = 0; i < numberOfRows; i++){
        let row = createNode('section');
        append(wrapper, row);
        row.classList.add('row');
    }
    return document.getElementsByClassName('row');
}
function createBlock(parent){
    let block = createNode('div');

    append(parent, block);
    block.classList.add('block');
    block.style.width = parent.innerWidth / 3;

    return document.getElementsByClassName('block');
}
function createIcons(parent){
    let numberOfIcons = 99;
    let icons = ['icofont-crown-king', 'icofont-ui-love',
                'icofont-star-shape', 'icofont-swirl',
                'icofont-paw', 'icofont-electron'];
    //determine which icon to use
    let pattern = 0;
    //calculete the number of icons that fit into the row
    while(parent.offsetWidth / numberOfIcons < 50){
        numberOfIcons--;
    }
    //reduce the icons[] preventing getting two same icons next to each other
    while(numberOfIcons % icons.length != 0){
        if(icons.length == 3) break;
        icons.pop();
    }
    //create icons
    for(let i = 0; i < numberOfIcons; i++){
        let span = createNode('span');
        let icon = createNode('i');

        append(parent, span);
        append(span, icon);

        icon.classList.add('icon');
        //set pattern of icons
        if(pattern == icons.length){
            pattern = 0;
        }
        icon.classList.add(icons[pattern]);
        pattern++;
    }
    return document.getElementsByClassName('icon');
}
function deleteArray(array){
    do{
        let i = 0;
        if(array[i]){
            array[i].remove();
        }
        else{
            break;
        }
    }while(array.length > 0);
}
function createRightBlock(parent){
    let numberOfBlocks = 1;
    for(let i = 0; i < numberOfBlocks; i++){
        let block = createNode('div');

        append(parent, block);
        block.classList.add('block');
        block.classList.add('right');
        block.style.width = parent.innerWidth / 3;
    }
    return document.getElementsByClassName('block');
}
function createLeftBlock(parent){
    let numberOfBlocks = 1;
    for(let i = 0; i < numberOfBlocks; i++){
        let block = createNode('div');

        append(parent, block);
        block.classList.add('block');
        block.classList.add('left');
        block.style.width = parent.innerWidth / 3;
    }
    return document.getElementsByClassName('block');
}
function app(){
    let rows;
    let blocks;
    let icons;
    let leftBlocks;
    let rightBlocks;

    init();

    window.addEventListener('resize', () => {
        deleteRows();
        init();
    });

    function init(){
        rows = createRows();

        //create blocks inside rows
        for(let i = 0; i < rows.length; i++){
            blocks = createBlock(rows[i]);
            leftBlocks = createLeftBlock(rows[i]);
            rightBlocks = createRightBlock(rows[i]);
        }
        //create icons inside blocks
        for(let i = 0; i < blocks.length; i++){
            icons = createIcons(blocks[i]);
        }
        //set hover animation to icons
        for(let i = 0; i < icons.length; i++){
            let animation;
            let hover = false;
            if(!hover){
                icons[i].parentNode.addEventListener('mouseenter', () => {
                    animation = animateIcons(icons[i]);
                    hover = true;
                });
            }
            else{
                icons[i].addEventListener('mouseenter', () => {
                    animation.cancel();
                    animation = animateIcons(icons[i]);
                });
                hover = false
            }
        }
        //set animation
        function animateIcons(icon){
            icon.keyframes = [{
                filter: 'hue-rotate(180deg)',
            }, {
                opacity: 0
            }, {
                opacity: 1
            }];

            icon.animProps = {
                duration: 2000,
                easing: 'linear',
                iterations: 1
            };
            return icon.animate(icon.keyframes, icon.animProps);
        }
    }
 
    function deleteRows(){
        deleteArray(rows);
    }

}
app();




