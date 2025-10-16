from rest_framework import serializers
from todo.models import Todo


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = '__all__'

    def validate_title(self,value):
        if Todo.objects.filter(title=value).exists():
            raise serializers.ValidationError("This title already exists")
        return value