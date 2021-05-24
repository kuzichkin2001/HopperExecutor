const drawWorkspace = (beg_x, end_x, count, height) => {
    const stepLength = (end_x - beg_x) / count;
    for (let i = 0; i < count; ++i) {
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

const image = new Image();
const hopper = new Image();

image.onload = function() {
    context.drawImage(image, 0, 0, canvas.scrollWidth, canvas.scrollHeight);

    context.beginPath();
    context.moveTo(40, 300);
    context.lineWidth = 3;
    context.lineCap = 'round';
    context.lineTo(760, 300);
    context.stroke();

    hopper.onload = function() {
        setTimeout(() => {
            context.drawImage(hopper, 15, 240, 50, 50);
        }, 250);
    }

    drawWorkspace(40, 740, 12, 300);
    drawArrow(760, 300);
}

image.src = '/static/hopper/images/background.png';
hopper.src = '/static/hopper/images/hopper.png';

function parseGrasshopperCode() {
    let left = 0, right = 0;
    const input = document.getElementById('command-input');
    let rows = input.value.split('\n');
    for (let row of rows) {
        const rowParts = row.trim().split(' ');
        if (rowParts.length === 2) {
            if (rowParts[0] === 'нц') {
                for (let i = 0; i < +rowParts[1]; ++i) {

                }
            }
        }
    }
}