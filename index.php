
<?php
include "components/navbar.html";
?>

    <div class="">
      <h1 class="display-3">Sistema Estadistico</h1>
      <hr class="bg-light">
      <h5 class="display-5">Integrantes del equipo</h5>
    </div>
    <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">

      <div include-html="content.html"></div>
      <main role="main" class="inner cover">

        <p class="lead">
          <ul class="list-unstyled">
            <li class="lead">
              Ronald Trejo
            </li>
            <li class="lead">
              Roberto Funes
            </li>
            <li class="lead">
              Mauricio Orellana
            </li>
          </ul>
        </p>
      </main>
    </div>

<?php
include "components/footer.html";
?>