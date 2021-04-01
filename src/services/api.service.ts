import { categoryService, Sites, Solution, User } from ".";
import { LocalStorageKeys } from "../utils";

interface ApiData {
    _id?: string;
    user: User;
    solution: Solution;
    notes: string;
}

const save = async (user: User, solution: Solution, notes: string) => {
    const data: ApiData = {
        user,
        solution,
        notes,
    };
    const response = await fetch("/api/answers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const savedData = (await response.json()) as ApiData;
    localStorage.setItem(LocalStorageKeys.API_ID, savedData._id as string);
};

const getMyPosition = async (user: User) => {
    const response = await fetch("/api/answers");
    let data: ApiData[] = await response.json();
    const id = localStorage.getItem(LocalStorageKeys.API_ID);
    if (id === null) {
        throw new Error("No API id found in local storage");
    }
    data = data.filter(
        (i) =>
            categoryService.getCategory(i.user.age) ===
            categoryService.getCategory(user.age)
    );
    const reducer = (res: number, cur: number | undefined) => {
        return cur !== undefined ? res + 1 : res;
    };
    data.sort((a, b) => {
        const aSites = a.solution.sites as Sites;
        const bSites = b.solution.sites as Sites;
        const aFilled = Object.values(aSites).reduce(reducer, 0);
        const bFilled = Object.values(bSites).reduce(reducer, 0);
        if (aFilled !== bFilled) {
            // descending order, more filled, better position
            return bFilled - aFilled;
        }
        const aLength = a.solution.length as number;
        const bLength = b.solution.length as number;
        // ascending order, less time, better position
        return aLength - bLength;
    });

    return data.findIndex((i) => i._id === id) + 1;
};

const getApiId = (): number | null => {
    const apiId = localStorage.getItem(LocalStorageKeys.API_ID);
    if (apiId === null) {
        return null;
    }
    return parseInt(apiId);
};

const clearApiId = () => {
    localStorage.removeItem(LocalStorageKeys.API_ID);
};

export const apiService = {
    save,
    getMyPosition,
    getApiId,
    clearApiId,
};
