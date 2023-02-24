from django.contrib import admin
 
# import the model Todo
from .models import Todo
from .models import Player
from .models import PlayerFantasy
 
# create a class for the admin-model integration
class TodoAdmin(admin.ModelAdmin):
 
    # add the fields of the model here
    list_display = ("title","description","completed")

class PlayerAdmin(admin.ModelAdmin):
    list_display = ("playerId", "playerName")

class PlayerFantasyAdmin(admin.ModelAdmin):
    list_display = ("playerId", "playerName", "playerFPAVG", "playerCost")
 
# we will need to register the
# model class and the Admin model class
# using the register() method
# of admin.site class
admin.site.register(Todo,TodoAdmin)

admin.site.register(Player, PlayerAdmin)

admin.site.register(PlayerFantasy, PlayerFantasyAdmin)