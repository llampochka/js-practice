/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
    let i = 0;
    const res = [];
    let stop = false;

    do {
        let count = 0;
        let prefixLetter;
        for (let j = 0; j < strs.length; j++) {
            const str = strs[j];

            if (str[i]) {
                if (count === 0) {
                    prefixLetter = str[i];
                    count++;
                } else {
                    if (prefixLetter === str[i]) {
                        count++;
                    } else {
                        break;
                    }
                }
            } else {
                stop = true;
            }


        }

        console.log(`i = ${i}, count = ${count}`)

        if (count === strs.length) {
            res[i] = prefixLetter
        } else {
            stop = true
        }

        i++;
    } while (!stop)

    return res.join('')
};

function longestCommonPrefix2(strs) {
    if (!strs.length) return '';

    let prefix = strs[0];

    for (let i = 1; i < strs.length; i++) {
        while (!strs[i].startsWith(prefix)) {
            prefix = prefix.substring(0, prefix.length - 1);
            console.log('prefix', prefix);
            if (prefix == '') return '';
        }
    }

    return prefix;
}

console.log(longestCommonPrefix(["flower", "flow", "flight"]));
console.log(longestCommonPrefix2(["dobby", "dob", "dobbbb", "dorrr"]));
console.log(longestCommonPrefix2(["12345", "12", "123"]));
console.log(longestCommonPrefix2(["flower","flow","flight"]));
// console.log(longestCommonPrefix2(["felower","fele","felight"]));

console.log('flow.startsWith(flow)', 'flow'.startsWith('flowe'));