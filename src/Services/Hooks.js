import {useEffect, useState} from "react";

export function useLocalStorage()
{
    const [storage, setStorage] = useState(JSON.parse(localStorage["scheduler"] ?? "{}"));
    const updateStorage = (obj) => {
        localStorage["scheduler"] = JSON.stringify(obj);
        console.log("updating storage");
        setStorage(JSON.parse(localStorage["scheduler"] ?? "{}"));
    }

    useEffect(() => {
        let onStorageChange = (ev) => setStorage(JSON.parse(localStorage["scheduler"] ?? "{}"));
        window.addEventListener("storage", onStorageChange);
        return () => window.removeEventListener("storage", onStorageChange);
    }, []);

    return [storage, updateStorage];
}

export function useLocalTime()
{
    let currentOffset = new Date().getTimezoneOffset();
    return (timeStr) => {
        const time = new Date(timeStr);
        time?.setHours(time.getHours() + time.getTimezoneOffset() / 60 - currentOffset / 60);
        return time;
    }
}

export function useAlerts()
{

}