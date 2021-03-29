import { LocalStorageKeys } from "../utils";

export interface User {
    name: string;
    age: number;
    email: string;
}

const saveUser = (user: User) => {
    localStorage.setItem(LocalStorageKeys.USER, JSON.stringify(user));
};

const getUser = (): User | null => {
    const user = localStorage.getItem(LocalStorageKeys.USER);
    if (user === null) {
        return null;
    }
    return JSON.parse(user);
};

const clearUser = () => {
    localStorage.removeItem(LocalStorageKeys.USER);
};

export const userService = {
    saveUser,
    getUser,
    clearUser,
};
