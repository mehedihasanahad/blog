export function useFormData(dataObject) {
    const formData = new FormData();
    for (const dataObjectKey in dataObject) {
        formData.append(dataObjectKey, dataObject[dataObjectKey])
    }
    return formData;
}
