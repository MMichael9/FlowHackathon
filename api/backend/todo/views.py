from django.shortcuts import render
 
# import view sets from the REST framework
from rest_framework import viewsets
 
# import the TodoSerializer from the serializer file
from .serializers import TodoSerializer
from .serializers import PlayerSerializer
from .serializers import PlayerFantasySerialzer
 
# import the Todo model from the models file
from .models import Todo
from .models import Player
from .models import PlayerFantasy

from rest_framework.decorators import api_view
from rest_framework.response import Response


#nba_api
import pandas as pd
import json
import nba_api.stats.static.players as players
from nba_api.stats.endpoints import playerfantasyprofile
from nba_api.live.nba.endpoints.scoreboard import ScoreBoard
from nba_api.live.nba.endpoints.boxscore import BoxScore

# create a class for the Todo model viewsets
class TodoView(viewsets.ModelViewSet):
 
    # create a serializer class and
    # assign it to the TodoSerializer class
    serializer_class = TodoSerializer
 
    # define a variable and populate it
    # with the Todo list objects
    queryset = Todo.objects.all()

class PlayerView(viewsets.ModelViewSet):
    serializer_class = PlayerSerializer

    queryset = Player.objects.all()

class PlayerFantasyView(viewsets.ModelViewSet):
    serializer_class = PlayerFantasySerialzer
    queryset = PlayerFantasy.objects.all()


@api_view(['GET'])
def player_detail_api(request, player_id):
    print('get fantasy profile')
    listPlayers = players.get_active_players()
    fantasy = playerfantasyprofile.PlayerFantasyProfile(player_id)

    print(fantasy.get_data_frames()[0])

    return Response(fantasy.get_data_frames()[0])

@api_view(['GET'])
def player_name_api(request, player_name):
    print('get player by name')

    player = players.find_players_by_full_name(player_name)

    print(player)

    return Response(player[0])

@api_view(['GET'])
def player_get_seasonstats(request, player_id):
    print('player get season stats')

    fantasy = playerfantasyprofile.PlayerFantasyProfile(player_id)
    fantasyProfile = fantasy.get_data_frames()[0]
    jsonobj = None

    if fantasyProfile.empty:
        return Response(jsonobj)
    
    else:
        totfantasypoints = (fantasyProfile.FGM[0]*2 + fantasyProfile.FGA[0]*-1 +fantasyProfile.FTM[0]*1 
                              + fantasyProfile.FTA[0]*-1 + fantasyProfile.FG3M[0]*1 + fantasyProfile.REB[0]*1 
                              + fantasyProfile.AST[0]*2 + fantasyProfile.STL[0]*4 + fantasyProfile.BLK[0]*4 
                              + fantasyProfile.TOV[0]*-2 + fantasyProfile.PTS[0]*1)
        jsonobj = {
            "gp": fantasyProfile.GP[0],
            "pts": fantasyProfile.PTS[0],
            "ppg": float(f"{(fantasyProfile.PTS[0] / fantasyProfile.GP[0]):.2f}"),
            "totfgm": fantasyProfile.FGM[0],
            "totfga": fantasyProfile.FGA[0],
            "fg3m": fantasyProfile.FG3M[0],
            "fg3a": fantasyProfile.FG3A[0],
            "ftm": fantasyProfile.FTM[0],
            "fta": fantasyProfile.FTA[0],
            "ast": fantasyProfile.AST[0],
            "reb": fantasyProfile.REB[0],
            "blk": fantasyProfile.BLK[0],
            "stl": fantasyProfile.STL[0],
            "tov": fantasyProfile.TOV[0],
            "fpts": totfantasypoints,
            "fpts_pg": float(f"{(totfantasypoints / fantasyProfile.GP[0]):.2f}")
        }
        return Response(jsonobj)
    

@api_view(['GET'])
def player_get_livestats(request, player_id):
    print('get players live stats')

    todaysScoreboard = json.loads(ScoreBoard().get_json())

    for game in todaysScoreboard["scoreboard"]["games"]:

        print(game['gameId'])
        jsonobj = False

        try:
            boxscore = json.loads(BoxScore(game['gameId']).get_json())
        except:
            print("An exception occurred")
            return Response(False)

        hometeam = boxscore['game']['homeTeam']['players']
        awayteam = boxscore['game']['awayTeam']['players']

        for player in hometeam:
            #print(player['personId'])

            if int(player_id) == player['personId']:
                player = player['statistics']
                jsonobj = {
                    "points": player['points'],
                    "fgm": player['fieldGoalsMade'],
                    "fga": player['fieldGoalsAttempted'],
                    "threesmade": player['threePointersMade'],
                    "ftm": player['freeThrowsMade'],
                    "fta": player['freeThrowsAttempted'],
                    "ast": player['assists'],
                    "reb": player['reboundsTotal'],
                    "blk": player['blocks'],
                    "stl": player['steals'],
                    "tov": player['turnovers'],
                    "fp": (player['fieldGoalsMade']*2 + player['fieldGoalsAttempted']*-1 
                           + player['freeThrowsMade']*1 + player['freeThrowsAttempted']*-1 
                           + player['threePointersMade']*1 + player['reboundsTotal']*1 
                           + player['assists']*2 + player['steals']*4 + player['blocks']*4 
                           + player['turnovers']*-2 + player['points']*1)
                }

                return Response(jsonobj)

        for player in awayteam:
            #print(player['personId'])

            if int(player_id) == player['personId']:
                player = player['statistics']
                jsonobj = {
                    "points": player['points'],
                    "fgm": player['fieldGoalsMade'],
                    "fga": player['fieldGoalsAttempted'],
                    "threesmade": player['threePointersMade'],
                    "ftm": player['freeThrowsMade'],
                    "fta": player['freeThrowsAttempted'],
                    "ast": player['assists'],
                    "reb": player['reboundsTotal'],
                    "blk": player['blocks'],
                    "stl": player['steals'],
                    "tov": player['turnovers'],
                    "fp": (player['fieldGoalsMade']*2 + player['fieldGoalsAttempted']*-1 
                           + player['freeThrowsMade']*1 + player['freeThrowsAttempted']*-1 
                           + player['threePointersMade']*1 + player['reboundsTotal']*1 
                           + player['assists']*2 + player['steals']*4 + player['blocks']*4 
                           + player['turnovers']*-2 + player['points']*1)
                }
                return Response(jsonobj)

    return Response(jsonobj)    