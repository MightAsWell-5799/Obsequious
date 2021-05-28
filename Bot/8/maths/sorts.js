/**
 *
 * @param {Array<Array<>>} pairsIn
 * @returns {Array<Array<>>}
 */
function sortPairs(pairsIn) {
    var iPairSort = 0
    var loopSort = 0
    for (loopSort = 0; loopSort < pairsIn.length-1; loopSort++) {
        for (iPairSort = 0; iPairSort < pairsIn.length -1; iPairSort++) {
            var altSort = iPairSort + 1
            //console.log({ iPairSort, first, second, pairsIn })
            var temp1
            var temp2
            if (pairsIn[altSort][0] < pairsIn[iPairSort][0]) {
                temp1 = pairsIn[iPairSort]
                temp2 = pairsIn[altSort]
                pairsIn[iPairSort] = temp2
                pairsIn[altSort] = temp1
                //console.log('swapped')
            }
        }
    }
    return pairsIn
}

module.exports = { sortPairs }
