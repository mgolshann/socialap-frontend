import React from 'react';
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

export default ({ children, onClick, tip, btnClassName, tipClassName }) => (
    <Tooltip title={tip} className={tipClassName} placement="top">
        <Button className={btnClassName} onClick={onClick}>
            {children}
        </Button>
    </Tooltip>
);