CREATE TABLE IF NOT EXISTS conversation_turns (
    id SERIAL PRIMARY KEY,
    session_id TEXT NOT NULL,
    character_file_version TEXT NOT NULL,
    prompting_version TEXT NOT NULL,
    model TEXT NOT NULL,
    messages JSONB NOT NULL,
    original_response TEXT NOT NULL,
    critique_response TEXT NOT NULL,
    refinement_response VARCHAR,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
)