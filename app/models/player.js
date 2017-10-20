import shortid from "shortid";
import db from '../utils/connection';

class Player {
  static formatPlayer(row) {
    const fields = [
      'id', 'short_id', 'usatt_url',
      'rating', 'name', 'updated_at',
      'created_on', 'group_id', 'pos',
      'session_count',
    ];
    const player = {};
    fields.forEach(field => {
      if (row[field]) {
        player[field] = row[field];
      }
    });

    return player;
  }

  static async getMostActivePlayers(id) {
    const connection = await db.getConnection();
    return new Promise((resolve, reject) => {
      connection.query(`
        SELECT p.*, ph.rating, COUNT(ph.id) AS session_count FROM players AS p
        INNER JOIN player_histories AS ph
        ON p.id = ph.player_id
        INNER JOIN clubs AS c
        ON c.id = ph.club_id
        WHERE c.id = ?
        GROUP BY ph.club_id, ph.player_id
        ORDER BY session_count DESC
        LIMIT 10
      `, [id], (err, results, field) => {
        connection.release();
        if (err) throw(err);
        if (results.length === 0) {
          return reject({ player: 'Player not found' });
        }
        const player = Player.formatPlayer(results[0]);
        return resolve(player);
      });
    });
  }
  static async removePlayer(clubId, id) {
    const connection = await db.getConnection();
    return new Promise((resolve, reject) => {
      connection.query(`
        DELETE FROM players WHERE id = ? AND EXISTS (
          SELECT * FROM (SELECT * FROM players) AS p
          INNER JOIN club_players AS cp
          ON cp.player_id = p.id
          INNER JOIN clubs AS c
          ON c.id = cp.club_id
          WHERE p.id = ? AND c.id = ?
        )
      `, [id, id, clubId], (err, results, field) => {
        connection.release();
        if (err) throw(err);
        if (results.affectedRows > 0) {
          resolve(true);
        } else {
          reject({ player: 'Player not found.' });
        }
      });
    });
  }

  static async updatePlayer(clubId, id, player) {
    const oldRecord = await Player.find(clubId, id);
    const connection = await db.getConnection();
    const updatePlayers = await new Promise((resolve, reject) => {
      connection.beginTransaction((tError) => {
        if (tError) throw tError;
        if (oldRecord.name === player.name) {
          return resolve(true);
        }
        connection.query(`
          UPDATE players AS p
          SET name = ? WHERE id = ?
        `, [player.name, id, id, clubId], (err, results, field) => {
          if (err) {
            connection.rollback();
            connection.release();
            throw err;
          }
          if (results.affectedRows === 0) {
            reject({ player: 'Player not found.' });
          } else {
            resolve(true);
          }
        });
      });
    });
    return new Promise((resolve, reject) => {
      if (oldRecord.rating === player.rating) {
        connection.commit();
        connection.release();
        return resolve(true);
      }
      connection.query(`
        INSERT INTO player_histories
        (player_id, club_id, old_rating, rating_change, rating, change_date)
        VALUES (?, ?, ?, 0, ?, ?)
      `, [id, clubId, oldRecord.rating, player.rating, new Date()], (err, results, field) => {
        if (err) {
          connection.rollback();
          connection.release();
          throw err;
        }
        connection.commit();
        connection.release();
        return resolve(id);
      });
    });
  }

  static async createPlayer(clubId, player, conn) {
    const shortId = shortid.generate();
    const connection = conn || await db.getConnection();
    return new Promise((resolve, reject) => {
      connection.beginTransaction((tError) => {
        if (tError) throw tError;
        connection.query(`
          INSERT INTO players (short_id, name)
          VALUES (?, ?)
        `, [shortId, player.name], (err, results, field) => {
          if (err) {
            connection.rollback();
            connection.release();
            throw(err);
          }
          resolve(results.insertId);
        });
      });
    }).then((id) => Player.createClubPlayer(connection, clubId, id, player.rating));
  }

  static createClubPlayer(connection, clubId, id, rating) {
    return new Promise((resolve, reject) => {
      connection.query(`
        INSERT INTO club_players (club_id, player_id)
        VALUES (?, ?)
      `, [clubId, id], (err, results, field) => {
        if (err) {
          connection.rollback();
          connection.release();
          throw err;
        }
        resolve(id);
      });
    }).then(() => Player.createPlayerHistoryInitial(connection, clubId, id, rating));
  }

  static createPlayerHistoryInitial(connection, clubId, id, rating) {
    return new Promise((resolve, reject) => {
      connection.query(`
        INSERT INTO player_histories
        (player_id, club_id, old_rating, rating_change, rating, change_date)
        VALUES (?, ?, ?, 0, ?, ?)
      `, [id, clubId, rating, rating, new Date()], (err, results, field) => {
        if (err) {
          connection.rollback();
          connection.release();
          throw err;
        }
        connection.commit();
        connection.release();
        return resolve(id);
      });
    });
  }

  static async createPlayers(clubId, players) {
    const connection = await db.getConnection();
    const promises = players.map(player => Player.createPlayer(clubId, player));
    return new Promise((resolve, reject) => {
      connection.beginTransaction((tError) => {
        if (tError) throw tError;
        Promise.all(promises)
          .then(
            (players) => {
              connection.commit();
              connection.release();
              resolve(players);
            },
            (error) => {
              connection.rollback();
              connection.release();
              reject(error);
            }
          );
      });
    });
  }

  static async findPlayers(clubId) {
    const connection = await db.getConnection();
    return new Promise((resolve, reject) => {
      connection.query(`
        SELECT p.id, p.short_id, ph.rating, p.name, p.created_on, p.updated_at
        FROM players AS p
        INNER JOIN club_players AS cp
        ON cp.player_id = p.id
        INNER JOIN (
          SELECT phs1.rating, phs1.player_id
          FROM player_histories AS phs1
          INNER JOIN (
            SELECT club_id, player_id, MAX(change_date) AS max_date
            FROM player_histories
            WHERE club_id = ?
            GROUP BY player_id, club_id
          ) AS phs2
          ON phs1.player_id = phs2.player_id AND
             phs1.change_date = phs2.max_date AND
             phs1.club_id = phs2.club_id
        ) AS ph
        ON ph.player_id = p.id
        WHERE cp.club_id = ?
      `, [clubId, clubId], (err, results, field) => {
        connection.release();
        if (err) throw(err);
        const data = results.map(row => Player.formatPlayer(row));
        return resolve(data);
      });
    });
  }

  static async find(clubId, id) {
    console.log('find', id, clubId);
    const connection = await db.getConnection();
    return new Promise((resolve, reject) => {
      connection.query(`
        SELECT p.id, p.short_id, ph.rating, p.name, p.created_on, p.updated_at
        FROM players AS p
        INNER JOIN (
          SELECT phs1.rating, phs1.player_id, phs1.club_id
          FROM player_histories AS phs1
          INNER JOIN (
            SELECT club_id, player_id, MAX(change_date) AS max_date
            FROM player_histories
            WHERE player_id = ? AND club_id = ?
            GROUP BY player_id, club_id
          ) AS phs2
          ON phs1.player_id = phs2.player_id AND
             phs1.change_date = phs2.max_date AND
             phs1.club_id = phs2.club_id
        ) AS ph
        ON ph.player_id = p.id
        WHERE p.id = ? AND ph.club_id = ?
      `, [id, clubId, id, clubId], (err, results, field) => {
        connection.release();
        if (err) throw(err);
        console.log(results);
        if (results.length === 0) {
          return reject({ player: 'Player not found' });
        }
        const player = Player.formatPlayer(results[0]);
        return resolve(player);
      });
    });
  }
}

export default Player;
