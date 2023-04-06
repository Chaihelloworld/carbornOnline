const countDecimals = (value) => {
    if (value === '' || Math.floor(Number(value)) === Number(value)) {
        return 0;
    }
    return value.split('.')[1].length;
};

export function setTwoNumberDecimal(event, min, max) {
    const value = event.currentTarget.value;
    // const min = 1;
    // const max = 100000;
    if (value !== '') {
        // if (Number(value) < min) {
        //     event.currentTarget.value = min;
        // } 
        // else if (Number(value) > max) {
        //     event.currentTarget.value = max;
        // } 
        // else {
            const decimalLength = countDecimals(value);
            if (decimalLength > 2) {
                const newValueArr = value.split('.');
                const newValue = newValueArr[0] + '.' + newValueArr[1].slice(0, 2);
                event.currentTarget.value = newValue;
            }
        // }
    }
}
