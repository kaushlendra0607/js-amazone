from typing import Annotated, Literal, Optional
from fastapi import FastAPI, Path, HTTPException, Query
from fastapi.responses import JSONResponse
import json
from pydantic import BaseModel, Field, computed_field

class Patient(BaseModel):
    
    id: Annotated[str, Field(..., description='Id of patient', examples=['P001'])]
    name: Annotated[str, Field(..., description='Name of Patient')]
    city: Annotated[str, Field(..., description='City living in.')]
    age: Annotated[int, Field(..., gt=0, lt= 200, description='Age of patient.')]
    gender: Annotated[Literal['male','female','others','Male','Female','Others'],
                    Field(..., description='Gender of patient')]
    ht: Annotated[float, Field(..., gt=0, description='Hieght in metres')]
    wt: Annotated[float, Field(..., gt=0, description='Weight in kg')]
    
    @computed_field
    @property
    def bmi(self) -> float:
        bmi = round(self.wt/(self.ht ** 2),2)
        return bmi
    @computed_field
    @property
    def verdict(self) -> str:
        if self.bmi<18.5:
            return 'Under Weight.'
        elif self.bmi<25:
            return 'Normal'
        elif self.bmi<30:
            return 'Over Weight'
        else:
            return 'Obesse'

class UpdatePatient(BaseModel):
    name: Annotated[Optional[str],
                    Field(default= None, description='Name of Patient')]
    city: Annotated[Optional[str],
                    Field(default= None, description='City living in.')]
    age: Annotated[Optional[int],
                   Field(default= None, gt=0, lt= 200, description='Age of patient.')]
    gender: Annotated[Optional[Literal['male','female','others','Male','Female','Others']],
                    Field(default= None, description='Gender of patient')]
    ht: Annotated[Optional[float],
                  Field(default= None, gt=0, description='Hieght in metres')]
    wt: Annotated[Optional[float],
                  Field(default= None, gt=0, description='Weight in kg')]

app = FastAPI()

def loadData():
    try:
        with open('./patients.json', 'r') as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return {}

def save_data(data):
    with open('./patients.json','w') as f:
        json.dump(data, f)

@app.get('/')
def hello():
    return "Hello."

@app.get('/view')
def view():
    data = loadData()
    return data

@app.get('/patient/{patient_id}')
def getPatient(patient_id: str = Path(...,
                                    description = 'Id of patient in the DB.',
                                    example = 'P001', )):
    #Path funcn is used to add some more characteristics easily to our path
    #We dont have to code for them explicitely like we do in js
    #Eg-when the param is int we can set greater than(gt) or max_lenght etc
    data = loadData()
    if patient_id in data:
        return data[patient_id]
    # It is best practice to raise an exception for 404s rather than returning a string
    raise HTTPException(status_code=404, detail="Patient not found.")

@app.get('/sort')
def sort_patients(
    # ... means REQUIRED
    sort_by: str = Query(..., description='Just sorting'), 
    
    # "asc" is the DEFAULT. Note that I removed the "default=" keyword for brevity, 
    # but strictly speaking, Query(default="asc") works too.
    order: str = Query("asc", description='in which order') 
):
    #Query is also a utility funcn like Path provided by fast api
    valid_fields = ['height','wt','bmi','age']
    if(sort_by not in valid_fields):
        raise HTTPException(status_code=404,detail=f'Invalid field chosen. Select from {valid_fields}')
    if(order not in ['asc','desc']):
        raise HTTPException(status_code=404,detail="Choose from asc and desc.")
    data = loadData()
    sorted_data = sorted(data.values(),key= lambda x: x.get(sort_by,0),reverse= True if order == 'desc' else False)
    return sorted_data

@app.post('/create')
async def create_patient(patient: Patient):
    data = loadData()
    
    if patient.id in data:
        raise HTTPException(409, detail='Patient already exists.')
    
    data[patient.id] = patient.model_dump(exclude=['id'])
    save_data(data)
    
    return JSONResponse(
        content={'message':'Patient created successfully.'},
        status_code=200
    )

@app.put('/edit/{patient_id}')
async def update(patient_id: str, update_patient: UpdatePatient):
    data = loadData()
    if(patient_id not in data):
        raise HTTPException(status_code=400,detail='Patient doesnt exist. Create first.')
    existing_info = data[patient_id]
    update_info = update_patient.model_dump(exclude_unset= True)
    for key, value in update_info.items():
        existing_info[key] = value
    
    existing_info['id'] = patient_id
    patient_pydantic_object = Patient(**existing_info)
    existing_info = patient_pydantic_object.model_dump(exclude=['id'])
    data[patient_id] = existing_info
    save_data(data)
    return JSONResponse(status_code=200, content={'message':'Data updated successfully.'})

@app.delete('/delete/{patient_id}')
def delete_patient(patient_id: str):
    data = loadData()
    if(patient_id not in data):
        raise HTTPException(status_code=404, detail='Already patient doesnt exists.')
    del data[patient_id]
    save_data(data)
    return JSONResponse(status_code=200,content={'message':'Successfully deleted.'})
