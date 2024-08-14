const inputsUtils = {
    diacriticsMap: {
        'ă': 'a', 'â': 'a', 'î': 'i', 'ș': 's', 'ț': 't',
        'Ă': 'A', 'Â': 'A', 'Î': 'I', 'Ș': 'S', 'Ț': 'T'
    },

    removeDiacritics: function (inputString) {
        return inputString.replace(/[ăâîșțĂÂÎȘȚ]/g, match => this.diacriticsMap[match]);
    },

    calculateEmail: function (lastName, firstName, role) {
        const institutionalEmail = "{firstName}.{lastName}@{role}.artschool.ro";
        return institutionalEmail
            .replace("{firstName}", this.removeDiacritics(firstName).toLowerCase())
            .replace("{lastName}", this.removeDiacritics(lastName).toLowerCase())
            .replace("{role}", role);
    },

    rolesTranslate: function (roleName) {
        return (roleName).toLowerCase() === 'teacher' ? 'profesor' :
            (roleName).toLowerCase() === 'secretary' ? 'secretar' :
                (roleName).toLowerCase() === 'admin' ? 'admin' : ''
    }
}

export default inputsUtils;