import { useEffect, useState } from "react";

export default function DateTime() {
    const [time, setTime] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleString());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return <span> {time} </span>;
}