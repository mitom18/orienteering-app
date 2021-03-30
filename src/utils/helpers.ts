export const formatTime = (milliseconds: number) => {
    const dateObj = new Date(milliseconds);
    const hours = dateObj.getUTCHours();
    const minutes = ("0" + dateObj.getUTCMinutes()).slice(-2);
    const seconds = ("0" + dateObj.getUTCSeconds()).slice(-2);
    return `${hours}:${minutes}:${seconds}`;
};
