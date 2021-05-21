/**
 * 
 * @param {Array<Array<>>} pairsIn 
 * @returns {Array<Array<>>}
 */
function sortPairs(pairsIn) {
    var pairsOut
    var iPairSort = 0
    var loopSort = 0
    for (loopSort = 0; loopSort < pairsIn.length; loopSort++) {
        for (iPairSort = 0; iPairSort < pairsIn.length; iPairSort++) {
            var altSort = iPairSort + 1
            var first = pairsIn[iPairSort][0]
            try {
                var second = pairsIn[altSort][1]
            } catch (e) {
                break
            }
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
    pairsOut = pairsIn
    return pairsOut
}

module.exports = {sortPairs}