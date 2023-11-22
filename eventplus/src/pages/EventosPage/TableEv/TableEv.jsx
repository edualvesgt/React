import React from 'react';
import editPen from '../../../assets/images/edit-pen.svg'
import trashDelete from '../../../assets/images/trash-delete.svg'

const TableEv = ({ dados }) => {
    return (
        <table className='table-data'>
            <thead className='table-data__head-row'>

                <th className="table-data__head-title table-data__head-title--little">Evento</th>
                <th className="table-data__head-title table-data__head-title--little">Descricao</th>
                <th className="table-data__head-title table-data__head-title--little">Tipo Evento</th>
                <th className="table-data__head-title table-data__head-title--little">Data </th>
                <th className="table-data__head-title table-data__head-title--little">Editar </th>
                <th className="table-data__head-title table-data__head-title--little">Delete </th>

            </thead>

            <tbody>

                {dados.map((ev) => {

                    return (
                        <tr className="table-data__head-row" key={ev.idEvento}>
                            <td className="table-data__data table-data__data--little">
                                {ev.nomeEvento}
                            </td>
                            <td className="table-data__data table-data__data--little">
                                {ev.descricao}
                            </td>
                            <td className="table-data__data table-data__data--little">
                                {ev.tiposEvento.titulo}
                            </td>
                            <td className="table-data__data table-data__data--little">
                                {new Date(ev.dataEvento).toLocaleDateString()}
                            </td>

                            <td className="table-data__data table-data__data--little">
                                <img className="table-data__icon" src={editPen} alt="" />
                            </td>

                            <td className="table-data__data table-data__data--little">
                                <img className="table-data__icon" src={trashDelete} alt="" />
                            </td>
                        </tr>
                    );

                })}

            </tbody>

        </table>
    );
};

export default TableEv;