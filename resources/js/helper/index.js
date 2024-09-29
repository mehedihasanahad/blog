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
        window.$userInfo.roles.forEach(role => {
            hasAccess = role.permissions.some((permissionItem) => permissionItem.name === permission);
        });

        return hasAccess;
    }
}
