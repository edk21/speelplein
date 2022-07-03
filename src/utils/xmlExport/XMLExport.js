import React from "react";

import exportFromJSON from "export-from-json";
import PropTypes from "prop-types";

export default function XMLExport(props) {
    function onClick() {
        const data = props.data;
        const fileName = props.fileName ? props.fileName : "exported";
        let fields = props.fields ? props.fields : []; //empty list means "use all"
        const exportType = "xml";
        exportFromJSON({ data, fileName, fields, exportType });
    }

    return <button className="btn btn-primary" onClick={onClick}>Generate XML File</button>;
}

XMLExport.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    tooltip: PropTypes.string,
    fileName: PropTypes.string,
    fields: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.object),
        PropTypes.object
    ])
};
