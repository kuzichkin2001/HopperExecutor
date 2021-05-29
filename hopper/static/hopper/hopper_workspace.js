var stage, loader;
const canvas = document.getElementById('hopper-workspace');
const context = canvas.getContext('2d');
canvas.width = canvas.scrollWidth;
canvas.height = canvas.scrollHeight;
renderWorkSpace();

function renderHopper() {
    stage = new createjs.Stage('hopper-workspace');

    var line = new createjs.Shape();
    stage.addChild(line);
    line.graphics.setStrokeStyle(3).beginStroke("rgba(0,0,0,1)");
    line.graphics.moveTo(40, 250);
    line.graphics.lineTo(760, 250);
    line.graphics.endStroke();

    const step_length = 70;
    let beg_x = 40;
    const count = 10;

    for (let i = 0; i < count; ++i) {
        const newLine = new createjs.Shape();
        stage.addChild(newLine);
        newLine.graphics.setStrokeStyle(3).beginStroke("rgba(0,0,0,1)");
        newLine.graphics.moveTo(beg_x, 245);
        newLine.graphics.lineTo(beg_x, 255);
        newLine.graphics.endStroke();
        const text = new createjs.Text(`${i}`, '15px Roboto', '#000000');
        text.x = beg_x - 5;
        text.y = 265;
        text.textBaseLine = 'alphabetic';
        stage.addChild(text);
        beg_x += step_length;
    }

    const arrowUp = new createjs.Shape();
    stage.addChild(arrowUp);
    arrowUp.graphics.setStrokeStyle(3).beginStroke('rgba(0,0,0,1)');
    arrowUp.graphics.moveTo(760, 250);
    arrowUp.graphics.lineTo(740, 240);
    arrowUp.graphics.endStroke();

    const arrowDown = new createjs.Shape();
    stage.addChild(arrowDown);
    arrowDown.graphics.setStrokeStyle(3).beginStroke('rgba(0,0,0,1)');
    arrowDown.graphics.moveTo(760, 250);
    arrowDown.graphics.lineTo(740, 260);
    arrowDown.graphics.endStroke();

    createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
    createjs.Ticker.framerate = 120;
    createjs.Ticker.addEventListener('tick', stage);

    var manifest = [
        { "src": "hopper.png", "id": "hopper" }
    ];

    loader = new createjs.LoadQueue(true);
    loader.addEventListener('complete', handleComplete);
    loader.loadManifest(manifest, true, "../static/hopper/images/");
}

function handleComplete() {
    const commands = parseGrasshopperCode();
    createHopper(commands);
}

function createHopper(commands) {
    var hopper = new createjs.Bitmap(loader.getResult('hopper'));

    hopper.x = 15;
    hopper.y = 190;
    hopper.scaleX = 0.14;
    hopper.scaleY = 0.17;

    var iter = 0;
    let totalIterations = 0;
    for (let command of commands) {
        totalIterations += command.value;
    }
    var globalIter = 0;
    let interval = setInterval(() => {
        if (hopper.x + 70 > 690 && commands[0].direction === 'right') {
            showErrorProvider('Кузнечик ударился об правую стенку и упал :(');
            clearInterval(interval);
        } else if (hopper.x - 70 < 0 && commands[0].direction === 'left') {
            showErrorProvider('Кузнечик ударился об левую стенку и упал :(');
            clearInterval(interval);
        }
        if (commands[0].value > 0) {
            createjs.Tween.get(hopper, { loop: false })
                .to({ x: hopper.x + (commands[0].direction === 'left' ? -1 : 1) * 35, y: hopper.y - 25 }, 275, createjs.Ease.getPowInOut(1))
                .to({ x: hopper.x + (commands[0].direction === 'left' ? -1 : 1) * 70, y: hopper.y }, 275, createjs.Ease.getPowInOut(1));
            hopper.x += (commands[0].direction === 'left' ? -1 : 1) * 70;
        }
        iter++;
        if (iter === commands[0].value) {
            commands.splice(0, 1);
            globalIter += iter;
            iter = 0;
        }
        if (globalIter === totalIterations) {
            clearInterval(interval);
        }
    }, 550);
    hopper.crossOrigin = "Anonymous";

    stage.addChild(hopper);
}

function renderWorkSpace() {
    context.beginPath();
    context.moveTo(40, 250);
    context.lineWidth = 3;
    context.lineCap = 'round';
    context.lineTo(760, 250);
    context.stroke();

    drawWorkspace(40, 740, 250);
    drawArrow(760, 250);
}

function parseGrasshopperCode() {
    const stepsSuccession = [];
    const input = document.getElementById('command-input');
    let rows = input.value.split('\n');
    for (let row of rows) {
        const rowParts = row.trim().split(' ');
        console.log(rowParts);
        if (rowParts[0] === 'влево' && isNumber(rowParts[1])) {
            stepsSuccession.push({ direction: 'left', value: +rowParts[1] });
        } else if (rowParts[0] === 'вправо' && isNumber(rowParts[1])) {
            stepsSuccession.push({ direction: 'right', value: +rowParts[1] });
        } else {
            if (rowParts[0] !== 'вправо' && rowParts[0] !== 'влево') {
                showErrorProvider(`Команды "${row}" не существует. Попробуйте команды "влево" или "вправо"`);
            } else if (!rowParts[1]) {
                showErrorProvider(`Команде "${rowParts[0]}" не подан аргумент. Введите количество шагов`)
            }
        }
    }
    console.log(stepsSuccession);
    return stepsSuccession;
}

function drawWorkspace(beg_x, end_x, height) {
    const stepLength = (end_x - beg_x) / 10;
    for (let i = 0; i < 10; ++i) {
        context.font = '15px Roboto';
        context.fillText(`${i}`, beg_x - 5, height + 25);
        context.beginPath();
        context.moveTo(beg_x, height - 5);
        context.lineWidth = 3;
        context.lineCap = 'round';
        context.lineTo(beg_x, height + 5);
        context.stroke();
        beg_x += stepLength;
    }
}

function isNumber(str) {
    if (typeof str !== 'string') return false;
    return !isNaN(str) && !isNaN(parseFloat(str));
}

function drawArrow(end_x, end_y) {
    context.beginPath();
    context.moveTo(end_x, end_y);
    context.lineCap = 'round';
    context.lineWidth = 3;
    context.lineTo(end_x - 20, end_y - 10);
    context.moveTo(end_x, end_y);
    context.lineTo(end_x - 20, end_y + 10);
    context.stroke();
}
