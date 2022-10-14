export const toBase64 = (files: FileList): string[] => {
    const reader = new FileReader();
    const values = [];

    for (let i = 0; i < files.length; i++) {
        reader.readAsDataURL(files[i]);
        values.push(reader.result);
    }

    return (values as string[])
};

export const toFormData = (files: FileList, inputId?: string) => {
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
        const file = files[i]
        formData.append(inputId || "image", file, file.name)
    }

    return formData
};