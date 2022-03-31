from .test_view import create_test_endpoints
from .user_view import create_login_endpoints
from .code_view import create_code_endpoints

__all__ = [
    'create_code_endpoints',
    'create_login_endpoints',
    'create_test_endpoints'
]