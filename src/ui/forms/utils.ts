export const getFile = (type: string): Promise<File | null> =>
    new Promise(res => {
        const fileInput = document.createElement("input");
        fileInput.style.display = "none";
        fileInput.type = "file";
        fileInput.accept = type + "/*";
        document.body.appendChild(fileInput);

        const listener = () => {
            if (fileInput.files && fileInput.files.length > 0) res(fileInput.files[0]);
            else res(null);
            document.body.removeChild(fileInput);
        };

        // IMPORTANT: onchange - NOT eventlistener => Single even fires at a time
        fileInput.addEventListener("change", listener);
        fileInput.click();
    });
