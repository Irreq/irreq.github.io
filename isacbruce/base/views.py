from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.


def home(request):
    return render(request, 'home.html')

def posts(request):
    return render(request, 'posts.html')

def post(request):
    return render(request, 'post.html')

def profile(request):
    return render(request, 'profile.html')

def projects(request):
    return render(request, 'projects.html')

def contact(request):
    return render(request, 'contact.html')

def about(request):
    return render(request, 'about.html')

def portfolio(request):
    return render(request, 'portfolio.html')

def services(request):
    return render(request, 'services.html')

def index(request):
    print(request)
    return render(request, 'index.html')

def lynn(request):
    return render(request, 'lynn.html')
