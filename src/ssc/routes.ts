import express, { Request, Response } from "express";
import {
  handle_ssc_set_lobby_mode,
  handleSsc_invoke_create_party_lobby,
  handleSsc_invoke_perks_get_all_pages,
  perks_set_page,
  set_lock_lobby_loadout,
  set_perks_absent,
  create_custom_game_lobby,
  lobby_code,
  leave_player_lobby,
  update_team_style_for_custom_game,
  search_profiles_by_username,
  add_custom_game_bot,
  switch_custom_game_lobby_team,
  start_custom_match,
  kick_from_lobby
} from "./ssc";
import { app } from "../server";
export const sscRouter = express.Router();

sscRouter.put("/ssc/invoke/lock_lobby_loadout", (req: Request, res: Response) => {
  //console.log(req.body);
  set_lock_lobby_loadout(req, res);
});

sscRouter.put("/ssc/invoke/kick_from_lobby", (req: Request, res: Response) => {
  kick_from_lobby(req, res);
});

sscRouter.put("/ssc/invoke/perks_absent", (req: Request, res: Response) => {
  set_perks_absent(req, res);
});

sscRouter.put("/ssc/invoke/start_custom_match", (req: Request, res: Response) => {
  start_custom_match(req, res);
});

sscRouter.put("/ssc/invoke/switch_custom_game_lobby_team", (req: Request, res: Response) => {
  switch_custom_game_lobby_team(req, res);
});

sscRouter.put("/ssc/invoke/add_custom_game_bot", (req: Request, res: Response) => {
  add_custom_game_bot(req, res);
});

sscRouter.put("/ssc/invoke/perks_set_character_page", (req: Request, res: Response) => {
  perks_set_page(req, res);
});

sscRouter.get("/ssc/invoke/perks_get_all_pages", async (req: Request, res: Response) => {
  await handleSsc_invoke_perks_get_all_pages(req, res);
});

sscRouter.get("/profiles/search_queries/get-by-username/run", async (req: Request, res: Response) => {
  await search_profiles_by_username(req, res);
});

sscRouter.put("/ssc/invoke/create_party_lobby", async (req: Request, res: Response) => {
  await handleSsc_invoke_create_party_lobby(req, res);
});

sscRouter.put("/ssc/invoke/set_mode_for_lobby", async (req: Request, res: Response) => {
  await handle_ssc_set_lobby_mode(req, res);
});

sscRouter.put("/ssc/invoke/create_custom_game_lobby", async (req: Request, res: Response) => {
  await create_custom_game_lobby(req, res);
});

sscRouter.put("/ssc/invoke/lobby_code", async (req: Request, res: Response) => {
  await lobby_code(req, res);
});

sscRouter.put("/ssc/invoke/leave_player_lobby", async (req: Request, res: Response) => {
  await leave_player_lobby(req, res);
});

sscRouter.put("/ssc/invoke/update_team_style_for_custom_game", async (req: Request, res: Response) => {
  await update_team_style_for_custom_game(req, res);
});

