const express = require('express');
const app = express();
const PORT = 3000;

// Data source: Music
const music = [
  { id: 1, name: 'Nina Siri', artist: 'Israel Mbonyi', genre: 'Gospel', duration: '11mins:11secs' },
  { id: 2, name: 'Afsana', artist: 'Fally Ipupa', genre: 'Rhumba', duration: '4mins:48secs' },
  { id: 3, name: 'Lemme See', artist: 'Usher', genre: 'RnB', duration: '4mins:13secs' },
  { id: 4, name: 'Remember Me', artist: 'Leslie Parish', genre: 'Eurobeats', duration: '4mins:45secs' },
  { id: 5, name: 'Kitemeo', artist: 'Kapitani', genre: 'UrbanTone', duration: '2mins:55secs' },
  { id: 6, name: 'Blue Uniform', artist: 'Sauti Sol', genre: 'Kenyan Sol', duration: '4mins:18secs' }
];

// Data source: Students (10 entries)
const students = [
  { regNo: 1, name: 'John Doe', course: 'Computer Science', duration: '4 Years' },
  { regNo: 2, name: 'Jane Smith', course: 'Software Engineering', duration: '4 Years' },
  { regNo: 3, name: 'Michael Brown', course: 'Information Technology', duration: '3 Years' },
  { regNo: 4, name: 'Emily Davis', course: 'Data Science', duration: '4 Years' },
  { regNo: 5, name: 'William Garcia', course: 'Cyber Security', duration: '3 Years' },
  { regNo: 6, name: 'Olivia Martinez', course: 'Network Engineering', duration: '4 Years' },
  { regNo: 7, name: 'James Rodriguez', course: 'Artificial Intelligence', duration: '4 Years' },
  { regNo: 8, name: 'Sophia Hernandez', course: 'Cloud Computing', duration: '3 Years' },
  { regNo: 9, name: 'Benjamin Moore', course: 'Computer Science', duration: '4 Years' },
  { regNo: 10, name: 'Isabella Taylor', course: 'Information Systems', duration: '3 Years' }
];

app.use(express.json());

// Endpoint: Retrieve all music (optional, kept from your original code)
app.get('/music', (req, res) => {
  res.status(200).json({
    success: true,
    data: music
  });
});

// Endpoint: Retrieve a specific song by ID
app.get('/music/:id', (req, res) => {
  const song = music.find(m => m.id === parseInt(req.params.id));
  if (!song) {
    return res.status(404).json({ success: false, message: 'doesnt exist' });
  }
  res.status(200).json({ success: true, data: song });
});

// Endpoint: Retrieve a specific student by Registration Number
app.get('/students/:id', (req, res) => {
  const student = students.find(s => s.regNo === parseInt(req.params.id));
  if (!student) {
    return res.status(404).json({ success: false, message: 'doesnt exist' });
  }
  res.status(200).json({ success: true, data: student });
});

app.listen(PORT, () => {
  console.log(`REST API running on port ${PORT}`);
  console.log(`Test Music: http://localhost:${PORT}/music/1`);
  console.log(`Test Students: http://localhost:${PORT}/students/1`);
});