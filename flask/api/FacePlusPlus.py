import requests
import urllib.parse
import os


class Analyze:
    """Face++APIにようる画像解析用のクラス
    """

    def __init__(self) -> None:
        """フィールドの初期化
        """
        self.api_key = os.getenv('BEAUTY_API_KEY')
        self.api_secret = urllib.parse.quote(os.getenv('BEAUTY_SECRET_KEY'))

    def analyze(self, return_attributes: list, files) -> dict:
        """顔面の美しさを取得する

        Args:
            image_file (werkzeug.datastructures.file_pathtorage):
                flask.request.file_path['file_name']の返り血

        Returns:
            dict:
                例：
                {
                    "beauty":{
                        "female_score": 84.286, 
                        "male_score": 84.42
                    }
                }
        """
        url = "https://api-us.faceplusplus.com/facepp/v3/detect"
        data = {'api_key': self.api_key,
                'api_secret': self.api_secret,
                'return_attributes': ",".join(return_attributes)}

        response = self.__request_api(url, data, files)

        if 'error_message' in response:
            return {'error_message': response["error_message"]}
        if response['face_num'] <= 0:
            return {'error_message': "Face could not be detected"}
        if response['face_num'] > 1:
            return {'error_message': "Multiple face are detected"}

        return response['faces']

    def __request_api(self, url: str, data: dict, files: dict) -> dict:
        """Face++APIにPOSTリクエストを送る

        Args:
            url (str): リクエスト先URL
            data (dict): str型のデータ
            files (dict): 画像データ
                例:
                { param_name: (file_name, binary_data, mimetype) }

        Returns:
            dict: APIレスポンスをdict型で返す
                例:
                {
                "face_num": 1, 
                "faces": [
                    {
                    "attributes": {
                        "beauty": {
                        "female_score": 84.286, 
                        "male_score": 84.42
                        }
                    }, 
                    "face_rectangle": {
                        "height": 171, 
                        "left": 246, 
                        "top": 290, 
                        "width": 171
                    }, 
                    "face_token": "token"
                    }
                ], 
                "image_id": "image_id", 
                "request_id": "request_id", 
                "time_used": 176
                }
        """
        response = requests.post(url=url, data=data, files=files)
        return response.json()
