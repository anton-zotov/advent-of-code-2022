import { DayResults } from '../day-result';
import * as input from './input.json';

const elves = (input as any).default;

const sum = (arr: number[]) => arr.reduce((acc, cur) => acc + cur, 0);

function mostCaloriesCarried(elves: number[][], top: number): number {
    let mostCalories = [...'0'.repeat(top)].map(c => +c);
    for (const elf of elves) {
        const currentCalories = sum(elf);
        if (currentCalories > mostCalories[0]) {
            mostCalories[0] = currentCalories;
            if (top > 1) mostCalories.sort((a, b) => a - b);
        }
    }
    return sum(mostCalories);
}

export function runDay1(): DayResults {
    return {
        results: [
            ['most calories carried by 1 elf', mostCaloriesCarried(elves, 1)],
            ['most calories carried by 3 elves', mostCaloriesCarried(elves, 3)],
        ],
    };
}
