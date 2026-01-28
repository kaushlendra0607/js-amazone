from typing import Annotated, List, Dict, Optional
from pydantic import BaseModel, EmailStr, AnyUrl, Field, computed_field

class Patient(BaseModel):
    #by default all the fields are required
    name : Annotated[str, Field(max_length=50, description='Just an example', title='Name of patient', examples=['Nithish', 'Amit'])]
    #this way we can also add meta data to our fields by using Annotated and Field
    age : int = Field(gt=0)
    ht: float = Field(gt=0)
    wt: float = Field(gt=0, strict=True)#now it must be greater than 0
    #strict makes it srtictly float if u pass '1.5' it wont accept anymore
    married: bool = False #default
    linkedIn_url: Optional[AnyUrl] = None
    #it is necessary to give none to optional otherwise an error is thrown
    allergies: Optional[List[str]] = Field(max_length=5, default=None) #now this is optional to give
    contact_details: Dict[str, str]
    email: EmailStr

    @computed_field()
    @property
    def bmi(self) -> float:#we are telling that output will be float
        #we get an instance of our class which is named 'self' here
        #imp -> the name of the funcn becomes name of the field which is bmi here
        bmi = round(self.wt / (self.ht ** 2),2)
        return bmi

def insert_patient(patient: Patient):
    print(patient)
    print('Inserted')

patient_info = {'name':'nitish',
                'age':30,
                'wt':80,
                'allergies':['pollen','dust'],
                'contact_details':{'Phone no.':'123456'},
                'email':'abe@icici.com',
                'linkedIn_url':'http://linkedin.com',
                'ht':2
}

patient1 = Patient(**patient_info)

insert_patient(patient1)