export function useFormData(dataObject) {
    const formData = new FormData();
    for (const dataObjectKey in dataObject) {
        formData.append(dataObjectKey, dataObject[dataObjectKey])
    }
    return formData;
}

export function usePermissionCheck() {
    return function(permission) {
        let hasAccess = false;
        if (window.$userInfo.roles.find((role) => role.name === 'super-admin')) {
            return true;
        }
        window.$userInfo.roles.forEach(role => {
            hasAccess = role.permissions.some((permissionItem) => permissionItem.name === permission);
        });

        return hasAccess;
    }
}
