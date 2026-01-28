from typing import Annotated, List, Dict, Optional
from pydantic import BaseModel, EmailStr, AnyUrl, Field, model_validator

class Patient(BaseModel):
    #by default all the fields are required
    name : Annotated[str, Field(max_length=50, description='Just an example', title='Name of patient', examples=['Nithish', 'Amit'])]
    #this way we can also add meta data to our fields by using Annotated and Field
    age : int = Field(gt=0)
    wt: float = Field(gt=0, strict=True)#now it must be greater than 0
    #strict makes it srtictly float if u pass '1.5' it wont accept anymore
    married: bool = False #default
    linkedIn_url: Optional[AnyUrl] = None
    #it is necessary to give none to optional otherwise an error is thrown
    allergies: Optional[List[str]] = Field(max_length=5, default=None) #now this is optional to give
    contact_details: Dict[str, str]
    email: EmailStr
    
    @model_validator(mode='after')#here we have to always provide mode
    def validate_emergency_contact(cls, model):
        if model.age>60 and 'emergency' not in model.contact_details:
            raise ValueError('Patients older than 60 must have an emergency contact.')
        return model

def insert_patient(patient: Patient):
    print(patient)
    print('Inserted')

patient_info = {'name':'nitish',
                'age':61,
                'wt':75.2,
                'allergies':['pollen','dust'],
                'contact_details':{'Phone no.':'123456','emergency':'4569'},
                'email':'abe@icici.com',
                'linkedIn_url':'http://linkedin.com'
}

patient1 = Patient(**patient_info)

insert_patient(patient1)