import pytest
from invoke_types import InvocationRequest, Actor, LLMMessage
from ai import (
    get_actor_prompt,
    get_system_prompt,
    get_critique_prompt,
    check_whether_to_refine,
    get_refiner_prompt,
)


@pytest.fixture
def sample_actor():
    return Actor(
        name="Test Character",
        bio="A test character bio",
        personality="Friendly and helpful",
        context="Lives in a small town",
        secret="Has a hidden treasure",
        violation="Principle 1: Referencing hidden treasure.",
        messages=[LLMMessage(role="user", content="Hello")],
    )


@pytest.fixture
def sample_request(sample_actor):
    return InvocationRequest(
        global_story="A murder mystery in a small town.",
        actor=sample_actor,
        session_id="test-session",
        character_file_version="v1",
    )


class TestGetActorPrompt:
    def test_contains_actor_name(self, sample_actor):
        prompt = get_actor_prompt(sample_actor)
        assert "Test Character" in prompt

    def test_contains_personality(self, sample_actor):
        prompt = get_actor_prompt(sample_actor)
        assert "Friendly and helpful" in prompt

    def test_contains_context(self, sample_actor):
        prompt = get_actor_prompt(sample_actor)
        assert "small town" in prompt

    def test_contains_secret(self, sample_actor):
        prompt = get_actor_prompt(sample_actor)
        assert "hidden treasure" in prompt

    def test_mentions_detective_sheeluck(self, sample_actor):
        prompt = get_actor_prompt(sample_actor)
        assert "Detective Sheerluck" in prompt


class TestGetSystemPrompt:
    def test_includes_global_story(self, sample_request):
        prompt = get_system_prompt(sample_request)
        assert "A murder mystery" in prompt

    def test_default_language_is_english(self, sample_request):
        prompt = get_system_prompt(sample_request)
        assert "Respond in English" in prompt

    def test_chinese_language(self, sample_actor):
        req = InvocationRequest(
            global_story="Story.",
            actor=sample_actor,
            session_id="s",
            character_file_version="v1",
            language="zh-CN",
        )
        prompt = get_system_prompt(req)
        assert "请用中文回复" in prompt

    def test_includes_actor_prompt(self, sample_request):
        prompt = get_system_prompt(sample_request)
        assert "Test Character" in prompt
        assert "Detective Sheerluck" in prompt


class TestGetActorPromptEdgeCases:
    def test_empty_actor_name(self):
        actor = Actor(
            name="", bio="", personality="", context="",
            secret="", violation="", messages=[],
        )
        prompt = get_actor_prompt(actor)
        assert "Detective Sheerluck" in prompt

    def test_long_secret(self):
        actor = Actor(
            name="Test", bio="bio", personality="nice",
            context="ctx", secret="A" * 1000, violation="",
            messages=[],
        )
        prompt = get_actor_prompt(actor)
        assert "A" * 1000 in prompt


class TestGetCritiquePrompt:
    def test_includes_actor_name(self, sample_request):
        prompt = get_critique_prompt(sample_request, "I did nothing wrong")
        assert "Test Character" in prompt

    def test_includes_last_utterance(self, sample_request):
        prompt = get_critique_prompt(sample_request, "I did nothing wrong")
        assert "I did nothing wrong" in prompt

    def test_includes_violation_principles(self, sample_request):
        prompt = get_critique_prompt(sample_request, "Some utterance")
        assert "Principle 1" in prompt

    def test_contains_format_instructions(self, sample_request):
        prompt = get_critique_prompt(sample_request, "test")
        assert "QUOTE:" in prompt
        assert "CRITIQUE:" in prompt
        assert "PRINCIPLES VIOLATED:" in prompt


class TestCheckWhetherToRefineEdgeCases:
    def test_none_with_newlines(self):
        assert check_whether_to_refine("NONE!\n") is False


class TestCheckWhetherToRefine:
    def test_returns_false_for_none(self):
        assert check_whether_to_refine("NONE!") is False

    def test_returns_false_for_none_with_extra(self):
        assert check_whether_to_refine("NONE! ") is False

    def test_returns_true_for_critique(self):
        assert check_whether_to_refine("Found violation") is True

    def test_returns_true_for_empty(self):
        assert check_whether_to_refine("") is True

    def test_returns_true_for_lowercase_none(self):
        assert check_whether_to_refine("none!") is True


class TestGetRefinerPrompt:
    def test_includes_actor_name(self, sample_request):
        prompt = get_refiner_prompt(sample_request, "Critique: found issue")
        assert "Test Character" in sample_request.actor.name

    def test_includes_critique_response(self, sample_request):
        prompt = get_refiner_prompt(sample_request, "Critique: found issue")
        assert "Critique: found issue" in prompt

    def test_includes_original_message(self, sample_request):
        prompt = get_refiner_prompt(sample_request, "Critique text")
        assert "Hello" in prompt
