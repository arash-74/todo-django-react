from django.shortcuts import render
from rest_framework import status
from rest_framework.generics import CreateAPIView, ListAPIView, DestroyAPIView
from rest_framework.response import Response

from todo.models import Todo
from todo.serializers import TodoSerializer


# Create your views here.
class TodoListApi(ListAPIView):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()

class TodoCreateApi(CreateAPIView):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()

class TodoDeleteApi(DestroyAPIView):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()
    def delete(self, request, *args, **kwargs):
        self.perform_destroy(instance=Todo.objects.get(pk=self.kwargs['pk']))
        return Response({'todos':self.get_serializer(Todo.objects.all(),many=True).data},status=status.HTTP_200_OK)