import face_recognition
import os
from pycaret.regression import load_model,predict_model
import pandas as pd
from api.FacePlusPlus import Analyze as FA


class BMI:
    def __init__(self):
        print(os.getcwd())
        self.weight_model = load_model("./flask/api/models/model_weight")
        self.bmi_model = load_model("./flask/api/models/model_bmi")

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

        df_face = pd.DataFrame([face_encoding])
        df_prop = pd.DataFrame([[age, female, male]], columns=["old", "female", "male"])
        df = pd.concat([df_prop, df_face], axis="columns")

        weight = predict_model(self.weight_model, data=df)["Label"][0]
        bmi = predict_model(self.bmi_model, data=df)["Label"][0]
        height = (weight / bmi) ** 0.5 * 100
        print(f"height:{height:1}, weight:{weight:1}, bmi:{bmi:1}")

        return {"height": height, "weight": weight}

    def __get_face_encoding(self, image_path):
        picture_of_me = face_recognition.load_image_file(image_path)
        my_face_encoding = face_recognition.face_encodings(picture_of_me)
        if not my_face_encoding:
            print(f"No face found in {image_path}")
            return False, None
        return True, my_face_encoding[0].tolist()
