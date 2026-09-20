from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.core.database import get_db
from app.core.security import create_access_token
from app.models.user import User
from app.schemas.auth import LoginRequest, Token
from app.schemas.user import UserCreate, UserRead
from app.services.user import authenticate, create_user, get_user_by_email

router = APIRouter()


@router.post(
    "/register",
    response_model=UserRead,
    status_code=status.HTTP_201_CREATED,
)
def register(
    data: UserCreate,
    db: Annotated[Session, Depends(get_db)],
) -> User:
    existing = get_user_by_email(db, data.email)
    if existing is not None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="User with this email already exists",
        )
    return create_user(db, data)


@router.post("/login", response_model=Token)
def login(
    data: LoginRequest,
    db: Annotated[Session, Depends(get_db)],
) -> Token:
    user = authenticate(db, data.email, data.password)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    token = create_access_token(user.id)
    return Token(access_token=token)


@router.get("/me", response_model=UserRead)
def get_me(
    current_user: Annotated[User, Depends(get_current_user)],
) -> User:
    return current_user
