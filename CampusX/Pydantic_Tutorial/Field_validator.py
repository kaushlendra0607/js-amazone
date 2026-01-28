from typing import Annotated, List, Dict, Optional
from pydantic import BaseModel, EmailStr, AnyUrl, Field, field_validator

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
    
    #field validator is used to validate some additional logic on a data field
    @field_validator('email')#do gpt for more info
    @classmethod
    def email_validator(cls, value):
        valid_domains = ['hdfc.com', 'icici.com']
        domain_name = value.split('@')[-1]
        if domain_name not in valid_domains:
            raise ValueError('invalid domain.')
        return value
    @field_validator('name')
    @classmethod
    def name_transform(cls, value):
        return value.upper()
    @field_validator('age',mode='before')
    @classmethod
    #in before mode the value recieved is before type coersion or conversion
    #after is default mode
    def limit_age(cls, value):
        if 0<value<=120:
            return value
        else:
            raise ValueError('Age not in limits.')

def insert_patient(patient: Patient):
    print(patient)
    print('Inserted')

patient_info = {'name':'nitish',
                'age':30,
                'wt':75.2,
                'allergies':['pollen','dust'],
                'contact_details':{'Phone no.':'123456'},
                'email':'abe@icici.com',
                'linkedIn_url':'http://linkedin.com'
}

patient1 = Patient(**patient_info)

insert_patient(patient1)