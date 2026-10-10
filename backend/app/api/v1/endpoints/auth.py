from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.core.database import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserRead
# from app.schemas.auth import ChangePasswordRequest, LoginRequest, Token
from app.schemas.auth import ChangePasswordRequest, LoginRequest, RefreshRequest, TokenPair
from app.core.security import create_access_token, create_refresh_token, decode_token
from app.services.user import (
    authenticate,
    change_password,
    create_user,
    get_user_by_email,
    get_user_by_id
)
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


@router.post("/login", response_model=TokenPair)
def login(
    data: LoginRequest,
    db: Annotated[Session, Depends(get_db)],
) -> TokenPair:
    user = authenticate(db, data.email, data.password)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return TokenPair(
        access_token=create_access_token(user.id),
        refresh_token=create_refresh_token(user.id),
    )

@router.post("/refresh", response_model=TokenPair)
def refresh_token(
    data: RefreshRequest,
    db: Annotated[Session, Depends(get_db)],
) -> TokenPair:
    subject = decode_token(data.refresh_token, "refresh")
    if subject is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired refresh token",
        )
    user = get_user_by_id(db, int(subject))
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
        )
    return TokenPair(
        access_token=create_access_token(user.id),
        refresh_token=create_refresh_token(user.id),
    )

@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
def logout(
    current_user: Annotated[User, Depends(get_current_user)],
) -> None:
    return None

@router.get("/me", response_model=UserRead)
def get_me(
    current_user: Annotated[User, Depends(get_current_user)],
) -> User:
    return current_user

@router.post("/change-password", status_code=status.HTTP_204_NO_CONTENT)
def change_user_password(
    data: ChangePasswordRequest,
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[Session, Depends(get_db)],
) -> None:
    success = change_password(
        db,
        current_user,
        data.current_password,
        data.new_password,
    )
    if not success:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Current password is incorrect",
        )