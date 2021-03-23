from flask import Flask, send_from_directory, request
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS #comment this on deployment
from tensorflow import keras
import numpy as np

app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app) #comment this on deployment
api = Api(app)

model = keras.models.load_model('./saved_model')

@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder,'index.html')

def load_model():
    global model

    print("Model loaded sucesfully")

@app.route('/predict', methods=['POST'])
def get_prediction():
    print("CALLED RE")
    passed_req = request.get_json()
    passed_num = np.array([int(passed_req.get('number'))])
    print(passed_num)
    res = model.predict(passed_num)[0][0]
    res = str(np.where(res > 0.5, 1, 0))
    print(res)
    # # Works only for a single sample
    # if request.method == 'POST':
    #     data = request.get_json()  # Get data posted as a json
    #     data = np.array(data)[np.newaxis, :]  # converts shape from (4,) to (1, 4)
    #     prediction = model.predict(data)  # runs globally loaded model on the data
    # return str(prediction[0])
    return res

if __name__ == '__main__':
    print("STARTING FLASK...")
    load_model()  # load model at the beginning once only
    app.run(host='0.0.0.0', port=80)