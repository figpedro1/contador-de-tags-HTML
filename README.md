# Contador de Tags HTML

Bem-vindo à aplicação Contador de Tags HTML! Esta é uma aplicação web desenvolvida com Django como backend e HTML, CSS e JavaScript para o frontend. O objetivo desta aplicação é permitir que os usuários insiram URLs no formato "https://example.com/" e, ao clicar no botão "Enviar" ou pressionar "Enter", sejam contadas todas as tags HTML presentes na página do URL inserido. As contagens são então apresentadas em uma tabela, mostrando as tags utilizadas e quantas vezes cada tag foi encontrada. Isso é feito utilizando a biblioteca Requests para recuperar o HTML a partir do URL e a biblioteca BeautifulSoup para analisar o arquivo recebido.

## Funcionalidades

- Insira um URL válido no campo de texto.
- Clique no botão "Enviar" ou pressione "Enter" para contar as tags HTML na página.
- Uma tabela será gerada exibindo as tags utilizadas e suas contagens.

## Tecnologias Utilizadas

### Backend

- **Django**: Framework de desenvolvimento web em Python que lida com as solicitações do cliente, processa a lógica e fornece as respostas apropriadas.
- **SQLite3**: Banco de dados embutido utilizado para armazenar dados da aplicação.


### Frontend

- **HTML**: Linguagem de marcação utilizada para estruturar o conteúdo da página.
- **CSS**: Linguagem de estilo utilizada para estilizar os elementos HTML e melhorar a aparência da aplicação.
- **JavaScript**: Linguagem de programação utilizada para adicionar interatividade à página, especialmente para lidar com eventos de clique e envio.

### Bibliotecas Python

- **Requests**: Biblioteca utilizada para fazer solicitações HTTP para obter o conteúdo da página web a partir do URL inserido.
- **BeautifulSoup**: Biblioteca utilizada para analisar o HTML obtido e extrair informações específicas, como as tags HTML.

## Como Executar a Aplicação

1. Certifique-se de ter o Python instalado (versão 3.8 ou superior).
2. Clone este repositório para o seu ambiente local.
3. Navegue até o diretório raiz da aplicação.

### Instalando Dependências

`pip install -r requirements.txt`

### Executando o Servidor Django

`python manage.py runserver`

Acesse a aplicação em seu navegador através de `http://127.0.0.1:8000/`.

## Autor

Desenvolvido por Pedro Figueiredo

---

Caso houver alguma dúvida ou problema, entre em contato através do e-mail: pedrofernando2003@gmail.com.
