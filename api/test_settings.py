import os
from unittest.mock import patch


@patch('dotenv.load_dotenv')
def test_default_inference_service(mock_load_dotenv):
    with patch.dict(os.environ, {}, clear=True):
        import importlib
        import settings
        importlib.reload(settings)
        assert settings.INFERENCE_SERVICE == 'anthropic'


def test_deepseek_inference_service():
    with patch.dict(os.environ, {
        'INFERENCE_SERVICE': 'deepseek',
        'API_KEY': 'test-key',
    }, clear=True):
        import importlib
        import settings
        importlib.reload(settings)
        assert settings.INFERENCE_SERVICE == 'deepseek'
        assert settings.MODEL == 'deepseek-v4-flash'
        assert settings.DEEPSEEK_API_BASE == 'https://api.deepseek.com'


def test_groq_inference_service():
    with patch.dict(os.environ, {
        'INFERENCE_SERVICE': 'groq',
        'API_KEY': 'test-key',
    }, clear=True):
        import importlib
        import settings
        importlib.reload(settings)
        assert settings.INFERENCE_SERVICE == 'groq'
        assert settings.GROQ_API_BASE == 'https://api.groq.com/openai/v1'


@patch('dotenv.load_dotenv')
def test_max_tokens_default(mock_load_dotenv):
    with patch.dict(os.environ, {}, clear=True):
        import importlib
        import settings
        importlib.reload(settings)
        assert settings.MAX_TOKENS == 512


def test_custom_max_tokens():
    with patch.dict(os.environ, {
        'MAX_TOKENS': '1024',
        'API_KEY': 'test',
    }, clear=True):
        import importlib
        import settings
        importlib.reload(settings)
        assert settings.MAX_TOKENS == 1024
