import { useState, useCallback } from "react"

const useHttp = () => {

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false)

    const request = useCallback( async(url, method = 'GET', body = null, headers = {'Content-Type' : 'application/json'}) => {

        setLoading(true);

        try{
            const res = await fetch(url);

            if(!res.ok){
                throw new Error(`Error: ${url}, status: ${res.status}`);
            }

            const data = res.json();

            setLoading(false);
            return data;
        } catch{
            setLoading(false);
            setError(true);
        }

    }, [])

    const onErrorFalse = useCallback(() => setError(false), []);

    return {onErrorFalse, request, error, loading}
}

export default useHttp;