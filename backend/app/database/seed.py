import os
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.features.user.models import User, UserRole
from app.features.auth.repository import get_user_by_username
from app.utils.security import hash_password

def seed_initial_sysadmin():
    db: Session = SessionLocal()

    username = os.getenv("SYSADMIN_USERNAME", "sysadmin")
    password = os.getenv("SYSADMIN_PASSWORD", "admin123")
    fullname = os.getenv("SYSADMIN_FULLNAME", "Super Admin")

    existing = get_user_by_username(db, username)
    if not existing:
        sysadmin = User(
            username=username,
            fullname=fullname,
            password=hash_password(password),
            role=UserRole.sysadmin
        )
        db.add(sysadmin)
        db.commit()
        print(f"[SEED] Created sysadmin user: {username}")
    else:
        print(f"[SEED] Sysadmin '{username}' already exists")

    db.close()
