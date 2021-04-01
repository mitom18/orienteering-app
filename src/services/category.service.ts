export interface Category {
    name: string;
    minAge?: number;
    maxAge?: number;
    sitesCount: number;
    mapPath: string;
}

const categories: Category[] = [
    {
        name: "pod 10 let",
        minAge: undefined,
        maxAge: 10,
        sitesCount: 8,
        mapPath: "/maps/u10.png",
    },
    {
        name: "11 až 15 let",
        minAge: 11,
        maxAge: 15,
        sitesCount: 12,
        mapPath: "/maps/u15.png",
    },
    {
        name: "nad 15 let",
        minAge: 16,
        maxAge: undefined,
        sitesCount: 16,
        mapPath: "/maps/a16.png",
    },
];

const getCategory = (age: number) => {
    return categories.find(
        (c) =>
            (c.minAge === undefined &&
                c.maxAge !== undefined &&
                c.maxAge >= age) ||
            (c.minAge !== undefined &&
                c.maxAge === undefined &&
                c.minAge <= age) ||
            (c.minAge !== undefined &&
                c.maxAge !== undefined &&
                c.maxAge >= age &&
                c.minAge <= age)
    ) as Category;
};

const getSiteNames = (category: Category) => {
    const codes = Array.from(Array(category.sitesCount)).map((e, i) => i + 65);
    const names = codes.map((x) => String.fromCharCode(x));
    return names;
};

export const categoryService = {
    getCategory,
    getSiteNames,
};
