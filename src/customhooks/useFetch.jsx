import { useEffect, useState } from "react";

export default function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                setError(null)

                const response = await fetch(url)

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`)
                }

                const result = await response.json()
                setData(result)
            } catch (error) {
                console.log('error while fetching data ', error)
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        if(url) {
            fetchData();
        }

        return () => {
            setLoading(false);
        }
    }, [])
    return {data,loading,error};
}