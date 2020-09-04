var totalCartas = 16;
var imgAleatorio = 0;
var imgsUsados = [];
var imgsUsados2 = [];
var cartas = {};
var cartasIds = [];
var cartasAcertadas = [];
var listaCartasSelecionadas = [];
var vezJogador = 1;
var pontuacao1 = 0;
var pontuacao2 = 0;

function iniciaJogo() {
	document.getElementById('CampoNivelDificuldade').className = 'd-none';

	var nivelDificuldade = document.getElementById('nivelDificuldade').value
	
	if (nivelDificuldade === '2') {
		document.getElementById('tabelaJogo').className = 'tabela2';
		totalCartas = 24;
	} 

	if (nivelDificuldade === '3') {
		document.getElementById('tabelaJogo').className = 'tabela3';
		totalCartas = 36;
	}

	document.getElementById('jogador' + vezJogador).className += ' vez';

	var contadorCartas = (totalCartas / 2);

	for (var x=1; x<=contadorCartas; x++) {
		var imgElement;

		imgElement = document.createElement('img');
		imgElement.src = 'imagens/' + x + '.jpg';			
		imgElement.className = 'fundoImg';		
		imgElement.name = x;

		cartas[x] = imgElement;
	}

	var criaCarta = function(carta, z) {
		return "<div class='fundoImg' id=" + z + " name=" + carta 
			+ " onclick='selecionaCarta(this)'><img src='imagens/"+ carta +".jpg'></div>";
	}

	for (var x=0; x<contadorCartas; x++) {
		document.getElementById('tabelaJogo').innerHTML += '<div id="campo' + x + '" class="colunas"></div>';
		
		imgAleatorio = Math.ceil((Math.random() * contadorCartas));
		
		while (imgsUsados.indexOf(imgAleatorio) != -1) {			
			imgAleatorio = Math.ceil((Math.random() * contadorCartas));		
		} 			
			
		imgsUsados.push(imgAleatorio);
		document.getElementById('campo' + x).innerHTML = (criaCarta(imgAleatorio, x));						
	}

	for (var y=contadorCartas; y<totalCartas; y++) {
		document.getElementById('tabelaJogo').innerHTML += '<div id="campo' + y + '" class="colunas"></div>';
		
		imgAleatorio = Math.ceil((Math.random() * contadorCartas));
		
		while (imgsUsados2.indexOf(imgAleatorio) != -1) {			
			imgAleatorio = Math.ceil((Math.random() * contadorCartas));		
		}
			
		imgsUsados2.push(imgAleatorio);
		document.getElementById('campo' + y).innerHTML = (criaCarta(imgAleatorio, y));
	}		
}

function selecionaCarta(element) {
	function somFlip() {
		var audioFlip = new Audio();

		audioFlip.src = "audios/flip.mp3";
		audioFlip.play();
	}

	if (element.className === 'selecao' || listaCartasSelecionadas.length === 2) {
		return;
	}

	var cartaSelecionada = {
		name: element.getAttribute('name'),
		id: element.id
	}

	listaCartasSelecionadas.push(cartaSelecionada);

    virarCarta(element); 

    somFlip(); 

    document.getElementById('jogador' + vezJogador).className += ' vez';  

    if (listaCartasSelecionadas.length === 2) {
	    if (listaCartasSelecionadas[0].name === listaCartasSelecionadas[1].name) {	    	
	    	//acertou;
	    	if (vezJogador === 1){
	    		pontuacao1++;
				document.getElementById('PontosJogador' + vezJogador).innerHTML = pontuacao1;
			} else {
				pontuacao2++;
				document.getElementById('PontosJogador' + vezJogador).innerHTML = pontuacao2;
			}
	    	listaCartasSelecionadas = [];	    	
	    } else {
	    	//errou
	    	setTimeout(errouCarta, 2000);
	    }

    	console.log('jogador ' + vezJogador);
    }
    
    if (document.getElementsByClassName('fundoImg').length === 0) {
    	setTimeout(fimDeJogo, 2000);    	
    }
}

function fimDeJogo() {	
	if (pontuacao1 > pontuacao2) {
		alert('Fim de Jogo. O jogador 1 venceu!');	
	} 

	if (pontuacao1 < pontuacao2) {
		alert('Fim de Jogo. O jogador 2 venceu!');
	
	} else if (pontuacao1 === pontuacao2) {
		alert('Fim de jogo. Empate!');
	}	
}

function virarCarta(x) {
	x.className = 'selecao';	
}

function errouCarta() {
	document.getElementById('jogador' + vezJogador).className = 'jogadores';
	
	if (vezJogador === 1) {
		vezJogador = 2;
		//document.getElementById('jogador' + vezJogador).className += ' vez';
	} else {
		vezJogador = 1;		
	}
	
	document.getElementById('jogador' + vezJogador).className += ' vez';

	document.getElementById(listaCartasSelecionadas[0].id).className = 'fundoImg';
	document.getElementById(listaCartasSelecionadas[1].id).className = 'fundoImg';
	listaCartasSelecionadas = [];	
}