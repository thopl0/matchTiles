function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function convertToHHMMSS(timeObj)
{
	let [h, m, s] = Object.values(timeObj);
    if (h   < 10) {h = "0"+ h;}
    if (m < 10) {m = "0"+ m;}
    if (s < 10) {s = "0"+ s;}

    return h+':'+m+':'+s;

}

export {getRandomArbitrary, convertToHHMMSS}