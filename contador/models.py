from django.db import models

class contagem_tags(models.Model):
    endereco_url = models.TextField()
    total_tags = models.JSONField()