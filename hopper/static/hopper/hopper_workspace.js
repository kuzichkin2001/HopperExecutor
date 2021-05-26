const drawWorkspace = (beg_x, end_x, height) => {
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

const drawArrow = (end_x, end_y) => {
    context.beginPath();
    context.moveTo(end_x, end_y);
    context.lineCap = 'round';
    context.lineWidth = 3;
    context.lineTo(end_x - 20, end_y - 10);
    context.moveTo(end_x, end_y);
    context.lineTo(end_x - 20, end_y + 10);
    context.stroke();
}

const canvas = document.getElementById('hopper-workspace');
const context = canvas.getContext('2d');

canvas.width = canvas.scrollWidth;
canvas.height = canvas.scrollHeight;

const hopper = new Image();

var currentPosition = {
    x: 15,
    y: 190,
};

const commands = parseGrasshopperCode();
canvas.onclick = () => {
    for (let command of commands) {
        let ctx = {
            command,
            currentPosition
        };
        if (command.direction === 'left') {
            console.log('left');
            for (let iter = 0; iter < command.value; ++iter) {
                renderCanvas.call(ctx);
            }
        } else {
            console.log('right');
            for (let iter = 0; iter < command.value; ++iter) {
                renderCanvas.call(ctx);
            }
        }
    }
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

const duration = 250;
const step_x = 70;
const step_y = 50;
let restrict_x = 0;

renderWorkSpace();

function renderCanvas() {
    requestAnimationFrame(renderCanvas.bind(this));
    if (this.direction === 'left') {
        console.log("захожу влево");
        if (restrict_x < 70) {
            this.currentPosition.x -= step_x / duration;
            this.currentPosition.y -= (restrict_x <= 35 ? 1 : -1) * step_y / duration;
            context.clearRect(0, 0, canvas.width, canvas.height);
            restrict_x += step_x / duration;
            renderWorkSpace();
            context.drawImage(hopper, currentPosition.x, currentPosition.y, 50, 50);
        } else {
            restrict_x = 0;
        }
    } else {
        console.log("захожу вправо");
        this.currentPosition.x += step_x / duration;
        this.currentPosition.y -= (restrict_x <= 35 ? 1 : -1) * step_y / duration;
        context.clearRect(0, 0, canvas.width, canvas.height);
        renderWorkSpace();
        context.drawImage(hopper, currentPosition.x, currentPosition.y, 50, 50);
    }
    restrict_x = 0;
}


hopper.src = '/static/hopper/images/hopper.png';

function parseGrasshopperCode() {
    const stepsSuccession = [];
    const input = document.getElementById('command-input');
    let rows = input.value.split('\n');
    for (let row of rows) {
        const rowParts = row.split(' ');
        if (rowParts[0] === 'влево') {
            stepsSuccession.push({ direction: 'left', value: +rowParts[1] });
        } else if (rowParts[0] === 'вправо') {
            stepsSuccession.push({ direction: 'right', value: +rowParts[1] });
        } else {
            throw new Error(`Команды ${rowParts[0]} не существует. Попробуйте ввести Влево или Вправо`);
        }
    }
    return stepsSuccession;
}