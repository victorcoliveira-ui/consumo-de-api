import { useState, useEffect } from 'react'
import axios from 'axios'

export default function useFetchApi(baseUrl, endpoint = '') {
    const [ret, setRet] = useState(null);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(false);

    useEffect(() => { 
        const getData = async () => { 
            try {
                const fullUrl = endpoint ? `${baseUrl}${endpoint}` : baseUrl;
                const response = await axios.get(fullUrl);
                setRet(response.data);
                setLoading(false); 
            } catch (err) {
                setLoading(false);
                setError(true);
                console.error("Error:", err);
            } 
        }; 
        
        getData(); 
    }, [baseUrl, endpoint]);

    return { loading, error, ret };
}