from ast import Add
from pydantic import BaseModel

class Address(BaseModel):
    city: str
    state: str
    pin: int

class Patient(BaseModel):
    name: str
    gender: str
    age: int
    address: Address #Nested model like we do using ref in node

address_dict = {'city':'Delhi','state':'Delhi','pin':2}
address1 = Address(**address_dict)

patient_dict = {'name':'Nitish','gender':'male','age':30,'address':address1}
patient1 = Patient(**patient_dict)

print(patient1)
print(patient1.address.pin)