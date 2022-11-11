
//Criando variáveis
	var chao;
		var fundo;
	var jogador;
		var movendo = false;
	var pulando = false;
		var chaoinv;
	var chao2;
		var paredeinv1;
	var paredeinv2;
		var dinheiro;
	var g_dinheiro;

//Criando variáveis imagens
	var fundoimg;
		var chaoimg;
	var jogadorani;
		var jogadoraniCD;
	var jogadoraniCE;
		var jogadoraniPE;
	var jogadoraniJE;
		var jogadoraniJD;
	var dinheiroimg;


//Carregando imagens
	function preload(){

		fundoimg = loadImage("./assets/Fundo.png");
			chaoimg = loadImage("./assets/Chão.png");
		dinheiroimg = loadImage("./assets/Itens/Dinheiro.png");


		jogadorani = loadAnimation("./assets/Personagem/DireitaP1.png","./assets/Personagem/DireitaP2.png");
			jogadoraniCD = loadAnimation("./assets/Personagem/DireitaC1.png","./assets/Personagem/DireitaC2.png");
		jogadoraniCE = loadAnimation("./assets/Personagem/EsquerdaC1.png","./assets/Personagem/EsquerdaC2.png");
			jogadoraniPE = loadAnimation("./assets/Personagem/EsquerdaP1.png","./assets/Personagem/EsquerdaP2.png");
		jogadoraniJE = loadAnimation("./assets/Personagem/EsquerdaC1.png","./assets/Personagem/EsquerdaC2.png");
			jogadoraniJD = loadAnimation("./assets/Personagem/DireitaC1.png","./assets/Personagem/DireitaC2.png");
		
	}

//Configurando
	function setup(){
		createCanvas(600,232);

			//Criando Sprites

				//Fundo
				fundo = createSprite(860, 116);
					fundo.addImage(fundoimg);

				//Chão
				chao = createSprite(800, 230);
					chao.addImage(chaoimg);
				chao.scale = 0.08;
					//Inv
					chaoinv = createSprite(860, 215, 1720 ,50);
						chaoinv.visible = false;
					
				//Chão2
				chao2 = createSprite(920, 230);
					chao2.addImage(chaoimg);
				chao2.scale = 0.08;

				//ParedeINV1
				paredeinv1 = createSprite(-1, 215, 10, 464);
					paredeinv1.visible = false;

				//ParedeINV2
				paredeinv2 = createSprite(1720, 215, 10, 464);
				
				//Personagem
				jogador = createSprite(50,175,20,100);
					jogador.addAnimation("paradoD", jogadorani);
						jogador.addAnimation("paradoE", jogadoraniPE);
					jogador.addAnimation("correndoD", jogadoraniCD);
						jogador.addAnimation("correndoE", jogadoraniCE);
					jogador.addAnimation("pulandoD", jogadoraniJD);
						jogador.addAnimation("pulandoE", jogadoraniJE);
					jogador.changeAnimation("paradoD");
				jogador.scale = 0.45

				//Dinheiro
				

					//Grupo
					g_dinheiro = new Group();

		adicionar_objetos(g_dinheiro, 4, dinheiroimg, 0.05);
			obj_cima(g_dinheiro, 3, dinheiroimg, 0.05);
	}

//Desenhando
	function draw(){
		background("violet");
			
		if(jogador.x >= 300 && jogador.x <= 1405){
			camera.x = jogador.x;
		}

		//Movendo o jogador
		if (keyDown(RIGHT_ARROW)) {
			jogador.x = jogador.x + 5
			jogador.changeAnimation("correndoD");
			movendo = true
		  }
		  else if (keyDown(LEFT_ARROW)) {
			jogador.x = jogador.x - 5
			jogador.changeAnimation("correndoE");
			movendo = true
		  }
		  else if (keyDown("space") && jogador.y >= 160) {
			jogador.velocityY = jogador.velocityY - 2.5;
			jogador.changeAnimation("pulandoD");
			movendo = true;
			pulando = true;
		  }
		  else if (pulando == true) {
			pulando = false;
			jogador.changeAnimation("pulandoD");
			movendo = false
		  }
		  else if (movendo == true) {
			movendo = false
			jogador.changeAnimation("paradoD")
		  }
		  jogador.velocityY = jogador.velocityY + 0.5;

		  //Colidindo com o chão, a parede e o dinheiro
		  jogador.collide(chaoinv);
		  	jogador.collide(paredeinv1);
		  jogador.collide(paredeinv2);
		  	

//===========================================================================
	


		drawSprites();
		text(mouseX + "," + mouseY, mouseX, mouseY); 



		
	}


//==============+++++ Funções Personalizadas ================================
	


function adicionar_objetos(grupo, numero, imagem, escala){

	for(var qua = 1; qua<numero; qua+=1){

		var x = random(0, 1720/2);
			var y = 180

		//Objeto
		var objeto = createSprite(x,y);
			objeto.addImage(imagem)
				objeto.scale = escala;
					grupo.add(objeto);
					if(jogador.collide(objeto)){

					objeto.destroy();
					}
		
		//1
		var objeto1 = createSprite(objeto.x + 25,y);
			objeto1.addImage(imagem)
				objeto1.scale = escala;
					grupo.add(objeto1);
					

		//2
		var objeto2 = createSprite(objeto.x + 50,y);
			objeto2.addImage(imagem)
				objeto2.scale = escala;
					grupo.add(objeto2);
	
	}
}

function obj_cima(grupo, numero, imagem, escala){

	for(var qua = 1; qua<numero; qua+=1){

		var x = random(1720/2 + 1, 1720);
			var y = 86.42

		//Objeto
		var objeto = createSprite(x,y);
			objeto.addImage(imagem)
				objeto.scale = escala;
					grupo.add(objeto);
		
		//1
		var objeto1 = createSprite(objeto.x + 25,y);
			objeto1.addImage(imagem)
				objeto1.scale = escala;
					grupo.add(objeto1);

		//2
		var objeto2 = createSprite(objeto.x + 50,y);
			objeto2.addImage(imagem)
				objeto2.scale = escala;
					grupo.add(objeto2);
	
	}
}