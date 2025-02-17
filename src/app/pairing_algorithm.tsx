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
    let retryCount = 0;
    const maxRetries = 100000;  // Set a max number of retries

    while (!validPairs && retryCount < maxRetries) {
        shuffleArray(participants);
        nextRound = [];

        // Create pairs from shuffled participants
        for (let i = 0; i < participants.length; i += 2) {
            nextRound.push([participants[i], participants[i + 1]]);
        }

        validPairs = nextRound.every(
            (pair) =>
                !previousPairs.has(`${pair[0]},${pair[1]}`) &&
                !previousPairs.has(`${pair[1]},${pair[0]}`)
        );

        retryCount++;
    }

    if (retryCount >= maxRetries) {
        throw new Error("Unable to generate valid pairs after multiple attempts.");
    }

    return nextRound;
}

function shuffleArray(array: string[]): void {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}