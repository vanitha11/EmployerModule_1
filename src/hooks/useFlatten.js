function useFlatten() {
    const flattenObj = (ob) => {
        let result = [];
        for (const i in ob) {
            if ((typeof ob[i]) === 'object' && !Array.isArray(ob[i])) {
                const temp = flattenObj(ob[i]);
                for (const j in temp) {
                    result.push({name: [i + '.' + j], data: temp[j]});
                }
            } else {
                result.push({name: [i], data: ob[i]});
            }
        }
        return result;
    };
    return flattenObj;
}

export default useFlatten;
