
import uvicorn          
from fastapi import FastAPI         
from fastapi.middleware.cors import CORSMiddleware  

# ============================

from seed import seed_db
from api_router import check,products,chat,trends

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
#  Database  helpers
# ======================
@app.on_event("startup")
def startup():
    seed_db()


    

# ======================
#  API Router
# ======================

app.include_router(check.router)
app.include_router(products.router)
app.include_router(chat.router)
app.include_router(trends.router)



# ======================
# Main
# ======================

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)


