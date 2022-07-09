import cv2
import DeepFace
import plt
# ユタ


class Character:
    def analysis(self, img_file):
        img = cv2.imread(img_file)

        plt.imshow(img[:, :, ::-1])

        plt.show()

        result = DeepFace.analyze(img, actions=['emotion'])

        self.emotion = result['dominant_emotion']

        self.judge()

        return self.character

    def judge(self):
        if self.emotion == "angry":
            self.character = "怒りっぽい"
        elif self.emotion == "disgust":
            self.character = "神経質"
        elif self.emotion == "fear":
            self.character = "心配性"
        elif self.emotion == "happy":
            self.character = "陽気"
        elif self.emotion == "sad":
            self.character = "悲観的"
        elif self.emotion == "surprise":
            self.character = "繊細"
        elif self.emotion == "neutral":
            self.character = "何か秘めたものを感じる"
        else:
            self.character = "error"
        return self

# cc = Character()
# cc.analysis(===image_file_path===)
