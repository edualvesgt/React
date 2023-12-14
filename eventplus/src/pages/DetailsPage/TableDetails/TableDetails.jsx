import React from 'react';
import "./TableDetails.css"

const TableDetails = () => {
    return (
        <table>
            <thead className='table-data__head-row'>

                <th className="table-data__head-title table-data__head-title--big">User</th>
                <th className="table-data__head-title table-data__head-title--big">Comentario</th>
                

            </thead>
        </table>
    );
};

export default TableDetails;