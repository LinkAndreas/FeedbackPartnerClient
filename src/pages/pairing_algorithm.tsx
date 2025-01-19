export default function generateNextRound(
    participants: string[],
    previousRounds: string[][][]
): string[][] {
    const previousPairs = new Set<string>();

    // Collect all previous pairs in both orders
    for (const round of previousRounds) {
        for (const pair of round) {
            const pairKey = `${pair[0]},${pair[1]}`;
            const reversePairKey = `${pair[1]},${pair[0]}`;
            previousPairs.add(pairKey);
            previousPairs.add(reversePairKey);
        }
    }

    let nextRound: string[][] = [];
    let validPairs = false;

    while (!validPairs) {
        shuffleArray(participants);
        nextRound = [];

        for (let i = 0; i < participants.length; i += 2) {
            nextRound.push([participants[i], participants[i + 1]]);
        }

        validPairs = nextRound.every(
            (pair) =>
                !previousPairs.has(`${pair[0]},${pair[1]}`) &&
                !previousPairs.has(`${pair[1]},${pair[0]}`)
        );
    }

    return nextRound;
}

function shuffleArray(array: any[]): void {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}