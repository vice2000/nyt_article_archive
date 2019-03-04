export default function dedupeArray(array) {
    let unique = [];
    array.forEach( i => {
        if(unique.indexOf(i) === -1) {
            unique.push(i);
        }
    });
    return unique;
}