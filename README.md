# Bike Racks API

API that uses a database that extends from the Brisbane Council Data set. 

### Endpoints:
- ```/racks?field=value```: Lists all the bike racks in the data base. Optional URL parameter for selection of specific rows. E.g. ```/racks?address=151 George Street``` returns the row with an address of 151 George Street.
- ```/search?where=comparison```: Lists all the bike racks in the data base which match the where clause. E.g. ```/search?where=address like "%QUT%"``` will show all records with "QUT" in the address. %'s must be url encoded as %25.

**TEXT IS CASE SENSITIVE. brisbane city is different to Brisbane City (for now)**