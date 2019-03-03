import React, { ReactNode } from "react";

interface Props {
    isSubmitting: boolean;
    children: ReactNode;

    onSubmit?: () => any;

    [index: string]: any;
}

const SubmitButton = ({ isSubmitting, children, onSubmit, ...props }: Props) => (
    <button
        disabled={isSubmitting}
        className="btn btn--primary"
        type="submit"
        onClick={e => {
            if (onSubmit) {
                e.preventDefault();
                onSubmit();
            }
        }}
        {...props}
    >
        {isSubmitting ? "Loading..." : children}
    </button>
);

export default SubmitButton;
