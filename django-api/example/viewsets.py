from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny
from example.models import Person
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from rest_framework.decorators import action

from example.serializer import ExampleSerializer


class ExampleViewSet(viewsets.ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = ExampleSerializer
    permission_classes = [AllowAny]
    '''
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    ''' 
    def destroy(self, request, *args, **kwargs):
        empid = kwargs.get('pk')  # This assumes you pass empid as pk
        try:
            person = self.get_queryset().get(empid=empid)  # Look up by empid
            person.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Person.DoesNotExist:
            return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)
    def create(self, request, *args, **kwargs):
        print("Received data in POST:", request.data)  # Log received data

        # Validate the data using serializer
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)  # Raises an error if validation fails
        except ValidationError as e:
            print("Validation error:", e.detail)  # Log validation error details
            return Response({"error": e.detail}, status=status.HTTP_400_BAD_REQUEST)

        # Proceed if valid
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    @action(detail=False, methods=['delete'])
    def delete_all(self, request):
        Person.objects.all().delete()
        return Response({"message": "All records deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    
       