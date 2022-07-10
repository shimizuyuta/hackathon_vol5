import face_recognition
import numpy as np
import joblib
from sklearn.linear_model import HuberRegressor
from api.FacePlusPlus import Analyze as FA


class BMI:
    def __init__(self):
        self.weight_model = joblib.load("./flask/api/models/weight_predictor_light.model")
        self.bmi_model = joblib.load("./flask/api/models/bmi_predictor_light.model")

    def predict(self, image_file):
        fa = FA()
        face_data = fa.analyze(['age', 'gender'], image_file)
        if "error_message" in face_data:
            return face_data

        age = int(face_data[0]["attributes"]["age"]["value"])
        gender = face_data[0]["attributes"]["gender"]["value"]
        female = 1 if gender == "Female" else 0
        male = 1 if gender == "Male" else 0

        ret, face_encoding = self.__get_face_encoding("./flask/image.jpg")
        if not ret:
            return {'error_message': "Could not find a face in the image."}

        data = [[age, female, male] + face_encoding]

        weight = np.exp(self.weight_model.predict(data)).item()
        bmi = np.exp(self.bmi_model.predict(data)).item()
        height = (weight / bmi) ** 0.5 * 100

        return {"height": height, "weight": weight}

    def __get_face_encoding(self, image_path):
        picture_of_me = face_recognition.load_image_file(image_path)
        my_face_encoding = face_recognition.face_encodings(picture_of_me)
        if not my_face_encoding:
            return False, None
        return True, my_face_encoding[0].tolist()
