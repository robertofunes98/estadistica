 $(document).ready(function() {
       



    });

    function medidasTendenciaCentral(){
        $('.modal').MultiStep({
            title:'<h3 class="display-6 text-center" style="width:90%!important">Medidas de tendencia central</h3>',
        	data:[{
                content:`
                <div>
                    <p>Usa datos agrupados</p>
                    <div class="inputGroup">
                        <input id="radio2" name="radio" type="radio" checked/>
                        <label for="radio2">No</label>
                    </div>
                    <div class="inputGroup">
                        <input id="radio1" name="radio" type="radio" />
                        <label for="radio1">Si</label>
                    </div>
                </div>`,
                label:'Datos agrupados',
                nextText:"Siguiente",
                prevText:'Atras'
                
        	},{
                content:`
                <div class="inputGroup">
                    <input id="option1" name="option1" type="checkbox"/>
                    <label for="option1">Mediana</label>
                </div>
                
                <div class="inputGroup">
                    <input id="option2" name="option2" type="checkbox"/>
                    <label for="option2">Moda</label>
                </div>
                <div class="inputGroup">
                    <input id="option3" name="option3" type="checkbox"/>
                    <label for="option3">Media</label>
                </div>`,
                label:'Personalizar resultados',
                nextText:"Calcular!",
                prevText:'Atras'
        	}],
            final:'<h3 class="display-6 text-center" style="width:100%!important">Aca se mostraran los datos</h3>',
            modalSize:'lg',
            finalLabel:'Resultados',
            prevText:'Atras',
            finishText:'Cerrar'
        });
    }
    function tablaDeFrecuencias(){
        $('.modal').MultiStep({
            title:'<h3 class="display-6 text-center" style="width:90%!important">Medidas de Dispercion</h3>',
        	data:[{
        		content:'datos agrupados',
                label:'Custom label'
        	},{
        		content:'This is a multi-step modal'
        	},{
                content:`You can have skip options`,
                skip:true
            },{
        		content:`<small>You can include html content as well!</small><br><br>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                  </div>
                `,
        		skip:true
        	},{
        		content:`This is the end<br>Hold your breath and count to ten`,
        	}],
            final:'You can have your own final message',
            modalSize:'lg'
        });
    }
    function medidasDispersion(){
        $('.modal').MultiStep({
            title:'<h3 class="display-6 text-center" style="width:90%!important">Medidas de posicion</h3>',
        	data:[{
        		content:'datos agrupados',
                label:'Custom label'
        	},{
        		content:'This is a multi-step modal'
        	},{
                content:`You can have skip options`,
                skip:true
            },{
        		content:`<small>You can include html content as well!</small><br><br>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                  </div>
                `,
        		skip:true
        	},{
        		content:`This is the end<br>Hold your breath and count to ten`,
        	}],
            final:'You can have your own final message',
            modalSize:'lg'
        });
    }
    function medidasPosicion(){
        $('.modal').MultiStep({
            title:'<h3 class="display-6 text-center" style="width:90%!important">Tabla de frecuencias</h3>',
        	data:[{
        		content:'datos agrupados',
                label:'Custom label'
        	},{
        		content:'This is a multi-step modal'
        	},{
                content:`You can have skip options`,
                skip:true
            },{
        		content:`<small>You can include html content as well!</small><br><br>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                  </div>
                `,
        		skip:true
        	},{
        		content:`This is the end<br>Hold your breath and count to ten`,
        	}],
            final:'You can have your own final message',
            modalSize:'lg'
        });
    }