import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';


const useFetchData = (url) => {
    const [data, setData] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get(url);
            setData(response.data);
        } catch (err) {
            console.error(`Lỗi khi lấy dữ liệu từ ${url}:`, err);
        }
    }, [url]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, refetch: fetchData };
};

export default useFetchData;