import React from 'react';
import * as $ from 'jquery';
import './Datatable.css';

/* Table */
$.DataTable = require('datatables.net-bs4');

/* Export Table */
const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;
window.JSZip = require('jszip');
require('datatables.net-buttons')();
require('datatables.net-buttons/js/buttons.flash.js')();  // Flash file export
require('datatables.net-buttons/js/buttons.colVis.js')(); // Column visibility
require('datatables.net-buttons/js/buttons.html5.js')();  // HTML 5 file export
require('datatables.net-buttons/js/buttons.print.js')();  // Print view button

class Datatable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datatable: {}
    }
  }

  componentDidMount() {
    const table = $(this.el).DataTable({
      data: [],
      columns: this.props.columns || [],
      dom: `<"row"
                <"col-sm-5"f><"col-sm-2"l><"col-sm-5"B>
            >
            <"table-responsive"rt>
            <"row"
                <"col-md-5 col-sm-12"i><"col-md-7 col-sm-12"p>
            >
            <"clear">`,
      buttons: this.props.buttons || [],
      lengthMenu: [
        [10, 25, 50, 100, -1],
        [10, 25, 50, 100, "Todos"]
      ],
      pagingType: "full_numbers",
      language: {
        buttons: {
          excel: "",
          csv:  "",
          pdf: "",
          print: "",
          copy: "",
          copySuccess: {
              1: "Copiou 1 linha para a área de transferência",
              _: "Copiou %d linhas para a área de transferência"
          },
          copyTitle: 'Tabela copiada'
        },
        info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
        infoEmpty: "Mostrando 0 a 0 de 0 registros",
        paginate: {
          previous: "<",
          next: ">",
          first: "<<",
          last: ">>"
        },
        lengthMenu: "_MENU_",
        loadingRecords: "Carregando dados...",
        search: "",
        searchPlaceholder: "Pesquise no registros...",
        infoFiltered: " (filtrado de _MAX_ registros)",
        zeroRecords: "Nenhum registro até este momento"
      }
    })
    
    this.setState({datatable: table});
    
    $.fn.DataTable.ext.pager.numbers_length = 5;

    const entries = document.getElementsByClassName('dataTables_length');
    if (entries.length) {
      entries[0].firstElementChild.title = "Quantidade de registros por página";
    }
    
    const copy = document.getElementsByClassName('dt-button buttons-copy');
    const excel = document.getElementsByClassName('dt-button buttons-excel');
    const csv = document.getElementsByClassName('dt-button buttons-csv');
    const pdf = document.getElementsByClassName('dt-button buttons-pdf');
    const print = document.getElementsByClassName('dt-button buttons-print');
    if (copy.length) {
      copy[0].title = "Copiar tabela para área de transferência";
    }
    if (excel.length) {
      excel[0].title = "Exportar para Excel";
    }
    if (csv.length) {
      csv[0].title = "Exportar para CSV";
    }
    if (pdf.length) {
      pdf[0].title = "Exportar para PDF";
    }
    if (print.length) {
      print[0].title = "Print Tabela";
    }
  }

  componentWillUnmount() {
    this.state.datatable.destroy();
  }

  componentDidUpdate() {
    const { datatable } = this.state;
    datatable.clear();
    datatable.rows.add(this.props.data);
    datatable.draw();
  }

  render() {
    return (
        <div>
            <table id={Date.now().toString()} className = "table table-striped table-bordered" ref={el => this.el = el}></table>
        </div>
    );
  }
}

export default Datatable;