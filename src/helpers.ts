export const getUniqueResolutions = (files: Array) => {
    const resolutions = files.map(item => {
        if (item.type !== 'dir') {
                const pattern = /(\d+[\.,]?\d*)([РP]?)[xх](\d+[\.,]?\d*)([РP]?)/;

                const withoutExtension = item.name.replace(/\.\w+$/, '');
                const match = withoutExtension.match(pattern);
                if (match) {
                    const firstValue = match[1];
                    const firstP = match[2];
                    const secondValue = match[3];
                    const secondP = match[4];

                    // Добавляем P (или Р), если они присутствуют
                    const firstPart = firstP ? `${firstValue}${firstP}` : firstValue;
                    const secondPart = secondP ? `${secondValue}${secondP}` : secondValue;

                    return `${firstPart}x${secondPart}`
                } else {
                    return null
                }


            // return item.name.match(/(\d+([,.]\d+)?[xх]\d+([,.]\d+)?|\d+[xх]\d+P[РP]|\d+P[РP]\d+P)/i)?.length ? item.name.match(/(\d+([,.]\d+)?[xх]\d+([,.]\d+)?|\d+[xх]\d+P[РP]|\d+P[РP]\d+P)/i)[0] : null
        }
    })

    return [...new Set(resolutions)].join(' ') === ' ' ? null : [...new Set(resolutions)].join(' ')
};

export const getTypesFiles = (files) => {
    const nums = files.map(item => {
        if (item.type !== 'dir') {
            return item.name.split('.')[item.name.split('.').length - 1]
        }
    }).filter(item => item !== undefined)

    return nums.reduce((acc, i) => {
        if (acc.hasOwnProperty(i)) {
            acc[i] += 1;
        } else {
            acc[i] = 1;
        }
        return acc;
    },{});
};
