
import uvicorn          
from fastapi import FastAPI         
from fastapi.middleware.cors import CORSMiddleware  

# ============================


from api_router import check

# ============================

app = FastAPI()



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # all origins for testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)




    

# ======================
#  API Router
# ======================

app.include_router(check.router)




# ======================
# Main
# ======================

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)


