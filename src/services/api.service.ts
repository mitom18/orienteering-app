import { Sites, Solution, User } from ".";
import { LocalStorageKeys } from "../utils";

interface ApiData {
    id?: number;
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
        body: JSON.stringify(data),
    });
    const savedData = (await response.json()) as ApiData;
    localStorage.setItem(
        LocalStorageKeys.API_ID,
        (savedData.id as number).toString()
    );
};

const getMyPosition = async () => {
    const response = await fetch("/api/answers");
    const data: ApiData[] = await response.json();
    const id = localStorage.getItem(LocalStorageKeys.API_ID);
    if (id === null) {
        throw new Error("No API id found in local storage");
    }
    const intId = parseInt(id);
    const reducer = (res: number, cur: number | undefined) => {
        return cur !== undefined ? res + 1 : res;
    };
    data.sort((a, b) => {
        const aSites = a.solution.sites as Sites;
        const bSites = b.solution.sites as Sites;
        const aFilled = Object.values(aSites).reduce(reducer, 0);
        const bFilled = Object.values(bSites).reduce(reducer, 0);
        if (aFilled !== bFilled) {
            return aFilled - bFilled;
        }
        const aLength = a.solution.length as number;
        const bLength = b.solution.length as number;
        return aLength - bLength;
    });

    return data.findIndex((i) => i.id === intId) + 1;
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