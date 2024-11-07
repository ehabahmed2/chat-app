from django.http import HttpResponseBadRequest
from django.shortcuts import render, get_object_or_404
from .forms import ChatMessageCreateForm
from .models import ChatGroup, GroupMessage




def home(request):
    chat_group = get_object_or_404(ChatGroup)
    chat_messages = GroupMessage.objects.filter(group=chat_group).order_by('created')
    if request.htmx:
        form = ChatMessageCreateForm(request.POST)
        if form.is_valid():
            message = form.save(commit=False)
            message.author = request.user
            message.group = chat_group
            message.save()
            
            context = {
                'message': message,
                'user': request.user,
            }
            return render(request, 'chat/chat_message.html', context)
        else:
            print(form.errors)  # Debug form errors
            return HttpResponseBadRequest(form.errors)
    # Regular page load
    form = ChatMessageCreateForm()
    return render(request, 'home.html', {'form': form,'chat_messages': chat_messages,'chat_group': chat_group,})