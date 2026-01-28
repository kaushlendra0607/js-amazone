from fastapi import FastAPI, Path, HTTPException, Query
import json

app = FastAPI()

def loadData():
    with open('./patients.json','r') as f:
        data = json.load(f)
    return data

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