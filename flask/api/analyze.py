from api.FacePlusPlus import Analyze as FA
from api.bmi import BMI
from api.character import Character as CC
from concurrent.futures import ThreadPoolExecutor


class Analyze:
    """画像を解析してデータを取得
    """

    def __init__(self, image_file) -> None:
        """フィールドの初期化

        Args:
            image_file (werkzeug.datastructures.FileStorage):
                flask.request.files['file_name']の返り血
        """
        # エラーメッセージ
        self.error_messages = {}
        # レスポンスデータ
        self.res = {}
        self.image_file = image_file

    def analyze(self):
        """データの解析
        Returns:
            dict:
            {
                beauty:{
                    …
                },
                bmi:{
                    …
                },
                character:{
                    …
                }
            }
        """

        # スレッドでそれぞれの関数を処理
        executor = ThreadPoolExecutor(max_workers=3)

        executor.submit(self.__beauty_analyze())
        executor.submit(self.__bmi_analyze())
        executor.submit(self.__character_analyze())

        executor.shutdown()

        # エラーメッセージが一つでもあれば， error_messages　を返す
        if len(self.error_messages) > 0:
            return {"error_messages": self.error_messages}
        else:
            return self.res

    def __beauty_analyze(self):
        """顔面偏差値の取得
        """
        fa = FA()
        face_data = fa.analyze(['beauty','emotion','gender','age'], self.image_file)
        if "error_message" in face_data:
            self.error_messages.update({"beauty":face_data['error_message']})
        else:
            face_data_ = face_data[0]['attributes']
            age = face_data_['age']['value']
            self.res.update({'age': age})
            if age == 'Male':
                self.res.update({'beauty': face_data_['beauty']['male_score']})
            else:
                self.res.update({'beauty': face_data_['beauty']['female_score']})
            self.res.update({'gender': face_data_['gender']['value']})

    def __bmi_analyze(self):
        bmi = BMI()
        bmi_data = bmi.predict(self.image_file)
        if "error_message" in bmi_data:
            self.error_messages.update(
                {'bmi': bmi_data['error_message']})
        else:
            self.res.update({"bmi": bmi_data})

    def __character_analyze(self):
        cc = CC()
        character_data = cc.analyze(self.image_file)
        if "error_message" in character_data:
            self.error_messages.update(
                {'character': character_data['error_message']})
        else:
            return self.res.update(character_data)
