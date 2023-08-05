const enviarUrl = document.querySelector('#enviarUrl');
enviarUrl.addEventListener('click', function() {
    const url = document.querySelector('#inputUrl').value
    enviaURL(url);
})

enviarUrl.addEventListener('mousedown', function() {
    enviarUrl.style.backgroundColor = '#f89f33';
})

enviarUrl.addEventListener('mouseup', function() {
    enviarUrl.style.backgroundColor = '#f89f33bf';
})

enviarUrl.addEventListener('mouseover', function() {
    enviarUrl.style.backgroundColor = '#f89f33bf';
})

enviarUrl.addEventListener('mouseout', function() {
    enviarUrl.style.backgroundColor = '#f89f3380';
})

const textarea = document.querySelector('textarea');

    textarea.addEventListener('keydown', function(event) {
      if (event.code === 'Enter') {
        event.preventDefault();
        const url = document.querySelector('#inputUrl').value
        enviaURL(url);
      }
    });

//As funções de receber e processar a url e retornar ao usuário foram explicitamente divididas com o propósito de demonstrar o armazenamento e recuperação de dados do BD.

async function enviaURL(dados) {
    const pacote = {
        'url': dados
    };
    try {
        const response = await fetch('/envia_para_analise/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify(pacote),
        });
        const data = await response.json();
        let id_bd = data.id_bd;
        if (!response.ok) {
            throw new Error('Erro na requisição: ' + data.error + ' código de erro: ' + response.status);
        }
        else{
            ReceberResultados(id_bd)
        };
    } catch (error) {
        console.error(error);
    };
};

async function ReceberResultados(id_bd) {
    try {
        const response = await fetch('/receber_resultados/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify({'id_bd': id_bd}),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error('Erro na requisição: ' + data.error + ' código de erro: ' + response.status);
        }
        else{
        desenhaTabela(data.total_tags)
        }
    } catch (error) {
        console.error(error);
    }
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function desenhaTabela(dadosTabela) {
    if (document.querySelector('.removerAntes')){
        const elementos = document.querySelectorAll('.removerAntes');
        const remover = Array.from(elementos)
        remover.forEach(elemento => {
            elemento.remove();
        });
    }
    for(let i = 0; i < dadosTabela.length; i++){
        let linha_tabela = '<tr class="removerAntes"><td>' + dadosTabela[i][0] + '</td><td>' + dadosTabela[i][1] + '</td></tr>';
        document.querySelector('#tabelaCorpo').insertAdjacentHTML('beforeend', linha_tabela);
    }
}