<?php
include "components/navbar.html";
//include "components/stepper.html";
?>

<!--Custom include-->
<script src="assets/js/operations.js"></script>

<script src="assets/handsontable/dist/handsontable.full.min.js"></script>
<link href="assets/handsontable/dist/handsontable.full.min.css" rel="stylesheet" media="screen">
<script type="text/javascript" src="assets/handsontable/dist/languages/all.js"></script>

<link href="assets/navStyle.css" rel="stylesheet" media="screen">

<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/modules/histogram-bellcurve.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/accessibility.js"></script>

<script src="https://code.highcharts.com/highcharts-more.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>




<style>

    .highcharts-figure, .highcharts-data-table table {
        min-width: 310px;
        max-width: 800px;
        margin: 1em auto;
    }

    .highcharts-data-table table {
        font-family: Verdana, sans-serif;
        border-collapse: collapse;
        border: 1px solid #EBEBEB;
        margin: 10px auto;
        text-align: center;
        width: 100%;
        max-width: 500px;
    }
    .highcharts-data-table caption {
        padding: 1em 0;
        font-size: 1.2em;
        color: #555;
    }
    .highcharts-data-table th {
        font-weight: 600;
        padding: 0.5em;
    }
    .highcharts-data-table td, .highcharts-data-table th, .highcharts-data-table caption {
        padding: 0.5em;
    }
    .highcharts-data-table thead tr, .highcharts-data-table tr:nth-child(even) {
        background: #f8f8f8;
    }
    .highcharts-data-table tr:hover {
        background: #f1f7ff;
    }





    #container {
        height: 400px;
    }

    .highcharts-figure, .highcharts-data-table table {
        min-width: 310px;
        max-width: 800px;
        margin: 1em auto;
    }

    .highcharts-data-table table {
        font-family: Verdana, sans-serif;
        border-collapse: collapse;
        border: 1px solid #EBEBEB;
        margin: 10px auto;
        text-align: center;
        width: 100%;
        max-width: 500px;
    }
    .highcharts-data-table caption {
        padding: 1em 0;
        font-size: 1.2em;
        color: #555;
    }
    .highcharts-data-table th {
        font-weight: 600;
        padding: 0.5em;
    }
    .highcharts-data-table td, .highcharts-data-table th, .highcharts-data-table caption {
        padding: 0.5em;
    }
    .highcharts-data-table thead tr, .highcharts-data-table tr:nth-child(even) {
        background: #f8f8f8;
    }
    .highcharts-data-table tr:hover {
        background: #f1f7ff;
    }


</style>



<nav class="sidebar-navigation">
    <ul class="list-unstyled">
		<li  data-toggle="modal" data-target="#submitModal" onclick="tablaDeFrecuencias()">
            <i class="fas fa-table"></i>
            <span class="tooltip">Tabla de frecuencias</span>
        </li>
		<li data-toggle="modal" data-target="#submitModal" onclick="medidasTendenciaCentral();checkColumns();">
        <i class="fas fa-bullseye"></i>
			<span class="tooltip">Medidas de tendencia central</span>
		</li>
		<li data-toggle="modal"  data-target="#submitModal" onclick="medidasDispersion();checkColumns();">
        <i class="fas fa-arrows-alt"></i>
			<span class="tooltip">Medidas de Disperción</span>
		</li>
		<li data-toggle="modal"  data-target="#submitModal" onclick="medidasPosicion();checkColumns();">
        <i class="fas fa-chart-bar" ></i>
			<span class="tooltip">Medidas de posición</span>
		</li>

        <!--TODO:-->
        <li data-toggle="modal"  data-target="#submitModal" onclick="histogram()">
            <i class="fas fa-chart-bar" ></i>
            <span class="tooltip">Histograma</span>
        </li>
	</ul>
</nav>

<div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
    <main role="main" class="inner cover">
        <div id="dataGrid" style="
            position: absolute;
            top: 0;
            left: 0;
            margin: 80px;
            margin-left:100px;
            z-index:9;
        ">
        </div>
       <!-- <input type="text" id="variableName" placeholder="Este es una nueva variable">
        <button onclick="changeVariableName()">cambiar nombre de variable</button>
        <br>
        <button onclick="generateFrequencyTableForNonWorkedData()">
            generar tabla 1
        </button>
        <button onclick="generateFrequencyTableForNonAgrupatedData([0,1,2,3,4,5,6])">
            generar tabla 2
        </button>
        <div id="response">
        </div>-->
    </main>
</div>

<button id="countRows" onclick="checkColumns()">COUNT ROWS</button>


<?php
include "components/footer.html";
include "components/stepperBS.html";
?>



<script>





$('ul li').on('click', function() {
	$('li').removeClass('active');
	$(this).addClass('active');
});
$("#home").removeClass("active");
$("#operations").addClass("active");
Swal.fire({
  title: '<strong>Bienvenido/a! a nuestro sistema estadistico</strong>',
  icon: 'info',
  html:
    'Actualmente esta en una fase beta, <br> ' +
    'pronto añadiremos más y mejores funciones!<br>' +
    'Pd. todas las operaciones se hacen con datos <u>poblacionales</u>',
  showCloseButton: true,

  focusConfirm: false,
  confirmButtonText:
    '<i class="fa fa-thumbs-up"></i> Perfecto!'
})


</script>
