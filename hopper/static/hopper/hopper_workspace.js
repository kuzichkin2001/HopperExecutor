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
const currentPosition = {
    x: 15,
    y: 190,
};

renderWorkSpace();

const debounce = (func, wait) => {
  let interval;

  return function executedFunction(...args) {
  const later = () => {
      clearInterval(interval);
      func(...args);
    };
    clearInterval(interval);
    interval = setInterval(later, wait);
  };
};

function jump(obj) {
    const { clear, update, render } = obj;
    let pTimestamp = 0;

    requestAnimationFrame(tick);

    function tick(timestamp) {
        let myRequest = requestAnimationFrame(tick);
        const diff = timestamp - pTimestamp;
        pTimestamp = timestamp;
        const fps = 1000 / diff;
        const secondPart = diff / 1000;

        const params = {
            pTimestamp,
            timestamp,
            diff,
            fps,
            secondPart,
            myRequest,
        };

        update(params);
        clear();
        render(params);
    }
}

canvas.onclick = function() {
    currentPosition.x = 15;
    currentPosition.y = 190;
    const commands = parseGrasshopperCode();
    let angle = 0;
    const right = debounce((iter) => {
        console.log(iter);
        var interval = setInterval(() => jump({
            clear() {
                context.clearRect(0, 0, canvas.width, canvas.height);
            },
            update(params) {
                currentPosition.x = (15 - iter * 70) + 35 * (Math.cos(angle) - 1);
                currentPosition.y = 190 - 15 * Math.sin(angle);
                angle += 0.09;
                if (angle > Math.PI) {
                    angle = 0;
                    iter++;
                    cancelAnimationFrame(params.myRequest);
                    clearInterval(interval);
                }
            },
            render() {
                renderWorkSpace();
                context.drawImage(hopper, currentPosition.x, currentPosition.y, 50, 50);
            }
        }), 250);
    }, 250);
    const left = debounce((iter) => {
        console.log(iter);
        var interval = setInterval(() => jump({
            clear() {
                context.clearRect(0, 0, canvas.width, canvas.height);
            },
            update(params) {
                currentPosition.x = (15 - iter * 70) + 35 * (Math.cos(angle) - 1);
                currentPosition.y = 190 - 15 * Math.sin(angle);
                angle += 0.09;
                if (angle > Math.PI) {
                    angle = 0;
                    iter++;
                    cancelAnimationFrame(params.myRequest);
                    clearInterval(interval);
                }
            },
            render() {
                renderWorkSpace();
                context.drawImage(hopper, currentPosition.x, currentPosition.y, 50, 50);
            }
        }), 250);

    }, 250);
    for (let command of commands) {
        let iter = 0;
        if (command.direction === 'right') {
            for (let i = 0; i < command.value; ++i) {
                setTimeout(() => right(i), 250 * (iter + 2));
                iter++;
            }
        } else if (command.direction === 'left') {
            for (let i = 0; i < command.value; ++i) {
                setTimeout(() => left(i), 250 * (iter + 2));
                iter++;
            }
        }
    }


    // for (let command of commands) {
    //     let iter = 0;
    //     let angle = 0;
    //     renderCanvas({
    //         clear() {
    //             context.clearRect(0, 0, canvas.width, canvas.height);
    //         },
    //         update(params) {
    //             if (command.direction === 'left') {
    //                 console.log('left');
    //                 currentPosition.x = Math.abs(35 * Math.cos(angle));
    //                 if (angle > Math.PI) {
    //                     iter++;
    //                 }
    //                 if (command.value === iter) {
    //                     cancelAnimationFrame(params.myRequest);
    //                 }
    //             } else if (command.direction === 'right') {
    //                 console.log('right');
    //                 currentPosition.x = Math.abs(35 * Math.cos(Math.PI - angle));
    //                 if (angle > Math.PI) {
    //                     iter++;
    //                 }
    //                 if (command.value === iter) {
    //                     cancelAnimationFrame(params.myRequest);
    //                 }
    //             }
    //             angle += 0.18;
    //             currentPosition.y = 190 - 15 * Math.sin(angle);
    //         },
    //         render() {
    //             renderWorkSpace();
    //             context.drawImage(hopper, currentPosition.x, currentPosition.y, 50, 50);
    //         },
    //     });
    // }
}

// function renderCanvas(obj) {
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