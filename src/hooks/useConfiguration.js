import {useState, useEffect} from 'react';
import configJson from '../conf/application.json';

function useConfiguration() {
    const [config, setConfig] = useState({});

    useEffect(() => {
        const environment = process.env.NODE_ENV || 'development';
        setConfig({
            validations: configJson.validations || {},
            ...configJson[environment]
        })
    }, []);

    return config;
}

export default useConfiguration;
