const Match = require('../models/match');

const getAllMatch = async (req, res) => {
  const matches = await Match.find();
  res.status(200).json({
    status: true,
    message: 'Successfully get all matches',
    data: matches,
  });
};
const getMatchById = (req, res) => { };
const addPersonToMatch = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const username = data.username || 'bot';
  const _id = data._id || 'bot123';

  Match.updateOne(
    {
      _id: id,
    },
    {
      user2: {
        username,
        id: _id,
      },
    }
  )
    .then((_) => {
      res.status(201).json({
        status: true,
        message: 'Successfully Join Game',
        // data: match,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        status: true,
        message: 'Unable to join the game',
        data: err,
      });
    });
};


let clients = [];
let facts = [];
const subscribeToMatchEvents = (request, response, next) => {

  const { id, userId } = request.params

  const headers = {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache'
  };

  let Oldclient = clients.findIndex((i) => i.matchId === id)
  console.log(Oldclient)
  if (Oldclient>=0) {
    let client = clients[Oldclient];
    if (client.user2 !== null) {
      return response.status(400).send({
        status: false,
        message: "All players are full"
      });
    }
    clients[Oldclient] = {
      user1: client.user1 || userId,
      user2: client.user1 !== null && (client.user2 || userId),
      matchId: id,
      response
    }
  } else {
    clients.push({
      user1: userId,
      user2: null,
      matchId: id,
      response
    });
  }

  response.writeHead(200, headers);

  const data = `data: ${JSON.stringify(facts)}\n\n`;

  response.write(data);

  console.log(clients)

  request.on('close', () => {
    console.log(`${id} Connection closed`);
    clients = clients.filter(client => client.matchId !== id);
  });
}

const gameTurn = async (req, res) => {
  const newFact = req.body;
  facts.push(newFact);
  res.json(newFact)
  console.log(clients)
  return sendEventsToAll(newFact)
};

function sendEventsToAll(newFact) {
  clients.forEach(client => client.response.write(`data: ${JSON.stringify(newFact)}\n\n`))
}

const createMatch = (req, res) => {
  const data = req.body;
  const match = new Match();
  match.user1 = {
    id: data._id,
    username: data.username,
  };

  match
    .save()
    .then(() => {
      res.status(201).json({
        status: true,
        message: 'Successfully Register Game',
        data: match,
      });
    })
    .catch((err) =>
      res.status(500).json({
        status: false,
        message: err.message,
      })
    );
};

module.exports = {
  getAllMatch,
  getMatchById,
  addPersonToMatch,
  subscribeToMatchEvents,
  gameTurn,
  createMatch,
};
