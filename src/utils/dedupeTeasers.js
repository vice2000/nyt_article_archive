/**
 * 
 * @param {array} teasers array of objects
 * @returns {array}
 */

export default function dedupeTeasers(teasers) {
    const unique = {};
    teasers.forEach(teaser => {
        if(!unique[teaser._id]) {
            unique[teaser._id] = teaser ;
        }
    });
    return Object.values(unique);
}