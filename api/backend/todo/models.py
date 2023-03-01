from django.db import models
 
class Todo(models.Model):
    title=models.CharField(max_length=150)
    description=models.CharField(max_length=500)
    completed=models.BooleanField(default=False)
 
    # string representation of the class
    def __str__(self):
        #it will return the title
        return self.title
    
class Player(models.Model):
    playerId=models.BigIntegerField(primary_key=True)
    playerName=models.CharField(max_length=30)

    # string representation of the class
    def __str__(self):
        #it will return the title
        return self.playerName
    
class PlayerFantasy(models.Model):
    playerId=models.BigIntegerField(primary_key=True)
    playerName=models.CharField(max_length=30)
    playerFPAVG=models.DecimalField(decimal_places=2, max_digits=8)
    playerCost=models.IntegerField(default=0)