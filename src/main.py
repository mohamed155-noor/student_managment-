from flask import Flask, jsonify
import json

app = Flask(__name__)

@app.route('/api/genres', methods=['GET'])
def get_data():
    with open(r'src\rest_server.js','r') as file:
        data= json.load(file)
    return jsonify(data), 200

if __name__ == '__main__':
    app.run(port=3000, debug=True)