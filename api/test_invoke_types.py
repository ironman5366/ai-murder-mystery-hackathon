from invoke_types import LLMMessage, Actor, InvocationRequest, InvocationResponse
import json


def test_llm_message_creation():
    msg = LLMMessage(role="user", content="Hello")
    assert msg.role == "user"
    assert msg.content == "Hello"


def test_llm_message_serialization():
    msg = LLMMessage(role="assistant", content="Hi there")
    data = msg.model_dump()
    assert data == {"role": "assistant", "content": "Hi there"}


def test_actor_creation():
    actor = Actor(
        name="Test",
        bio="A test character",
        personality="Friendly",
        context="Test context",
        secret="Test secret",
        violation="Principle 1",
        messages=[LLMMessage(role="user", content="Hello")],
    )
    assert actor.name == "Test"
    assert len(actor.messages) == 1


def test_invocation_request():
    actor = Actor(
        name="Test",
        bio="",
        personality="",
        context="",
        secret="",
        violation="",
        messages=[],
    )
    req = InvocationRequest(
        global_story="Story",
        actor=actor,
        session_id="session-123",
        character_file_version="v1",
    )
    assert req.global_story == "Story"
    assert req.session_id == "session-123"


def test_invocation_response():
    resp = InvocationResponse(
        original_response="Original",
        critique_response="Critique",
        problems_detected=True,
        final_response="Final",
        refined_response="Refined",
    )
    data = resp.model_dump()
    assert data["original_response"] == "Original"
    assert data["problems_detected"] is True
    assert data["refined_response"] == "Refined"


def test_invocation_response_optional_refined():
    resp = InvocationResponse(
        original_response="Original",
        critique_response="Critique",
        problems_detected=False,
        final_response="Final",
        refined_response=None,
    )
    assert resp.refined_response is None
