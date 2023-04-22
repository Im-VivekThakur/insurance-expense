from fastapi import Depends, APIRouter, HTTPException, status
from routes.schema import ModelGenerateParams
import pickle
import pandas as pd
import os

loaded_model = pickle.load(
    open(os.path.dirname(__file__)+"/finalized_model.sav", 'rb'))

router = APIRouter(tags=["Medical Expense"], prefix="/expense")


@router.post('/generate', status_code=201)
def predict(data: ModelGenerateParams):
    try:
        BMI = data.weight / (data.height*data.height)
        user_input = {
            'age': [data.age],
            'sex_code': [1 if data.gender == True else 0],
            'bmi': [BMI],
            'children': [data.children],
            'smoker_code': [1 if data.gender == True else 0],
            'region_northeast': [data.region[0]],
            'region_northwest': [data.region[1]],
            'region_southeast': [data.region[2]],
            'region_southwest': [data.region[3]]
        }
        input = pd.DataFrame(user_input)
        predict = loaded_model.predict(input)

        return {
            "expense": round(predict[0], 2)
        }

    except:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
