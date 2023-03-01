# import serializers from the REST framework
from rest_framework import serializers

# import the todo data model
from .models import Todo
from .models import Player
from .models import PlayerFantasy

# create a serializer class
class TodoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Todo
        fields = ('id', 'title', 'description', 'completed')


class PlayerSerializer(serializers.ModelSerializer):
     
    class Meta:
            model = Player
            fields = ('playerId', 'playerName')

class PlayerFantasySerialzer(serializers.ModelSerializer):
     
     class Meta:
          model = PlayerFantasy
          fields = ('playerId', 'playerName', 'playerFP', 'playerFPLast5', 'playerFPLast10')