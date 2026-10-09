(function () {
  var chatIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="#1a2259" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-5A8 8 0 1 1 21 12z"/></svg>';
  var closeIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  var sendIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>';

  var root = document.createElement('div');
  root.className = 'ez-chat';
  root.innerHTML =
    '<div class="ez-chat-panel" role="dialog" aria-label="Chat de suporte">' +
      '<div class="ez-chat-header">' +
        '<div>' +
          '<p class="ez-chat-title">Suporte Ecozoh</p>' +
          '<div class="ez-chat-status">Respondemos em poucos minutos</div>' +
        '</div>' +
        '<button type="button" class="ez-chat-close" aria-label="Fechar chat">' + closeIcon + '</button>' +
      '</div>' +
      '<div class="ez-chat-body">' +
        '<div class="ez-chat-message is-agent">Olá! 👋 Dúvidas sobre energia solar, eólica ou sobre seu pedido? Estamos aqui para ajudar.</div>' +
      '</div>' +
      '<form class="ez-chat-form">' +
        '<input class="ez-chat-input" type="text" placeholder="Digite sua mensagem..." aria-label="Mensagem">' +
        '<button type="submit" class="ez-chat-send" aria-label="Enviar">' + sendIcon + '</button>' +
      '</form>' +
    '</div>' +
    '<button type="button" class="ez-chat-button" aria-label="Abrir chat de suporte">' +
      '<span class="ez-chat-button-label">Precisa de ajuda? Fale conosco</span>' +
      '<span class="ez-chat-button-icon">' + chatIcon + '</span>' +
    '</button>';

  function mount() {
    document.body.appendChild(root);

    var body = root.querySelector('.ez-chat-body');
    var input = root.querySelector('.ez-chat-input');
    var replied = false;

    function addMessage(text, who) {
      var el = document.createElement('div');
      el.className = 'ez-chat-message is-' + who;
      el.textContent = text;
      body.appendChild(el);
      body.scrollTop = body.scrollHeight;
    }

    function toggle(open) {
      root.classList.toggle('is-open', open);
      if (open) input.focus();
    }

    root.querySelector('.ez-chat-button').addEventListener('click', function () {
      toggle(!root.classList.contains('is-open'));
    });
    root.querySelector('.ez-chat-close').addEventListener('click', function () {
      toggle(false);
    });
    root.querySelector('.ez-chat-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var text = input.value.trim();
      if (!text) return;
      addMessage(text, 'user');
      input.value = '';
      if (!replied) {
        replied = true;
        setTimeout(function () {
          addMessage('Obrigado pelo contato! Nossa equipe vai responder em breve.', 'agent');
        }, 800);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
