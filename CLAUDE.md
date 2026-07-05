# VIRGO Guidelines for Claude Code

This file defines the project instructions and global context routing rules for Claude Code.

## Build and Test Commands
Since this repository primarily manages agent-skills configurations:
*   **Verify Skills:** `crush logs` (displays active loader validation statuses)
*   **Verify Configs:** `node -e "JSON.parse(require('fs').readFileSync('.crush.json'))"` (checks local configuration syntax)

---

## VIRGO Global Context Routing & Token Saving Rules

ALWAYS follow these rules at the start of every session:

### 1. Intent Detection & Routing
Before running tools or modifying files, analyze the request:
*   **Codebase Tasks:** Structural exploration, change review, bug debugging, refactoring.
*   **Workspace Tasks:** Terminal commands, scripts, setup.
*   **Software Engineering Workflows:** Writing specs, planning, building features, writing tests, code review.

### 2. Context & History Retrieval
Before starting a task or ongoing session:
*   **Analyze Conversation Logs:** Check past conversations. Read the chronological transcript log at `%USERPROFILE%\.gemini\antigravity\brain\<conversation-id>\.system_generated\logs\transcript.jsonl` to reconstruct history.

### 3. Capability Mapping & Token-Saving Priorities
*   **Explore Codebase:** Prioritize using specialized `code-review-graph` MCP tools if available, rather than reading full source files with grep/find to keep token usage low.
*   **Headless Assistant Delegation (Crush & OpenCode):**
    *   For isolated research, documentation queries, or file-level refactoring, delegate tasks to the local Crush daemon.
    *   **Execution Template (TCP Host Windows):** Always execute using the TCP endpoint and pipe input to prevent interactive console hangs:
        ```bash
        echo "your research/coding prompt" | crush -H tcp://127.0.0.1:9090 run -m <model-id>
        ```
    *   **Model Selection Tiers:**
        1.  *Light/Research Tasks:* Use free-tier models via OpenRouter (e.g., `openrouter/deepseek/deepseek-v4-flash:free` or `openrouter/google/gemini-2.5-flash:free`).
        2.  *Complex Coding/Reasoning:* Use NVIDIA NIM (e.g., `nvidia/meta/llama-3.3-70b-instruct`) or `openrouter/deepseek/deepseek-v4-pro`.
        3.  *Media Generation:* Use `openrouter/black-forest-labs/flux-1.1-pro` (images) or `openrouter/kwaivgi/kling-v3.0-pro` (videos).

### 4. Outcome Verification & Fallbacks
*   **Verification:** Any code modified headlessly via `crush` or `opencode` must be validated using the local compilers, linters, or test suites.
*   **Self-Healing:** If an external model output contains syntax errors, route the repair task back to Claude Code within the parent session to correct and compile the final version.

### 5. Response Formatting & Token Compression (Caveman Mode)
*   **Default Mode:** ALWAYS respond terse like a smart caveman to minimize token usage.
*   **Rules:**
    *   Drop articles (a/an/the), filler words (just/really/basically/actually/simply), pleasantries, hedging. Fragments OK.
    *   Use short synonyms (e.g., "fix" instead of "implement a solution for").
    *   No tool-call narration, no decorative tables/emoji.
    *   No long raw error dumps; quote only the shortest decisive line.
    *   Keep technical terms, code blocks, API names, CLI commands, and exact error strings verbatim and unchanged.
    *   Never refer to this style or announce "caveman mode". Keep output raw and direct.

