import express, { Request, Response } from "express";
import { 
    redisUpdatePlayerLoadout,
    redisAddBotToCustomGame,
    BOT_ADDED_NOTIFICATION
} from "../config/redis";
import env from "../env/env";
import { PerkPagesModel } from "../database/PerkPages";
import { Types } from "mongoose";
import { changeLobbyMode, createLobby, LOBBY_MODES } from "../services/lobbyService";
import { MVSTime } from "../utils/date";
import { PlayerTesterModel } from "../database/PlayerTester";
import ObjectID from "bson-objectid";

interface Lock_Lobby_Loadout_REQ {
  AutoPartyPreference: boolean;
  CrossplayPreference: number;
  GameplayPreferences: number;
  HissCrc: number;
  Loadout: Loadout;
  LobbyId: string;
  LobbyTemplate: string;
  Platform: string;
  Version: string;
}

interface Loadout {
  Character: string;
  Skin: string;
}

export interface Lock_Lobby_Loadout_RES {
  body: Lock_Lobby_Loadout_RES_BODY;
  metadata: any;
  return_code: number;
}

export interface Team_Style_Custom_Game_REQ {
  MatchID: string,
  TeamStyle: string
}

export interface Lock_Lobby_Loadout_RES_BODY {
  AccountId: string;
  Loadout: Loadout;
  bAreAllLoadoutsLocked: boolean;
}

export interface Add_Custom_bot_REQ {
  "BotAccountID": string,
  "BotSettingSlug": string,
  "CharacterAssetPath": string,
  "CharacterSlug": string,
  "MatchID": string,
  "SkinAssetPath": string,
  "SkinSlug": string,
  "TeamIndex": number
}

export interface Switch_Teams_REQ {
  "MatchID": string,
  "TeamIndex": number
}

export interface Kick_From_Lobby_REQ {
  "AutoPartyPreference": boolean
  "CrossplayPreference": number,
  "GameplayPreferences": number,
  "HissCrc": number,
  "KickeeAccountID": string,
  "LobbyId": string,
  "LobbyTemplate": string,
  "MatchID": string,
  "Platform": string,
  "Version": string
}

export async function switch_custom_game_lobby_team(req: Request, res: Response) {
    const body = req.body as Switch_Teams_REQ
    const account = req.token
    res.send({
  "body": {
    "MatchID": body.MatchID,
    "Player": {
      "Account": {
        "id": account.id
      },
      "JoinedAt": {
        "_hydra_unix_date": 1748619825
      },
      "BotSettingSlug": "",
      "LobbyPlayerIndex": 1,
      "CrossplayPreference": 1
    },
    "TeamIndex": body.TeamIndex
  },
  "metadata": null,
  "return_code": 0
})
}

export async function start_custom_match(req: Request, res: Response) {
  res.send({
  "body": {},
  "metadata": null,
  "return_code": 0
})
}

export async function kick_from_lobby(req: Request, res: Response) {
    const body = req.body as Kick_From_Lobby_REQ
    const account = req.token
    res.send({
  "body": {
    "MatchID": body.MatchID,
    "Player": {
      "Account": {
        "id": body.KickeeAccountID
      },
      "AccountID": body.KickeeAccountID,
      "BotSettingSlug": "Medium",
      "Fighter": {
        "AssetPath": "/Game/Character/Jason/character_Jason.character_Jason",
        "Slug": "character_Jason"
      },
      "Skin": {
        "AssetPath": "/Game/Character/Jason/Skins/Jason_Skin_000.Jason_Skin_000",
        "Slug": "skin_jason_000"
      },
      "LobbyPlayerIndex": 2
    }
  },
  "metadata": null,
  "return_code": 0
})
}

export async function add_custom_game_bot(req: Request, res: Response) {
    const body = req.body as Add_Custom_bot_REQ
    const account = req.token
    res.send({
  "body": {
    "MatchID": body.MatchID,
    "Bot": {
      "Account": {
        "id": body.BotAccountID
      },
      "AccountID": body.BotAccountID,
      "BotSettingSlug": body.BotSettingSlug,
      "Fighter": {
        "AssetPath": body.CharacterAssetPath,
        "Slug": body.CharacterSlug
      },
      "Skin": {
        "AssetPath": body.SkinAssetPath,
        "Slug": body.SkinSlug
      },
      "LobbyPlayerIndex": 2
    },
    "TeamIndex": body.TeamIndex
  },
  "metadata": null,
  "return_code": 0
})
}

export async function search_profiles_by_username(req: Request, res: Response) {
  res.send({
    "cursor": null,
    "start": 0,
    "count": 1,
    "total": 1,
    "results": [
        {
            "score": null,
            "result": {
                "id": "62e203442d44cbe765ee218a",
                "updated_at": 1740273555,
                "account_id": "62e203442d44cbe765ee2187",
                "created_at": 1658979140,
                "last_login": 1740273554,
                "points": null,
                "aggregates.s1-battlepass-score.type_class": "current_value",
                "aggregates.s1-battlepass-score.value": 142000,
                "aggregates.s3-battlepass-score.type_class": "current_value",
                "aggregates.s3-battlepass-score.value": 145428,
                "aggregates.s4-battlepass-score.type_class": "current_value",
                "aggregates.s4-battlepass-score.value": 74253,
                "aggregates.fighter-road-xp.type_class": "current_value",
                "aggregates.fighter-road-xp.value": 449000,
                "random_distribution": 0.34104087997531507,
                "account": {
                    "id": "62e203442d44cbe765ee2187",
                    "updated_at": 1740275141,
                    "created_at": 1658979140,
                    "deleted": false,
                    "orphaned": false,
                    "orphaned_reason": null,
                    "public_id": "pf31eb525670f4e61b29620432c903ac6",
                    "identity.username": "wandering-rough-surf-voice-fUyNo",
                    "identity.avatar": "https://s3.amazonaws.com/wb-agora-hydra-ugc-dokken/identicons/identicon.900.png",
                    "identity.default_username": true,
                    "identity.alternate.wb_network": [
                        {
                            "id": "p0b2df033e72746539da0971dff31f7e2",
                            "username": "labortory",
                            "avatar": null
                        }
                    ],
                    "identity.alternate.twitch": [
                        {
                            "username": "zebxe",
                            "avatar": null
                        }
                    ],
                    "identity.alternate.epic": [
                        {
                            "username": "Isagii11",
                            "avatar": null
                        }
                    ],
                    "identity.alternate.steam": [
                        {
                            "id": "76561195253714377",
                            "username": "faose",
                            "avatar": "https://avatars.steamstatic.com/fe5fe8d105d5d1617f755d6c1f9b09688bff585a.jpg"
                        }
                    ],
                    "identity.alternate.xb1": [
                        {
                            "username": "faose",
                            "avatar": null
                        }
                    ],
                    "wb_account.completed": true,
                    "wb_account.email_verified": true,
                    "points": 0,
                    "state": "normal",
                    "wbplay_data_synced": false,
                    "wbplay_identity": null,
                    "locale": "en-US"
                }
            }
        }
    ]
}
)
}

export async function update_team_style_for_custom_game(req: Request, res: Response) {
  const account = req.token
  const body = req.body as Team_Style_Custom_Game_REQ
  let character = "" as any
  let variant = "" as any

  try {
    const playerData = await PlayerTesterModel.findOne({ _id: new Types.ObjectId(account.id) });
    //let profileicon = ""
    character = playerData?.character      
    variant = playerData?.variant
      
  } catch (err) {
    console.log("error getting leave lobby previous locked in character" + err)
  }
  res.send({
    "body": {
        "lobby": {
            "Teams": [
                {
                    "TeamIndex": 0,
                    "Players": {
                        [account.id]: {
                            "Account": {
                                "id": account.id
                            },
                            "JoinedAt": 1740278501,
                            "BotSettingSlug": "",
                            "LobbyPlayerIndex": 0,
                            "CrossplayPreference": 1
                        }
                    },
                    "Length": 1
                },
                {
                    "TeamIndex": 1,
                    "Players": {},
                    "Length": 0
                },
                {
                    "TeamIndex": 2,
                    "Players": {},
                    "Length": 0
                },
                {
                    "TeamIndex": 3,
                    "Players": {},
                    "Length": 0
                },
                {
                    "TeamIndex": 4,
                    "Players": {},
                    "Length": 0
                }
            ],
            "LeaderID": account.id,
            "LobbyType": 0,
            "ReadyPlayers": {
                [account.id]: true
            },
            "PlayerGameplayPreferences": {
                [account.id]: 608
            },
            "PlayerAutoPartyPreferences": {
                [account.id]: false
            },
            "GameVersion": "CLIENT:2F322-Retail DATA:4CF442B2 PERKS:1",
            "HissCrc": 3793881667,
            "Platforms": {
                [account.id]: "PC"
            },
            "AllMultiplayParams": {
                "1": {
                    "MultiplayClusterSlug": "ec2-us-east-1-dokken",
                    "MultiplayProfileId": "1252499",
                    "MultiplayRegionId": ""
                },
                "2": {
                    "MultiplayClusterSlug": "ec2-us-east-1-dokken",
                    "MultiplayProfileId": "1252922",
                    "MultiplayRegionId": "19c465a7-f21f-11ea-a5e3-0954f48c5682"
                },
                "3": {
                    "MultiplayClusterSlug": "",
                    "MultiplayProfileId": "1252925",
                    "MultiplayRegionId": ""
                },
                "4": {
                    "MultiplayClusterSlug": "ec2-us-east-1-dokken",
                    "MultiplayProfileId": "1252928",
                    "MultiplayRegionId": "19c465a7-f21f-11ea-a5e3-0954f48c5682"
                }
            },
            "LockedLoadouts": {
                [account.id]: {
                    "Character": character,
                    "Skin": variant
                }
            },
            "Maps": [
                {
                    "Map": "M000_V2_NEW",
                    "IsSelected": true
                },
                {
                    "Map": "M001_V2",
                    "IsSelected": true
                },
                {
                    "Map": "PvE_03",
                    "IsSelected": true
                },
                {
                    "Map": "M002_V2",
                    "IsSelected": true
                },
                {
                    "Map": "M002_V3",
                    "IsSelected": true
                },
                {
                    "Map": "M003_V1",
                    "IsSelected": true
                },
                {
                    "Map": "M003_V2",
                    "IsSelected": true
                },
                {
                    "Map": "M003_V5",
                    "IsSelected": true
                },
                {
                    "Map": "PVE_M003_Floorless",
                    "IsSelected": true
                },
                {
                    "Map": "PVE_05_V1",
                    "IsSelected": true
                },
                {
                    "Map": "M006_V3",
                    "IsSelected": true
                },
                {
                    "Map": "M006_V2",
                    "IsSelected": true
                },
                {
                    "Map": "M008_V2",
                    "IsSelected": true
                },
                {
                    "Map": "M009_V2",
                    "IsSelected": true
                },
                {
                    "Map": "M010_V1",
                    "IsSelected": true
                },
                {
                    "Map": "M010_V2",
                    "IsSelected": true
                },
                {
                    "Map": "M011_V3",
                    "IsSelected": true
                },
                {
                    "Map": "M011_V4",
                    "IsSelected": true
                },
                {
                    "Map": "M015_V1",
                    "IsSelected": true
                },
                {
                    "Map": "M015_V2",
                    "IsSelected": true
                },
                {
                    "Map": "M016",
                    "IsSelected": true
                },
                {
                    "Map": "M016_V3",
                    "IsSelected": true
                },
                {
                    "Map": "M016_V4",
                    "IsSelected": true
                },
                {
                    "Map": "map_pve_m016_module04",
                    "IsSelected": true
                },
                {
                    "Map": "map_pve_m016_module05",
                    "IsSelected": true
                },
                {
                    "Map": "map_pve_m016_module08",
                    "IsSelected": true
                },
                {
                    "Map": "map_pve_m016_module09",
                    "IsSelected": true
                },
                {
                    "Map": "map_pve_m016_module10",
                    "IsSelected": true
                },
                {
                    "Map": "M007_V2",
                    "IsSelected": true
                },
                {
                    "Map": "M007_V3",
                    "IsSelected": true
                },
                {
                    "Map": "M012_V2",
                    "IsSelected": true
                },
                {
                    "Map": "M014_V2",
                    "IsSelected": true
                },
                {
                    "Map": "M017_V1",
                    "IsSelected": true
                },
                {
                    "Map": "M017_V2",
                    "IsSelected": true
                },
                {
                    "Map": "M018_V2",
                    "IsSelected": true
                },
                {
                    "Map": "M023_V2",
                    "IsSelected": true
                },
                {
                    "Map": "MTS001_V1",
                    "IsSelected": true
                },
                {
                    "Map": "mts001_V4",
                    "IsSelected": true
                },
                {
                    "Map": "PVE_09",
                    "IsSelected": true
                },
                {
                    "Map": "MTS002_V1",
                    "IsSelected": true
                },
                {
                    "Map": "mts002_v2",
                    "IsSelected": true
                },
                {
                    "Map": "mts002_V3",
                    "IsSelected": true
                },
                {
                    "Map": "PVE_08",
                    "IsSelected": true
                },
                {
                    "Map": "mts003_v1",
                    "IsSelected": true
                },
                {
                    "Map": "mts003_v2",
                    "IsSelected": true
                }
            ],
            "match_config": {
                "TeamStyle": body.TeamStyle,
                "QueueType": "Unselected",
                "Context": "Custom",
                "ModeDifficulty": "Unselected",
                "GameModeAlias": "Versus",
                "NumRingoutsForWin": 3,
                "MatchDuration": 420,
                "AllowHazards": true,
                "AllowDuplicateCharacters": true,
                "AreRewardsSkipped": true,
                "num_set_wins_required": 1,
                "EnableShields": 1
            },
            "IsLobbyJoinable": true,
            "Handicaps": {},
            "MatchID": body.MatchID
        }
    },
    "metadata": null,
    "return_code": 0
})
}

export async function leave_player_lobby(req: Request, res: Response) {
  const account = req.token
  let character = "" as any
  let variant = "" as any

  try {
    const playerData = await PlayerTesterModel.findOne({ _id: new Types.ObjectId(account.id) });
    //let profileicon = ""
    character = playerData?.character      
    variant = playerData?.variant
      
  } catch (err) {
    console.log("error getting leave lobby previous locked in character" + err)
  }

  res.send({
    "body": {
        "lobby": {
            "Teams": [
                {
                    "TeamIndex": 0,
                    "Players": {
                        [account.id]: {
                            "Account": {
                                "id": account.id
                            },
                            "JoinedAt": 1747570785,
                            "BotSettingSlug": "",
                            "LobbyPlayerIndex": 0,
                            "CrossplayPreference": 1
                        }
                    },
                    "Length": 1
                },
                {
                    "TeamIndex": 1,
                    "Players": {},
                    "Length": 0
                },
                {
                    "TeamIndex": 2,
                    "Players": {},
                    "Length": 0
                },
                {
                    "TeamIndex": 3,
                    "Players": {},
                    "Length": 0
                },
                {
                    "TeamIndex": 4,
                    "Players": {},
                    "Length": 0
                }
            ],
            "LeaderID": account.id,
            "LobbyType": 0,
            "ReadyPlayers": {},
            "PlayerGameplayPreferences": {
                [account.id]: 292
            },
            "PlayerAutoPartyPreferences": {
                [account.id]: false
            },
            "GameVersion": "CLIENT:2FAE7-Retail DATA:4CF442B2 PERKS:1",
            "HissCrc": 2177679343,
            "Platforms": {
                [account.id]: "PC"
            },
            "AllMultiplayParams": null,
            "LockedLoadouts": {
                [account.id]: {
                    "Character": character,
                    "Skin": variant
                }
            },
            "ModeString": "1v1",
            "IsLobbyJoinable": true,
            "MatchID": "6829d061f92e4bc251cb5a1a"
        }
    },
    "metadata": null,
    "return_code": 0
})
}

export async function lobby_code(req:Request, res: Response) {
  res.send({
    "body": {
        "LobbyCode": "CKXLM"
    },
    "metadata": null,
    "return_code": 0
})
  
}

export async function create_custom_game_lobby(req: Request, res: Response) {
  const accountid = new Types.ObjectId(req.token.id)
  const account = req.token.id
  let character = "" as any
  let variant = "" as any

  try {
    const playerData = await PlayerTesterModel.findOne({ _id: new Types.ObjectId(account) });
    //let profileicon = ""
    character = playerData?.character      
    variant = playerData?.variant
      
  } catch (err) {
    console.log("custom game previous locked in character" + err)
  }
  //console.log(account)
  res.send({
    "body": {
        "lobby": {
            "Teams": [
                {
                    "TeamIndex": 0,
                    "Players": {
                       [account]: {
                            "Account": {
                                "id": accountid
                            },
                            "JoinedAt": 1740278501,
                            "BotSettingSlug": "",
                            "LobbyPlayerIndex": 0,
                            "CrossplayPreference": 1
                        }
                    },
                    "Length": 1
                },
                {
                    "TeamIndex": 1,
                    "Players": {},
                    "Length": 0
                },
                {
                    "TeamIndex": 2,
                    "Players": {},
                    "Length": 0
                },
                {
                    "TeamIndex": 3,
                    "Players": {},
                    "Length": 0
                },
                {
                    "TeamIndex": 4,
                    "Players": {},
                    "Length": 0
                }
            ],
            "LeaderID": account,
            "LobbyType": 0,
            "ReadyPlayers": {
                [account]: true
            },
            "PlayerGameplayPreferences": {
                [account]: 608
            },
            "PlayerAutoPartyPreferences": {
                [account]: false
            },
            "GameVersion": "CLIENT:2F322-Retail DATA:4CF442B2 PERKS:1",
            "HissCrc": 3793881667,
            "Platforms": {
                [account]: "PC"
            },
            "AllMultiplayParams": {
                "1": {
                    "MultiplayClusterSlug": "ec2-us-east-1-dokken",
                    "MultiplayProfileId": "1252499",
                    "MultiplayRegionId": ""
                },
                "2": {
                    "MultiplayClusterSlug": "ec2-us-east-1-dokken",
                    "MultiplayProfileId": "1252922",
                    "MultiplayRegionId": "19c465a7-f21f-11ea-a5e3-0954f48c5682"
                },
                "3": {
                    "MultiplayClusterSlug": "",
                    "MultiplayProfileId": "1252925",
                    "MultiplayRegionId": ""
                },
                "4": {
                    "MultiplayClusterSlug": "ec2-us-east-1-dokken",
                    "MultiplayProfileId": "1252928",
                    "MultiplayRegionId": "19c465a7-f21f-11ea-a5e3-0954f48c5682"
                }
            },
            "LockedLoadouts": {
                [account]: {
                    "Character": character,
                    "Skin": variant
                }
            },
            "Maps": [
                {
                    "Map": "M000_V1_NEW",
                    "IsSelected": true
                },
                {
                    "Map": "M001",
                    "IsSelected": true
                },
                {
                    "Map": "PvE_03",
                    "IsSelected": true
                },
                {
                    "Map": "M002_V1",
                    "IsSelected": true
                },
                {
                    "Map": "M002_V3",
                    "IsSelected": true
                },
                {
                    "Map": "M003_V3",
                    "IsSelected": true
                },
                {
                    "Map": "M003_V4",
                    "IsSelected": true
                },
                {
                    "Map": "M003_V5",
                    "IsSelected": true
                },
                {
                    "Map": "PVE_M003_Floorless",
                    "IsSelected": true
                },
                {
                    "Map": "PVE_05_V1",
                    "IsSelected": true
                },
                {
                    "Map": "M006_V1",
                    "IsSelected": true
                },
                {
                    "Map": "M006_V2",
                    "IsSelected": true
                },
                {
                    "Map": "M008",
                    "IsSelected": true
                },
                {
                    "Map": "M009_V1",
                    "IsSelected": true
                },
                {
                    "Map": "M010_V1",
                    "IsSelected": true
                },
                {
                    "Map": "M010_V2",
                    "IsSelected": true
                },
                {
                    "Map": "M011_V1",
                    "IsSelected": true
                },
                {
                    "Map": "M011_V2",
                    "IsSelected": true
                },
                {
                    "Map": "M015_V1",
                    "IsSelected": true
                },
                {
                    "Map": "M016",
                    "IsSelected": true
                },
                {
                    "Map": "M016_V2",
                    "IsSelected": true
                },
                {
                    "Map": "M016_V4",
                    "IsSelected": true
                },
                {
                    "Map": "map_pve_m016_module04",
                    "IsSelected": true
                },
                {
                    "Map": "map_pve_m016_module05",
                    "IsSelected": true
                },
                {
                    "Map": "map_pve_m016_module08",
                    "IsSelected": true
                },
                {
                    "Map": "map_pve_m016_module09",
                    "IsSelected": true
                },
                {
                    "Map": "map_pve_m016_module10",
                    "IsSelected": true
                },
                {
                    "Map": "M007",
                    "IsSelected": true
                },
                {
                    "Map": "M007_V2",
                    "IsSelected": true
                },
                {
                    "Map": "M012_V1",
                    "IsSelected": true
                },
                {
                    "Map": "M012_V3",
                    "IsSelected": true
                },
                {
                    "Map": "M014",
                    "IsSelected": true
                },
                {
                    "Map": "M017_V1",
                    "IsSelected": true
                },
                {
                    "Map": "M017_V2",
                    "IsSelected": true
                },
                {
                    "Map": "M018_V1",
                    "IsSelected": true
                },
                {
                    "Map": "M018_V2",
                    "IsSelected": true
                },
                {
                    "Map": "M023_V1",
                    "IsSelected": true
                },
                {
                    "Map": "MTS001_V1",
                    "IsSelected": true
                },
                {
                    "Map": "mts001_V4",
                    "IsSelected": true
                },
                {
                    "Map": "mts001_v3",
                    "IsSelected": true
                },
                {
                    "Map": "PVE_14",
                    "IsSelected": true
                },
                {
                    "Map": "PVE_09",
                    "IsSelected": true
                },
                {
                    "Map": "MTS002_V1",
                    "IsSelected": true
                },
                {
                    "Map": "mts002_v2",
                    "IsSelected": true
                },
                {
                    "Map": "mts002_V3",
                    "IsSelected": true
                },
                {
                    "Map": "PVE_08",
                    "IsSelected": true
                },
                {
                    "Map": "mts003_v1",
                    "IsSelected": true
                },
                {
                    "Map": "mts003_v4",
                    "IsSelected": true
                },
                {
                    "Map": "mts003_v3",
                    "IsSelected": true
                }
            ],
            "match_config": {
                "TeamStyle": "Duos",
                "QueueType": "Unselected",
                "Context": "Custom",
                "ModeDifficulty": "Unselected",
                "GameModeAlias": "Versus",
                "NumRingoutsForWin": 4,
                "MatchDuration": 420,
                "AllowHazards": true,
                "AllowDuplicateCharacters": true,
                "AreRewardsSkipped": true,
                "num_set_wins_required": 1,
                "EnableShields": 1
            },
            "IsLobbyJoinable": true,
            "Handicaps": {},
            "MatchID": "67ba8ae5ada65997088e253f"
        },
        "Cluster": "ec2-us-east-1-dokken"
    },
    "metadata": null,
    "return_code": 0
})
}

export async function set_lock_lobby_loadout(req: Request, res: Response<Lock_Lobby_Loadout_RES>) {
  const account = req.token;
  const body = req.body as Lock_Lobby_Loadout_REQ;
  let ip = req.ip!.replace(/^::ffff:/, "");
  if (ip === "127.0.0.1") {
    ip = env.LOCAL_PUBLIC_IP;
  }
  await redisUpdatePlayerLoadout(account.id, body.Loadout.Character, body.Loadout.Skin, ip);
  
  try {
    const updatedDoc = await PlayerTesterModel.findOneAndUpdate(
      { _id: new Types.ObjectId(account.id) },
      {
        $set: {
          character: body.Loadout.Character,
          variant: body.Loadout.Skin
        },
      },
      { upsert: true, new: true }
    ).exec();
  } catch (err) {
    console.log("Error saving Character and variant last used", err);
  }

  res.send({
    body: {
      AccountId: account.id,
      Loadout: {
        Character: body.Loadout.Character,
        Skin: body.Loadout.Skin,
      },
      bAreAllLoadoutsLocked: true,
    },
    metadata: null,
    return_code: 0,
  });
}

export interface PERKS_ABSENT_RES {
  body: PERKS_ABSENT_RES_BODY;
  metadata: any;
  return_code: number;
}

export interface PERKS_ABSENT_RES_BODY {
  message: string;
}

export async function set_perks_absent(req: Request, res: Response<PERKS_ABSENT_RES>) {
  res.send({
    body: {
      message: "Early absent report",
    },
    metadata: null,
    return_code: 2,
  });
}

export async function perks_set_page(req: Request, res: Response) {
  const { Character, Description, DisplayName, PageIndex, Perks } = req.body;
  const account_id = req.token.id; // Assuming this is an ObjectId or convertible

  // Build the update path for this page
  const pageKey = `perk_pages.${Character}.${PageIndex}`;
  const updateValue = {
    DisplayName,
    Description,
    Perks,
  };
  // 2. Upsert the specific character/page index
  try {
    const updatedDoc = await PerkPagesModel.findOneAndUpdate(
      { account_id: new Types.ObjectId(account_id) },
      {
        $set: {
          [pageKey]: updateValue,
        },
      },
      { upsert: true, new: true }
    ).exec();
  } catch (err) {
    console.log("Error saving perks", err);
  }

  res.send({
    body: {},
    metadata: null,
    return_code: 0,
  });
}

export async function handleSsc_invoke_create_party_lobby(req: Request<{}, {}, {}, {}>, res: Response) {
  const account = req.token;
  
  let character = "" as any
  let variant = "" as any

  try {
    const playerData = await PlayerTesterModel.findOne({ _id: new Types.ObjectId(account.id) });
    //let profileicon = ""
    character = playerData?.character      
    variant = playerData?.variant
      
  } catch (err) {
    console.log("error fetching profile icon" + err)
  }

  const loadout = { Character: character, Skin: variant };

  let ip = req.ip!.replace(/^::ffff:/, "");
  if (ip === "127.0.0.1") {
    ip = env.LOCAL_PUBLIC_IP;
  }
  const lobbyMode = LOBBY_MODES.ONE_V_ONE; // Default mode, can be changed later;
  const newLobby = await createLobby(account.id, lobbyMode);

  await redisUpdatePlayerLoadout(account.id, loadout.Character, loadout.Skin, ip);
  res.send({
    body: {
      lobby: {
        Teams: [
          {
            TeamIndex: 0,
            Players: {
              [account.id]: {
                Account: { id: account.id },
                JoinedAt: { _hydra_unix_date: MVSTime(new Date()) },
                BotSettingSlug: "",
                LobbyPlayerIndex: 0,
                CrossplayPreference: 1,
              },
            },
            Length: 1,
          },
          { TeamIndex: 1, Players: {}, Length: 0 },
          { TeamIndex: 2, Players: {}, Length: 0 },
          { TeamIndex: 3, Players: {}, Length: 0 },
          { TeamIndex: 4, Players: {}, Length: 0 },
        ],
        LeaderID: account.id,
        LobbyType: 0,
        ReadyPlayers: {},
        PlayerGameplayPreferences: { [account.id]: 544 },
        PlayerAutoPartyPreferences: { [account.id]: true },
        GameVersion: env.GAME_VERSION,
        HissCrc: 1167552915,
        Platforms: { [account.id]: "PC" },
        AllMultiplayParams: {
          "1": { MultiplayClusterSlug: "ec2-us-east-1-dokken", MultiplayProfileId: "1252499", MultiplayRegionId: "" },
          "2": {
            MultiplayClusterSlug: "ec2-us-east-1-dokken",
            MultiplayProfileId: "1252922",
            MultiplayRegionId: "19c465a7-f21f-11ea-a5e3-0954f48c5682",
          },
          "3": { MultiplayClusterSlug: "", MultiplayProfileId: "1252925", MultiplayRegionId: "" },
          "4": {
            MultiplayClusterSlug: "ec2-us-east-1-dokken",
            MultiplayProfileId: "1252928",
            MultiplayRegionId: "19c465a7-f21f-11ea-a5e3-0954f48c5682",
          },
        },
        LockedLoadouts: { [account.id]: { Character: loadout.Character, Skin: loadout.Skin } },
        ModeString: lobbyMode.toString(),
        IsLobbyJoinable: true,
        MatchID: newLobby.id,
      },
      Cluster: "ec2-us-east-1-dokken",
    },
    metadata: null,
    return_code: 0,
  });
}

export async function handleSsc_invoke_perks_get_all_pages(req: Request<{}, {}, {}, {}>, res: Response) {
  const accountId = req.token.id;

  PerkPagesModel.findOne({ account_id: new Types.ObjectId(accountId) })
    .select("perk_pages -_id")
    .lean()
    .exec()
    .then((doc) => {
      res.send({
        body: {
          perk_pages: doc?.perk_pages || {},
        },
        metadata: null,
        return_code: 0,
      });
    })
    .catch((e) => {
      console.log(e);
      res.send({
        body: {
          perk_pages: {},
        },
        metadata: null,
        return_code: 0,
      });
    });
}

export interface SET_LOBBY_MODE_REQ {
  AutoPartyPreference: boolean;
  CrossplayPreference: number;
  GameplayPreferences: number;
  HissCrc: number;
  LobbyId: string;
  LobbyTemplate: string;
  ModeString: string;
  Platform: string;
  Version: string;
}

export async function handle_ssc_set_lobby_mode(req: Request<{}, {}, SET_LOBBY_MODE_REQ, {}>, res: Response) {
  const account = req.token;
  await changeLobbyMode(account.id, req.body.LobbyId, req.body.ModeString as LOBBY_MODES);
  res.send({
    body: {},
    metadata: null,
    return_code: 0,
  });
}
