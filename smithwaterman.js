function smithWaterman(seq1, seq2, matchScore = 2, mismatchPenalty = -1, gapPenalty = -2) {
    // Initialize the scoring matrix with zeros
    const m = seq1.length;
    const n = seq2.length;
    const scoreMatrix = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    let maxScore = 0;
    let maxI = 0;
    let maxJ = 0;

    // Fill the score matrix
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            let score = 0;

            if (seq1[i - 1] === seq2[j - 1]) {
                score = matchScore;
            } else {
                score = mismatchPenalty;
            }

            // Calculate the possible scores for this cell
            const diagonal = scoreMatrix[i - 1][j - 1] + score;
            const up = scoreMatrix[i - 1][j] + gapPenalty;
            const left = scoreMatrix[i][j - 1] + gapPenalty;
            const zero = 0;

            // Take the maximum of 0, diagonal, up, or left
            scoreMatrix[i][j] = Math.max(zero, diagonal, up, left);

            // Track the maximum score and its position
            if (scoreMatrix[i][j] > maxScore) {
                maxScore = scoreMatrix[i][j];
                maxI = i;
                maxJ = j;
            }
        }
    }

    // Now, traceback to get the aligned sequences
    let alignedSeq1 = '';
    let alignedSeq2 = '';
    let i = maxI;
    let j = maxJ;

    while (scoreMatrix[i][j] > 0) {
        const currentScore = scoreMatrix[i][j];
        const diagonalScore = scoreMatrix[i - 1][j - 1];
        const upScore = scoreMatrix[i - 1][j];
        const leftScore = scoreMatrix[i][j - 1];

        // Traceback in the direction of the highest score
        if (currentScore === diagonalScore + (seq1[i - 1] === seq2[j - 1] ? matchScore : mismatchPenalty)) {
            alignedSeq1 = seq1[i - 1] + alignedSeq1;
            alignedSeq2 = seq2[j - 1] + alignedSeq2;
            i--;
            j--;
        } else if (currentScore === upScore + gapPenalty) {
            alignedSeq1 = seq1[i - 1] + alignedSeq1;
            alignedSeq2 = '-' + alignedSeq2;
            i--;
        } else if (currentScore === leftScore + gapPenalty) {
            alignedSeq1 = '-' + alignedSeq1;
            alignedSeq2 = seq2[j - 1] + alignedSeq2;
            j--;
        }
    }

    // Return the results: aligned sequences and score
    return {
        score: maxScore,
        alignedSeq1: alignedSeq1,
        alignedSeq2: alignedSeq2
    };
}

function findClosest(string, list) {
    let myList = [];
    let highestScoreIndex = 0;
    for (var i=0; i<list.length; i++) {
        if (string == myList[i]) {
            return myList[i];
        }
        myList[i] = smithWaterman(string, list[i]).score;
    }
    for (var i=0; i<myList.length; i++) {
        if (myList[i] > myList[highestScoreIndex]) {
            highestScoreIndex = i;
        }
    }
    return list[highestScoreIndex];
}

// Export the function as a module
export {smithWaterman, findClosest};
