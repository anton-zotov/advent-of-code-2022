import { DayResults } from '../day-result';
import { sum } from '../utils/math';
import * as input from './input.json';

type Round = [string, string];
const strategyGuide: Round[] = (input as any).default;

const xCharCode = 'X'.charCodeAt(0);
const aToXDiff = 23;
const shapeToEmoji = (shape: string) => {
    const emojis = {
        A: '🪨',
        B: '📄',
        C: '✂️',
        X: '🪨',
        Y: '📄',
        Z: '✂️',
    };
    return emojis[shape];
};

function getRoundScore([opponentShape, myShape]: Round): number {
    let score = myShape.charCodeAt(0) - xCharCode + 1;
    const opponentEmoji = shapeToEmoji(opponentShape);
    const myEmoji = shapeToEmoji(myShape);

    if (opponentEmoji === myEmoji) score += 3;
    else if (
        (opponentEmoji === '🪨' && myEmoji === '📄') ||
        (opponentEmoji === '📄' && myEmoji === '✂️') ||
        (opponentEmoji === '✂️' && myEmoji === '🪨')
    )
        score += 6;

    return score;
}

function translateResultToShapes([opponentShape, result]: Round): Round {
    const winningShape = {
        A: 'Y',
        B: 'Z',
        C: 'X',
    };
    const losingShape = {
        A: 'Z',
        B: 'X',
        C: 'Y',
    };
    let myShape: string;

    if (result === 'X') myShape = losingShape[opponentShape];
    else if (result === 'Y') myShape = String.fromCharCode(opponentShape.charCodeAt(0) + aToXDiff);
    else myShape = winningShape[opponentShape];

    return [opponentShape, myShape];
}

function totalScore(): number {
    return sum(strategyGuide.map(getRoundScore));
}

function totalScoreByResults(): number {
    return sum(strategyGuide.map(translateResultToShapes).map(getRoundScore));
}

export function runDay2(): DayResults {
    return {
        results: [
            ['total score', totalScore()],
            ['total score using round result', totalScoreByResults()],
        ],
    };
}
