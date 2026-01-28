from ast import Add
from pydantic import BaseModel

class Address(BaseModel):
    city: str
    state: str
    pin: int

class Patient(BaseModel):
    name: str
    gender: str
    age: int = 30
    address: Address #Nested model like we do using ref in node

address_dict = {'city':'Delhi','state':'Delhi','pin':2}
address1 = Address(**address_dict)

patient_dict = {'name':'Nitish','gender':'male','address':address1}
patient1 = Patient(**patient_dict)

# print(patient1)
# print(patient1.address.pin)

temp = patient1.model_dump()
#using model dump we can dump our model/schema into dictionary and then do what we can do with dict
temp1 = patient1.model_dump_json(include=['name','address'])#we also have exclude
#this will be treated as string in python
temp2 = patient1.model_dump_json(exclude={
    'gender': True,
    'address': {'city': True}
})#we also have exclude
#now city in address will be excluded
temp3 = patient1.model_dump_json(exclude_unset=True)
#now thos values which were not set in patient dict wont be dumped such as age here
print(temp)
print(type(temp))
print(temp1)
print(type(temp1))
print(temp2)
print(temp3)