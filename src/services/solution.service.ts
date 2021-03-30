import { LocalStorageKeys } from "../utils";

export interface Solution {
    [key: string]: string | Date | number | undefined;
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
