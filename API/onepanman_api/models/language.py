from django.db import models

class Language(models.Model):
    """
    Language
    """

    language_choices = (
        ("C", "C"),
        ("C++", "C++"),
        ("PYTHON", "PYTHON"),
        ("JAVA", "JAVA")
    )

    id = models.AutoField(
        'ID',
        db_column='ID',
        primary_key=True,
        null=False,
        blank=False,
    )

    name = models.CharField(
        'language name',
        db_column='NAME',
        null=False,
        blank=False,
        unique=True,
        max_length=30,
        choices=language_choices,
    )

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'LANGUAGE'
        ordering = ['id', 'name']
        verbose_name = '언어'
        verbose_name_plural = '언어'
    
