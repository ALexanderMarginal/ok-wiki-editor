export default function debounce(f, ms) {

    let isCountdown = false;

    return function () {
        if (isCountdown) return;

        f.apply(this, arguments);

        isCountdown = true;

        setTimeout(() => isCountdown = false, ms);
    };

}
