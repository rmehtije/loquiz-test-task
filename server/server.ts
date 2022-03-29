import express from "express";
import fs from "fs";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { App } from "../client/components/app";
import axios from 'axios';
import moment from 'moment';
import { iTeam } from '../client/components/gameInfoTableComponent'

interface iTeamRaw extends iTeam {
  finishTime: string;
  startTime: string;
}

require('dotenv').config()

const server = express();

server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "views"));

server.use("/", express.static(path.join(__dirname, "static")));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

const manifest = fs.readFileSync(
  path.join(__dirname, "static/manifest.json"),
  "utf-8"
);
const assets = JSON.parse(manifest);

server.get("/", (req, res) => {
  const component = ReactDOMServer.renderToString(React.createElement(App));
  res.render("client", { assets, component });
});

server.post("/", async (req, res) => {
  
  const apiAddress: string = `${process.env.API_URL}`
  const authorization: string = `${process.env.AUTHORIZATION_KEY}`

  const headers = {
        'Content-Type': 'application/json',
        'Authorization': authorization,
      };
  
  try {

    const gameInfo = await axios.get(
      `${apiAddress}/games/${req.body.gameId}`,
      {headers}
      )
    .then(response => response.data)
    .catch(error => {throw error});
  
    const teamsInfo = await axios.get(
      `${apiAddress}/results/${req.body.gameId}/teams`, 
      {headers}
      )
    .then(response => response.data)
    .catch(error => {throw error});

    const team = teamsInfo.items.map((team: iTeamRaw) => {
      const finishTime = moment(team.finishTime);
      const startTime = moment(team.startTime);
      const playTime = moment.utc(finishTime.diff(startTime)).format("HH:mm:ss.SSS");

      return {
        name: team.name,
        odometer: team.odometer,
        totalScore: team.totalScore,
        playTime,
      };
    });
    
    res.send({
      gameTitle: gameInfo.title,
      teams: team,
    });

  } catch (error) {
    console.log(error);
    res.send({error});
  }
  
  
});

server.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`);
});
