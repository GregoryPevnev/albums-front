import React, { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

const Loading = ({ children }: Props) => (
    <div className="loading">
        <div className="loading__spinner" />
        <p className="centerer">{children}</p>
    </div>
);

export default Loading;
