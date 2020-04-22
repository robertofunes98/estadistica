<?php
include "components/navbar.html";
?>

<!--Custom include-->
<script src="assets/js/operations.js"></script>

<script src="assets/handsontable/dist/handsontable.full.min.js"></script>
<link href="assets/handsontable/dist/handsontable.full.min.css" rel="stylesheet" media="screen">

<div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">

    <div include-html="content.html"></div>
    <main role="main" class="inner cover">

        <div id="dataGrid">


        </div>

        <input type="text" id="variableName" placeholder="Este es una nueva variable">
        <button onclick="changeVariableName()">cambiar nombre de variable</button>

    </main>
</div>




<?php
include "components/footer.html";
?>