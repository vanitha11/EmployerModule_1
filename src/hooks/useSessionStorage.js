function useSessionStorage() {

    function setItem(key, value) {
        if (typeof value === 'object') {
            value = JSON.stringify(value);
        }
        sessionStorage.setItem(key, value);
    }

    function getItem(key) {
        return JSON.parse(sessionStorage.getItem(key));
    }

    return {
        setItem: setItem,
        getItem: getItem
    };
}

export default useSessionStorage;
