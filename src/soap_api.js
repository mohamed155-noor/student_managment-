const express = require('express');
const xml2js = require('xml2js');

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

// Middleware to capture raw XML request body
app.use(express.text({ type: ['text/xml', 'application/xml', '*/*'] }));

// Helper: Wrap payload inside SOAP Envelope
function wrapSoapSuccess(bodyContent) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
  <soapenv:Body>
    ${bodyContent}
  </soapenv:Body>
</soapenv:Envelope>`;
}

// Helper: Wrap error inside standard SOAP Fault
function wrapSoapFault(errorMessage) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
  <soapenv:Body>
    <soapenv:Fault>
      <faultcode>soapenv:Client</faultcode>
      <faultstring>${errorMessage}</faultstring>
    </soapenv:Fault>
  </soapenv:Body>
</soapenv:Envelope>`;
}

// Unified SOAP Endpoint
app.post('/soap', async (req, res) => {
  res.setHeader('Content-Type', 'text/xml');

  if (!req.body) {
    return res.status(400).send(wrapSoapFault('Empty request body'));
  }

  try {
    const parsedXml = await xml2js.parseStringPromise(req.body, { explicitArray: false, ignoreAttrs: true });
    const soapBody = parsedXml['soapenv:Envelope'] ? parsedXml['soapenv:Envelope']['soapenv:Body'] : parsedXml['Envelope']['Body'];

    // Handle GetStudent Request
    if (soapBody.GetStudentRequest) {
      const regNo = parseInt(soapBody.GetStudentRequest.regNo);
      const student = students.find(s => s.regNo === regNo);

      if (!student) {
        return res.status(404).send(wrapSoapFault('doesnt exist'));
      }

      const responseXml = `
        <GetStudentResponse>
          <regNo>${student.regNo}</regNo>
          <name>${student.name}</name>
          <course>${student.course}</course>
          <duration>${student.duration}</duration>
        </GetStudentResponse>`;
      return res.status(200).send(wrapSoapSuccess(responseXml));
    }

    // Handle GetMusic Request
    if (soapBody.GetMusicRequest) {
      const id = parseInt(soapBody.GetMusicRequest.id);
      const song = music.find(m => m.id === id);

      if (!song) {
        return res.status(404).send(wrapSoapFault('doesnt exist'));
      }

      const responseXml = `
        <GetMusicResponse>
          <id>${song.id}</id>
          <name>${song.name}</name>
          <artist>${song.artist}</artist>
          <genre>${song.genre}</genre>
          <duration>${song.duration}</duration>
        </GetMusicResponse>`;
      return res.status(200).send(wrapSoapSuccess(responseXml));
    }

    return res.status(400).send(wrapSoapFault('Unknown SOAP Action'));
  } catch (err) {
    return res.status(500).send(wrapSoapFault('Invalid XML payload'));
  }
});

app.listen(PORT, () => {
  console.log(`SOAP API endpoint running at http://localhost:${PORT}/soap`);
});