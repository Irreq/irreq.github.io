from django.urls import path
from . import views, models

urlpatterns = [
    path('', views.home, name="home"),
    path('posts/', views.posts, name="posts"),
    path('post/', views.post, name="post"),
    path('profile/', views.profile, name="profile"),
    path('projects/', views.projects, name="projects"),
    path('contact/', views.contact, name="contact"),
    path('about/', views.about, name="about"),
    path('services/', views.services, name="services"),
    path('portfolio/', views.portfolio, name="portfolio"),
    path('index/', views.index, name="index"),
    path('lynn/', views.lynn, name="lynn"),

]


"""Dynamic was cool until it relaods each time a page is requested"""
# # functions = dir(views)
# functions = [i for i in dir(views) if "__" not in i]
# print(functions)
#
# import os
# PATH = "/home/irreq/Desktop/portfolio/portfolio/isacbruce/base/templates/"
#
# # about =
# urlpatterns = []
# arr = [os.path.splitext(i)[0] for i in os.listdir(PATH) if ".html" in os.path.splitext(i)]
# for i in arr:
#     if i in functions:
#         urlpatterns.append(path(i+"/", getattr(views, i), name=i))
# # print(arr)
# # # # print(arr)
# # urlpatterns = [path(i+"/", getattr(views, i), name=i) for i in arr if i in functions].append(path('', views.home, name="home"))
