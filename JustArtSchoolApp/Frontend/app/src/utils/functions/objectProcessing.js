const objectUtils = {
    cluster: Array.prototype.cluster = function (keyGetter) {
        const obj = {};
        const arr = this;

        this.forEach(function (element, index) {
            const key = keyGetter(element);
            const existing = obj[key];
            if (!existing) {
                obj[key] = [arr[index]];
            } else {
                obj[key].push(arr[index]);
            }
        });
        return obj;
    }
}

export default  objectUtils;