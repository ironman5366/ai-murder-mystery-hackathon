CREATE TABLE IF NOT EXISTS "public".conversation_turns (
    id SERIAL PRIMARY KEY,

    -- The UUID that we stick in browser local storage
    session_id TEXT NOT NULL,
    character_file_version TEXT NOT NULL,
    model TEXT NOT NULL,

    -- A string of model::max_tokens::prompt_version. Basically will change whenever something meaningful about
    -- AI invocations changes
    model_key TEXT NOT NULL,
    actor_name TEXT NOT NULL,
    chat_messages JSONB NOT NULL,

    -- These start as null and are set as the conversation finishes
    finished_at TIMESTAMP WITH TIME ZONE,
    original_response TEXT,
    critique_response TEXT,
    problems_detected BOOLEAN,
    final_response TEXT,
    refined_response VARCHAR,

    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS "public".ai_invocations (
    id SERIAL PRIMARY KEY,

    -- Which conversation does this reference?
    conversation_turn_id INTEGER NOT NULL REFERENCES conversation_turns(id) ON DELETE CASCADE,

    model TEXT NOT NULL,

    -- A string of model::max_tokens::prompt_version. Basically will change whenever something meaningful about
    -- AI invocations changes
    model_key TEXT NOT NULL,

    prompt_messages JSONB NOT NULL,
    system_prompt TEXT NOT NULL,

    -- One of "initial", "critique", "refine"
    prompt_role VARCHAR NOT NULL,

    input_tokens INTEGER NOT NULL,
    output_tokens INTEGER NOT NULL,
    total_tokens INTEGER NOT NULL,

    response TEXT NOT NULL,
    started_at TIMESTAMP WITH TIME ZONE NOT NULL,
    finished_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

