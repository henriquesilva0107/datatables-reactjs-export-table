import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'
import Datatable from './components/Datatable/';
import sourceData from './sourceData';

function App() {
  const [data, setData] = useState(sourceData);

  const updateTable = () => {
    const array = data.slice(0, data.length - 2);
    setData(array)
  }

  const columns = [
    { title: "Nome" },
    { title: "Escritório" },
    { title: "Posição" },
    { title: "Ext." },
    { title: "Data de Início" },
    { title: "Salário" }
  ]

  const buttons = [
    { extend: 'copy', className: 'btn btn-dark fa fa-copy', title: 'Relatorio Copiado' },
    { extend: 'excel', className: 'btn btn-dark fa fa-file-excel', title: 'Relatorio Excel' },
    { extend: 'csv', className: 'btn btn-dark fa fa-file-csv', title: 'Relatorio CSV' },
    { extend: 'pdf', className: 'btn btn-dark fa fa-file-pdf', title: 'Relatorio PDF' },
    { extend: 'print', className: 'btn btn-dark fa fa-file', title: 'Relatorio Print' }
  ]

  return (
    <div className='container'>
      <h1>Exemplo Tabela</h1>
      <p><button onClick={updateTable}>Remover 2 Items Tabela</button></p>
      <Datatable data={data} columns={columns} buttons={buttons}/>
    </div>
  );
}

export default App;
