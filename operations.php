<?php
include "components/navbar.html";
include "components/stepper.html";
?>

<!--Custom include-->
<script src="assets/js/operations.js"></script>

<script src="assets/handsontable/dist/handsontable.full.min.js"></script>
<link href="assets/handsontable/dist/handsontable.full.min.css" rel="stylesheet" media="screen">
<link href="assets/navStyle.css" rel="stylesheet" media="screen">

<nav class="sidebar-navigation">
    <ul class="list-unstyled">
  
		<li class="active">
           
            <i class="fas fa-table"></i>
            <span class="tooltip" @click="toggleModal()">Tabla de frecuencias</span>
     
        </li>

		<li>
        <i class="fas fa-bezier-curve"></i>
			<span class="tooltip">Medidas de tendencia central</span>
		</li>
		<li>
        <i class="fab fa-digital-ocean"></i>
			<span class="tooltip">Medidas de Dispercion</span>
		</li>
		<li>
        <i class="fas fa-chart-bar"></i>
			<span class="tooltip">Medidas de posicion</span>
		</li>
	</ul>
</nav>



<div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
    <main role="main" class="inner cover">
        <div id="dataGrid">
        </div>
        <input type="text" id="variableName" placeholder="Este es una nueva variable">
        <button onclick="changeVariableName()">cambiar nombre de variable</button>

        <br>
        <button onclick="generarTabla1()">
            generar tabla 1
        </button>

        <div id="response">


        </div>
    </main>
</div>



<?php
include "components/footer.html";
?>
<script>
$('ul li').on('click', function() {
	$('li').removeClass('active');
	$(this).addClass('active');
});</script>