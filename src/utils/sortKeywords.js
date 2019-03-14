import orderBy from 'lodash/orderBy';

export default function sortKeywords(array) {
    let unique = {};
    let arrayToSort = [];
    let ordered = [];
    let keywords = [];

    array.forEach( i => {
        if(!unique[i]) {
            unique[i] = 1 ;
        } else if (unique[i]) {
            unique[i] += 1;
        }
    });

    for (let key in unique) {
        const value = unique[key];
        arrayToSort.push({ keyword: key, count: value });
    }

    ordered = orderBy(arrayToSort, ['count', 'keyword'], ['desc', 'asc']);

    for (let i in ordered) {
        keywords.push(ordered[i].keyword);
    }

    return keywords;
}