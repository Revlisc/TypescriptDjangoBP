from rest_framework import routers
from example.viewsets import ExampleViewSet

router = routers.SimpleRouter()

router.register(r'example', ExampleViewSet, basename='example')

urlpatterns = router.urls