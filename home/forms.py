from django.forms import ModelForm
from django import forms
from .models import GroupMessage

class ChatMessageCreateForm(ModelForm):
    class Meta:
        model = GroupMessage
        fields = ['body']
        widgets = {
            'body': forms.TextInput(attrs={
                'placeholder': 'Add a message ...', 
                'class': 'form-control', 
                'maxlength': '500', 
                'autofocus': True, 
            }),
        }
        labels = {
            'body': '',  # This removes the label
        }
