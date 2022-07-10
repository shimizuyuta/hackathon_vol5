<<<<<<< HEAD
# import cv2
# from deepface import DeepFace
# ユタ


class Character:
    pass
    # def analysis(self):
    #     img = cv2.imread('flask/image.jpg')
    #     # plt.imshow(img[:, :, ::-1])

    #     # plt.show()

    #     result = DeepFace.analyze(img, actions=['emotion'])

    #     self.emotion = result['dominant_emotion']

    #     self.__judge()

    #     return self.character

    # def __judge(self):
    #     if self.emotion == "angry":
    #         self.character = "怒りっぽい"
    #     elif self.emotion == "disgust":
    #         self.character = "神経質"
    #     elif self.emotion == "fear":
    #         self.character = "心配性"
    #     elif self.emotion == "happy":
    #         self.character = "陽気"
    #     elif self.emotion == "sad":
    #         self.character = "悲観的"
    #     elif self.emotion == "surprise":
    #         self.character = "繊細"
    #     elif self.emotion == "neutral":
    #         self.character = "何か秘めたものを感じる"
    #     else:
    #         self.character = {"error_message": "Unknown Error."}
    #     return self

    # cc = Character()
    # cc.analysis(===image_file_path===)
=======
from api.FacePlusPlus import Analyze as FA


class Character:
    def analyze(self, image_file):
        fa = FA()
        face_data = fa.analyze(["emotion"], image_file)
        if "error_message" in face_data:
            return face_data

        d = face_data[0]["attributes"]["emotion"]
        self.emotion = max(d, key=d.get)
        self.__judge()

        if "error_message" in self.character:
            return self.character

        return {"emotion": self.character}

    def __judge(self):
        if self.emotion == "anger":
            self.character = "怒りっぽい"
        elif self.emotion == "disgust":
            self.character = "神経質"
        elif self.emotion == "fear":
            self.character = "心配性"
        elif self.emotion == "happiness":
            self.character = "陽気"
        elif self.emotion == "sadness":
            self.character = "悲観的"
        elif self.emotion == "surprise":
            self.character = "繊細"
        elif self.emotion == "neutral":
            self.character = "何か秘めたものを感じる"
        else:
            self.character = {"error_message": "Unknown Error."}
>>>>>>> main
