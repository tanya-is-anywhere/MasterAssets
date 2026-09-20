from app.core.database import SessionLocal
from app.schemas.user import UserCreate
from app.services.user import authenticate, create_user, get_user_by_email

db = SessionLocal()
try:
    # Удалим пользователя с таким email, если он есть (для повторного запуска)
    existing = get_user_by_email(db, "test@example.com")
    if existing:
        db.delete(existing)
        db.commit()

    # Создаём
    data = UserCreate(email="test@example.com", name="Test", password="secret123")
    user = create_user(db, data)
    print("Created user:", user.id, user.email, user.name)
    print("Hashed password starts with:", user.hashed_password[:30])

    # Найти по email
    found = get_user_by_email(db, "test@example.com")
    print("Found by email:", found.email if found else None)

    # Аутентификация
    auth_ok = authenticate(db, "test@example.com", "secret123")
    print("Authenticate correct password:", auth_ok is not None)

    auth_bad = authenticate(db, "test@example.com", "wrong")
    print("Authenticate wrong password:", auth_bad is not None)

    auth_missing = authenticate(db, "nobody@example.com", "whatever")
    print("Authenticate unknown email:", auth_missing is not None)
finally:
    db.close()