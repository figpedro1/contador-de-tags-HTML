from .models import contagem_tags
from django.shortcuts import render
from django.http import JsonResponse
from bs4 import BeautifulSoup
import requests
import json

def puxa_url(url):
    resposta = requests.get(url)
    return resposta

def analisa_html(resposta):
    if resposta.status_code == 200:
        html = BeautifulSoup(resposta.text, "html.parser")
        tags_html = html.find_all()
        contagem_tags = {}
        
        for tag in tags_html:
            nome_tag = tag.name
            
            if nome_tag in contagem_tags:
                contagem_tags[nome_tag] += 1
            else:
                contagem_tags[nome_tag] = 1
        return list(contagem_tags.items())
    else:
        print("Não foi possível obter código de resposta.")

def index(request):
    return render(request, 'index.html')

def receber_url(request):
    if request.method == 'POST':
        try:
            dados = json.loads(request.body)
            url = dados.get('url')
        except:
            return JsonResponse({'error': 'Erro ao receber a solicitação.'}, status=400)
        
        try:
            html = puxa_url(url)
        except:
            return JsonResponse({'error': 'Erro ao acessar a url fornecida. Verifique se está conectado à internet e se a url está de acordo com o formato indicado.'}, status=400)

        try:
            tags_contadas = analisa_html(html)
        except:
            return JsonResponse({'error': 'Erro ao analisar o arquivo HTML'}, status=500)
        
        try:
            tags_contadas_bd = contagem_tags(endereco_url=url, total_tags=tags_contadas)
            tags_contadas_bd.save()
        except:
            return JsonResponse({'error': 'Erro ao salvar no banco de dados.'}, status=500)
        id_bd = tags_contadas_bd.id

        return JsonResponse({'message': 'Url recebida e enviada ao banco de dados.', 'id_bd': id_bd})

    else:
        return JsonResponse({'error': 'Método não permitido.'}, status=405)

def enviar_resultados(request):
    if request.method == 'POST':
        try:
            dados = json.loads(request.body)
            id_bd = dados.get('id_bd')
            contagem = contagem_tags.objects.get(id=id_bd)

            return JsonResponse({'message': 'Dados recuperados do banco de dados e enviados com sucesso!','endereco_url': contagem.endereco_url, 'total_tags': contagem.total_tags})
        except:
            return JsonResponse({'error': 'Erro ao recuperar informações do banco de dados.'}, status=500) 
    
    else:
        return JsonResponse({'error': 'Método não permitido.'}, status=405)