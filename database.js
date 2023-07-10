const mysql = require('mysql2')

const db=mysql.createConnection({
    user: process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    host:"localhost",
    database:"cricbuzz"
}).promise()

async function getAllAdmins(){
    const admins = await db.query("SELECT * FROM admins")
    console.log(admins[0])
    return admins[0]
}

async function getAdminById(id){
    const admin = await db.query("SELECT * FROM admins where admin_id = ?", [id])
    console.log(admin)
    return admin[0]
}

async function getAdminByUsername(username){
    const user = await db.query("SELECT * FROM admins where username = ?", [username])
    console.log(user)
    return user[0]
}

async function getAdminByEmail(email){
    const user = await db.query("SELECT * FROM admins where email = ?", [email])
    console.log(user)
    return user[0]
}

async function addNewUser(username, email, password){
    const result = await db.query("INSERT INTO admins(username, email, password) values (?,?,?)",[username, email, password])
    console.log(result[0].insertId)
    return result[0]
}

async function addNewMatch(team1, team2, date, venue){
    const result = await db.query("INSERT INTO matches(team_1, team_2, match_date, match_venue) values (?,?,?,?)",[team1, team2, date, venue])
    console.log(result[0])
    return result[0]
}

async function getAllMatches(){
    const matches = await db.query("SELECT * FROM matches")
    return matches[0]
}

async function getTeamByName(team_name){
    const team = await db.query("SELECT * FROM teams where team_name = ?", [team_name])
    return team[0]
}

async function addNewTeam(team_name){
    const result = await db.query("INSERT INTO teams(team_name) values (?)",[team_name])
    return result[0]
}

async function getPlayerIdAndNameByTeamId(team_id){
    const players = await db.query("SELECT player_id, player_name FROM players WHERE team_id = ?",[team_id])
    return players[0]
}

async function getPlayerByID(player_id){
    const players = await db.query("SELECT * FROM players WHERE player_id = ?",[player_id])
    return players[0]
}

async function addNewPlayer(player_name, player_role, team_id){
    const result = await db.query("INSERT INTO players(player_name, player_role, team_id) values (?,?,?)",[player_name, player_role, team_id])
    return result[0]
}

async function getMatchById(match_id){
    const match = await db.query("SELECT * FROM matches WHERE match_id = ?",[match_id])
    return match[0]
}
// console.log(getNoteById(1));

module.exports.getAllAdmins = getAllAdmins
module.exports.getAdminById = getAdminById
module.exports.getAdminByUsername = getAdminByUsername
module.exports.getAdminByEmail = getAdminByEmail
module.exports.addNewUser = addNewUser
module.exports.addNewMatch = addNewMatch
module.exports.getAllMatches = getAllMatches
module.exports.getTeamByName = getTeamByName
module.exports.addNewTeam = addNewTeam
module.exports.getPlayerIdAndNameByTeamId = getPlayerIdAndNameByTeamId
module.exports.getPlayerByID = getPlayerByID
module.exports.addNewPlayer = addNewPlayer
module.exports.getMatchById = getMatchById

