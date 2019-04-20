const MAX_SIZE = 135190376; // Around 40-minutes

export const getFile = (type: string): Promise<File | null> =>
    new Promise(res => {
        const fileInput = document.createElement("input");
        fileInput.style.display = "none";
        fileInput.type = "file";
        fileInput.accept = type + "/*";
        document.body.appendChild(fileInput);

        const listener = () => {
            if (fileInput.files && fileInput.files.length > 0) {
                const file = fileInput.files[0];
                if (file.size <= MAX_SIZE) res(file);
                else alert("The file is too big");
            }
            res(null);
            document.body.removeChild(fileInput);
        };

        fileInput.addEventListener("change", listener);
        fileInput.click();
    });
