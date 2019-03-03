import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

interface Props extends RouteComponentProps {}

const BackButton = ({ history }: Props) => (
    <button className="btn btn--toggle" onClick={() => history.goBack()} style={{ marginTop: 10 }}>
        <i className="fas fa-arrow-left" style={{ marginRight: 10 }} />
        Go Back
    </button>
);

export default withRouter(BackButton);
