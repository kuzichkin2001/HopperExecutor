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
    let globalIter = 0;
    let globalInterval = setInterval(() => {
        let interval = setInterval(() => {
            createjs.Tween.get(hopper, { loop: false })
                .to({ x: hopper.x + (commands[0].direction === 'left' ? -1 : 1) * 35, y: hopper.y - 15 }, 200, createjs.Ease.getPowInOut(1))
                .to({ x: hopper.x + (commands[0].direction === 'left' ? -1 : 1) * 70, y: hopper.y }, 200, createjs.Ease.getPowInOut(1));
            hopper.x += (commands[0].direction === 'left' ? -1 : 1) * 70;
            iter++;
            if (iter === commands[0].value) {
                commands.shift();
                clearInterval(interval);
                iter = 0;
                globalIter += iter;
            }
        }, 400);
        if (globalIter === totalIterations) {
            console.log('end');
            clearInterval(globalInterval);
            globalIter = 0;
        }
    }, 400 * totalIterations);
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


// const duration = 250;
// const step_x = 70;
// const step_y = 50;
// const currentPosition = {
//     x: 15,
//     y: 190,
// };
//
// renderWorkSpace();
//
// const debounce = (func, wait) => {
//     let interval;
//
//     return function executedFunction(...args) {
//         const later = () => {
//             clearInterval(interval);
//             func(...args);
//         };
//         clearInterval(interval);
//         interval = setInterval(later, wait);
//     };
// };
//
// function jump(obj) {
//     const { clear, update, render } = obj;
//     let pTimestamp = 0;
//
//     requestAnimationFrame(tick);
//
//     function tick(timestamp) {
//         let myRequest = requestAnimationFrame(tick);
//         const diff = timestamp - pTimestamp;
//         pTimestamp = timestamp;
//         const fps = 1000 / diff;
//         const secondPart = diff / 1000;
//
//         const params = {
//             pTimestamp,
//             timestamp,
//             diff,
//             fps,
//             secondPart,
//             myRequest,
//         };
//
//         update(params);
//         clear();
//         render(params);
//     }
// }
//
// canvas.onclick = function() {
//     currentPosition.x = 15;
//     currentPosition.y = 190;
//     const commands = parseGrasshopperCode();
//     let angle = 0;
//     const right = debounce((iter) => {
//         console.log(iter);
//         var interval = setInterval(() => jump({
//             clear() {
//                 context.clearRect(0, 0, canvas.width, canvas.height);
//             },
//             update(params) {
//                 currentPosition.x = (15 - iter * 70) + 35 * (Math.cos(angle) - 1);
//                 currentPosition.y = 190 - 15 * Math.sin(angle);
//                 angle += 0.09;
//                 if (angle > Math.PI) {
//                     angle = 0;
//                     iter++;
//                     cancelAnimationFrame(params.myRequest);
//                     clearInterval(interval);
//                 }
//             },
//             render() {
//                 renderWorkSpace();
//                 context.drawImage(hopper, currentPosition.x, currentPosition.y, 50, 50);
//             }
//         }), 250);
//     }, 250);
//     const left = debounce((iter) => {
//         console.log(iter);
//         var interval = setInterval(() => jump({
//             clear() {
//                 context.clearRect(0, 0, canvas.width, canvas.height);
//             },
//             update(params) {
//                 currentPosition.x = (15 - iter * 70) + 35 * (Math.cos(angle) - 1);
//                 currentPosition.y = 190 - 15 * Math.sin(angle);
//                 angle += 0.09;
//                 if (angle > Math.PI) {
//                     angle = 0;
//                     iter++;
//                     cancelAnimationFrame(params.myRequest);
//                     clearInterval(interval);
//                 }
//             },
//             render() {
//                 renderWorkSpace();
//                 context.drawImage(hopper, currentPosition.x, currentPosition.y, 50, 50);
//             }
//         }), 250);
//
//     }, 250);
//     for (let command of commands) {
//         let iter = 0;
//         if (command.direction === 'right') {
//             for (let i = 0; i < command.value; ++i) {
//                 setTimeout(() => right(i), 250 * (iter + 2));
//                 iter++;
//             }
//         } else if (command.direction === 'left') {
//             for (let i = 0; i < command.value; ++i) {
//                 setTimeout(() => left(i), 250 * (iter + 2));
//                 iter++;
//             }
//         }
//     }
//
//
//     // for (let command of commands) {
//     //     let iter = 0;
//     //     let angle = 0;
//     //     renderCanvas({
//     //         clear() {
//     //             context.clearRect(0, 0, canvas.width, canvas.height);
//     //         },
//     //         update(params) {
//     //             if (command.direction === 'left') {
//     //                 console.log('left');
//     //                 currentPosition.x = Math.abs(35 * Math.cos(angle));
//     //                 if (angle > Math.PI) {
//     //                     iter++;
//     //                 }
//     //                 if (command.value === iter) {
//     //                     cancelAnimationFrame(params.myRequest);
//     //                 }
//     //             } else if (command.direction === 'right') {
//     //                 console.log('right');
//     //                 currentPosition.x = Math.abs(35 * Math.cos(Math.PI - angle));
//     //                 if (angle > Math.PI) {
//     //                     iter++;
//     //                 }
//     //                 if (command.value === iter) {
//     //                     cancelAnimationFrame(params.myRequest);
//     //                 }
//     //             }
//     //             angle += 0.18;
//     //             currentPosition.y = 190 - 15 * Math.sin(angle);
//     //         },
//     //         render() {
//     //             renderWorkSpace();
//     //             context.drawImage(hopper, currentPosition.x, currentPosition.y, 50, 50);
//     //         },
//     //     });
//     // }
// }
//
// // function renderCanvas(obj) {
// //     const { clear, update, render } = obj;
// //     let pTimestamp = 0;
// //
// //     requestAnimationFrame(tick);
// //
// //     function tick(timestamp) {
// //         let myRequest = requestAnimationFrame(tick);
// //         const diff = timestamp - pTimestamp;
// //         pTimestamp = timestamp;
// //         const fps = 1000 / diff;
// //         const secondPart = diff / 1000;
// //
// //         const params = {
// //             pTimestamp,
// //             timestamp,
// //             diff,
// //             fps,
// //             secondPart,
// //             myRequest,
// //         };
// //
// //         update(params);
// //         clear();
// //         render(params);
// //     }
// // }
//
// hopper.src = '/static/hopper/images/hopper.png';
//
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