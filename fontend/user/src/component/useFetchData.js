import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';


const useFetchData = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(url);
            setData(response.data);
        } catch (err) {
            console.error(`Lỗi khi lấy dữ liệu từ ${url}:`, err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [url]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
};

export default useFetchData;