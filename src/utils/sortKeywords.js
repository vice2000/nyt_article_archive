import orderBy from 'lodash/orderBy';

export default function sortKeywords(array) {
    const countedKeywords = {};
    const arrayToSort = [];
    const keywords = [];
    let ordered = [];

    array.forEach( i => {
        if(!countedKeywords[i]) {
            countedKeywords[i] = 1 ;
        } else if (countedKeywords[i]) {
            countedKeywords[i] += 1;
        }
    });

    for (let kw in countedKeywords) {
        const count = countedKeywords[kw];
        arrayToSort.push({ keyword: { kw, count }, count });
    }

    ordered = orderBy(arrayToSort, ['count', 'keyword'], ['desc', 'asc']);

    for (let i in ordered) {
        keywords.push(ordered[i].keyword);
    }

    return keywords;
}