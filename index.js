const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

let notes = [
  {
    id: 1,
    content: 'Me tengo que poner a estudiar la kata 3',
    date: '2019-05-30T17:30:31.098Z',
    important: true,
  },
  {
    id: 2,
    content: 'Tengo que estudiar las clases del FullStack Bootcamp',
    date: '2019-05-30T18:39:34.091Z',
    important: false,
  },
  {
    id: 3,
    content: 'Repasar los retos de JS de la kata 2',
    date: '2019-05-30T19:20:14.298Z',
    important: true,
  },
];

app.get('/api/notes', (request, response) => {
  response.json(notes);
});

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
});

app.post('/api/notes', (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({ error: 'Content missing' });
  }

  const newNote = {
    id: generateId(),
    content: body.content,
    date: new Date(),
    important: body.important || false,
  };

  notes = notes.concat(newNote);

  response.json(newNote);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

function generateId() {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
}
