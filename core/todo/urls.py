from django.urls import path

from todo import views

app_name = 'todo'
urlpatterns = [
    path('list/', views.TodoListApi.as_view(), name='list'),
    path('create/', views.TodoCreateApi.as_view(), name='create'),
    path('delete/<int:pk>', views.TodoDeleteApi.as_view(), name='delete'),
]