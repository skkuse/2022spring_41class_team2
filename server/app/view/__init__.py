from .test_view import create_test_endpoints
from .user_view import create_login_endpoints
from .lecture_view import create_code_endpoints
from .qa_view import create_qa_endpoints
from .comment_view import create_comment_endpoints

__all__ = [
    'create_code_endpoints',
    'create_login_endpoints',
    'create_qa_endpoints',
    'create_comment_endpoints',
    'create_test_endpoints'
]