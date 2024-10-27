from rest_framework import serializers
from example.models import Person

class ExampleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ['name', 'empid', 'created', 'updated']
        read_only_fields = ['created', 'updated']