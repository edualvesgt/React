import React from "react";
import "./TableDetails.css"

const TableDetails = ({dadosComent}) => {
    console.log(dadosComent);
    return (
        <table className='table-data'>

            {/* cabecalho */}
            <thead className="table-data__head">
                <tr className="table-data__head-row">
                    <th className="table-data__head-title table-data__head-title--big">User</th>
                    <th className="table-data__head-title table-data__head-title--little">Comentario</th>
                </tr>
            </thead>
            {/* Corpo */}
            <tbody>
            {dadosComent.map((comentario, index) => (
          <tr key={index}>
            <td className="table-data__data table-data__data--little">
              <p>{comentario.usuario}</p>
            </td>
            <td className="table-data__data table-data__data--little">
              <p>{comentario.descricao}</p>
            </td>
          </tr>
        ))}
            </tbody>
        </table>
    );


}


export default TableDetails;