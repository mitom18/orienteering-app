import { LocalStorageKeys } from "../utils";

export interface Sites {
    [key: string]: number | undefined;
}

export interface Solution {
    start: Date;
    end?: Date;
    length?: number;
    sites?: Sites;
}

const saveSolution = (solution: Solution) => {
    localStorage.setItem(LocalStorageKeys.SOLUTION, JSON.stringify(solution));
};

const getSolution = (): Solution | null => {
    const solution = localStorage.getItem(LocalStorageKeys.SOLUTION);
    if (solution === null) {
        return null;
    }
    return JSON.parse(solution);
};

const clearSolution = () => {
    localStorage.removeItem(LocalStorageKeys.SOLUTION);
};

export const solutionService = {
    saveSolution,
    getSolution,
    clearSolution,
};
