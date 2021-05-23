document.addEventListener('DOMContentLoaded', () => {
    const scure = document.querySelectorAll('.grid div'),
        scoreShow = document.querySelector('.score'),
        start = document.querySelector('.start');

    const width = 10;
    let currentIndex = 0,
        foodIndex = 0,
        currentSnak = [2, 1, 0],

        direction = 1,
        score = 0,
        speed = 0.9,
        intervelTime = 0,
        intervel = 0;

    function startGame() {
        currentSnak.forEach(index => scure[index].classList.remove('snak'));
        scure[foodIndex].classList.remove('food');
        clearInterval(intervel);
        score = 0;

        randomFood()

        direction = 1;
        scoreShow.innertext = score;
        intervelTime = 1000;
        currentSnak = [2, 1, 0];
        currentIndex = 0;

        currentSnak.forEach(index => scure[index].classList.add('snak'));
        intervel = setInterval(moveOutcomes, intervelTime);

    }

    function moveOutcomes() {
        if (
            (currentSnak[0] + width >= (width * width) && direction === width) || (currentSnak[0] % width === width - 1 && direction === 1) || (currentSnak[0] % width === 0 && direction === -1) || (currentSnak[0] - width < 0 && direction === - width) ||
            scure[currentSnak[0] + direction].classList.contains('snak')
        ) {
            return clearInterval(intervel);
        }
        const tail = currentSnak.pop();
        scure[tail].classList.remove('snak');
        currentSnak.unshift(currentSnak[0] + direction);

        if (scure[currentSnak[0]].classList.contains('food')) {
            scure[currentSnak[0]].classList.remove('food')
            scure[tail].classList.add('snak');
            currentSnak.push(tail);

            randomFood()

            score++;
            scoreShow.textContent = score;

            clearInterval(intervel);
            intervelTime = intervelTime + speed;
            intervel = setInterval(moveOutcomes, intervelTime);
        }
        scure[currentSnak[0]].classList.add('snak');
    }

    function randomFood() {
        do {
            foodIndex = Math.floor(Math.random() * scure.length);
        } while (scure[foodIndex].classList.contains('snak'))
        scure[foodIndex].classList.add('food');
    }

    function control(e) {
        scure[currentIndex].classList.remove('snak');

        if (e.keyCode === 39) {
            direction = 1;
        } else if (e.keyCode === 38) {
            direction = -width;
        } else if (e.keyCode === 37) {
            direction = -1;
        } else if (e.keyCode === 40) {
            direction = +width;
        }
    }

    document.addEventListener('keyup', control);

    start.addEventListener('click', startGame);

});
