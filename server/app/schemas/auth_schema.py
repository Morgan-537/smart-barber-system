import re


class AuthSchema:
    """
    Validation rules for authentication requests.
    """

    @staticmethod
    def validate_registration(data):

        required_fields = [
            "full_name",
            "email",
            "phone",
            "password"
        ]

        for field in required_fields:
            if not data.get(field):
                return False, f"{field} is required."

        # Full name
        if len(data["full_name"].strip()) < 3:
            return False, "Full name must contain at least 3 characters."

        # Email
        email_regex = r"^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"

        if not re.match(email_regex, data["email"]):
            return False, "Invalid email address."

        # Phone
        phone_regex = r"^[0-9]{10,15}$"

        if not re.match(phone_regex, data["phone"]):
            return False, "Phone number must contain 10–15 digits."

        # Password
        password = data["password"]

        if len(password) < 8:
            return False, "Password must be at least 8 characters."

        if not re.search(r"[A-Z]", password):
            return False, "Password must contain one uppercase letter."

        if not re.search(r"[a-z]", password):
            return False, "Password must contain one lowercase letter."

        if not re.search(r"[0-9]", password):
            return False, "Password must contain one number."

        return True, None

    @staticmethod
    def validate_login(data):

        required_fields = [
            "email",
            "password"
        ]

        for field in required_fields:
            if not data.get(field):
                return False, f"{field} is required."

        return True, None