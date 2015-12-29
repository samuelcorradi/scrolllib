scroll = (function(escope) {

	/**
	 * Definição do objeto para aplicar
	 * uma função aos elementos de uma
	 * página sempre que eles aparecerem
	 * na área visível.
	 */
	escope.Action = function(elementList, cnt)
	{

		/**
		 * Define em qual container os
		 * elementos a sofrerem a
		 * ação deverão estar.
		 */
		cnt = cnt || window;

		/**
		 * Se uma lista já não foi
		 * passada define a variável
		 * com um array.
		 */
		elementList = elementList || [];

		/**
		 * Variável que armazena as
		 * funcoes a serem disparadas
		 * em tipo de posicao do elemento.
		 */
		var _registry = {};

		/**
		 * Define funções para tipo
		 * de posição que o elemento
		 * aparece durante o scroll.
		 */
		this.reg = function(method, func)
		{

			_registry[method] = func;

			return this;

		}

		/**
		 * Lista de verificações que
		 * retornam verdadeiro sempre
		 * que o elemento passado como
		 * parametro estiver em determinada
		 * posição em relação a área visível
		 * quando o scroll for realizado.
		 * @private
		 */
		var _mode = {

			/**
			 * Informa se o elemento está
			 * dentro do container.
			 */
			inside: function(el)
			{
				console.log(_mode['top'](el), _mode['bottom'](el));
				return _mode['top'](el) && _mode['bottom'](el);

			},

			/**
			 * Informa se o elemento está
			 * fora do container. É o inverso
			 * de "inside".
			 */
			outside: function(el)
			{

				return ! _mode['inside'](el);

			},

			/**
			 * Informa se o elemento está
			 * no topo do container.
			 */
			top: function(el)
			{
				console.clear();
				var cntScrollPos = (cnt==window) ? window.scrollY : cnt.scrollTop;
				var cntTopPos = (cnt==window) ? 0 : cnt.offsetTop;
				return (el.offsetTop - cntScrollPos - cntTopPos)>0;

			},

			/**
			 * Informa se o elemento está
			 * fora do topo do container.
			 */
			untop: function(el)
			{

				return ! _mode['top'](el);

			},

			/**
			 * Informa se o elemento está
			 * em baixo do container.
			 */
			bottom: function(el)
			{

				var cntTopPos = (cnt==window) ? 0 : cnt.offsetTop;
				var cntHeight = (cnt==window) ? window.innerHeight : cnt.offsetHeight;
				var cntScrollPos = (cnt==window) ? window.scrollY : cnt.scrollTop;
				return - ((el.offsetTop + el.offsetHeight) - (cntTopPos + cntHeight) - cntScrollPos) > 0;
				
			},

			/**
			 * Informa se o elemento está
			 * fora da parte de baixo
			 * do container.
			 */
			unbottom: function(el)
			{

				return ! _mode['bottom'](el);
			
			},

			/**
			 * Informa se o elemento está
			 * no centro do container.
			 */
			center: function(el)
			{

				
			},

			/**
			 * Informa se o elemento está do
			 * lado esquerdo da área visível.
			 * Bom para ser usado em casos
			 * que o scroll for horizontal.
			 */
			left: function(el)
			{

				
			},

			/**
			 * Informa se o elemento está do
			 * lado direito da área visível.
			 * Bom para ser usado em casos
			 * que o scroll for horizontal.
			 */
			right: function(el)
			{

				
			}

		};

		/**
		 * Dipara as ações em um
		 * determinado elemento.
		 * @private
		 */
		var _run = function(el, mode)
		{

			if( ! _mode[mode] ) throw "Invalid mode.";

			/*
			 * Se o elemento estiver
			 * no posicionamento,
			 * executa a função registrada
			 * passando o elemento como
			 * parametro.
			 */
			if( _mode[mode](el) ) 
			{
				_registry[mode](el);
			}

		}

		/**
		 * Aplica os estilos aos elementos
		 * para que as animações deles
		 * inicie.
		 * @private
		 */
		this.run = function()
		{

			var modeList = Object.keys(_registry);

			for(var x=0; x<modeList.length; x++) // Percorrer a lista de acoes registradas por modo.
			{
				for(var y=0; y<elementList.length; y++)
				{
					_run(elementList[y], modeList[x]);
				}
			}			

		}

		cnt.addEventListener("scroll", this.run);

	}

	return escope;

})(window.scroll || {});