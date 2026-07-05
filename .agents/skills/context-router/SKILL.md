---
name: context-router
description: Analyze user requests to determine intent, context, and requirements. Automatically select and delegate to the most suitable skills, MCP tools, and subagents, giving top priority to token-saving capabilities (like code-review-graph and opencli) in every project and task. Use this skill immediately when starting any task, requirement, or question from the user.
---

# VIRGO (Verified Intent Routing & Guardrail Orchestrator)

Analyze user requirements, identify the context of the task, and map it to the most suitable agent, skill, or MCP tool. ALWAYS prioritize token-saving capabilities to minimize context overhead and token usage.

## Workflow

### 1. Intent Detection
When a user asks a question or assigns a task, first determine the domain of the requirement:
- **Codebase Tasks**: Structural exploration, change review, bug debugging, refactoring, code understanding.
- **Web & Automation Tasks**: Fetching web pages, filling forms, downloading media, checking social/developer notifications.
- **Scientific/Medical Tasks**: Querying proteins, genes, variants, clinical trials, drugs, or scientific publications.
- **General Coding/Workspace Tasks**: Running terminal commands, writing scripts, workspace organization, project setups.
- **Software Engineering Workflows**: Writing specs, planning, building features, writing tests, code review, shipping.

### 2. Capabilities Mapping & Token-Saving Priorities
Map the detected intent to the specific tools/skills, choosing the most token-efficient option:

#### A. Codebase Tasks (Prioritize `code-review-graph`)
- **Action**: Check if `code-review-graph` is available.
- **Rule**: ALWAYS use `code-review-graph` MCP tools BEFORE using generic file search (`grep_search`), listing directories (`list_dir`), or viewing entire files (`view_file`).
- **Tool Mapping**:
  - Code review/diff: Use `detect_changes_tool` and `get_review_context_tool` (with `detail_level="minimal"`).
  - Understanding impact/blast radius: Use `get_impact_radius_tool` or `get_affected_flows_tool`.
  - Code search / navigation: Use `semantic_search_nodes_tool` or `query_graph_tool`.
  - Architecture overview: Use `get_architecture_overview_tool` or `list_communities_tool`.
- **Target**: Keep total output tokens minimal by avoiding reading entire source files.

#### B. Web Tasks (Prioritize `opencli`)
- **Action**: Check if the task requires browsing.
- **Rule**: Avoid generic browser driving with Puppeteer/Playwright unless absolutely necessary.
- **Tool/Skill Mapping**:
  - Curated site commands: Use global `opencli` command (e.g. `opencli hackernews top`, `opencli bilibili hot`).
  - General page navigation / interaction: Use the `opencli-browser` skill to interact with your logged-in Chrome browser via structured DOM snapshots.
  - Repairing broken scripts: Use the `opencli-autofix` skill.

#### C. Scientific & Medical Tasks (Prioritize Domain-Specific Skills)
- **Rule**: Use targeted database skills rather than generic web search or downloading large text files.
- **Tool/Skill Mapping**:
  - Proteins & Structures: Use `uniprot-database`, `alphafold-database-fetch-and-analyze`, `foldseek-structural-search`, `pdb-database`, or `pymol`.
  - Genomics & Variant Effects: Use `alphagenome-single-variant-analysis`, `gnomad-database`, `ensembl-database`, `dbsnp-database`, `clinvar-database`, or `ucsc-conservation-and-tfbs`.
  - Bioactive Molecules & Drugs: Use `chembl-database`, `pubchem-database`, or `openfda-database`.
  - Pathways & Ontologies: Use `reactome-database`, `quickgo-database`, or `embl-ebi-ols`.
  - Literature Searches: Use `pubmed-database`, `literature-search-openalex`, or `literature-search-arxiv`.

#### D. Complex Tasks, Audits & Reviews (Prioritize Subagents)
- **Rule**: Delegate heavy auditing, coverage mapping, and branch building to dedicated subagents to maintain clean, low-token parent context windows.
- **Subagent Mapping**:
  - Extensive codebase exploration/surveys: Delegate to the `research` subagent.
  - Isolated branch coding, refactoring, or test executions: Delegate to the `self` subagent.
  - PR/Diff reviews: Register and invoke the `code-reviewer` subagent.
  - Vulnerability assessments & audits: Register and invoke the `security-auditor` subagent.
  - Test design & coverage mapping: Register and invoke the `test-engineer` subagent.
  - Releases & merges: Orchestrate parallel fan-out `/ship` containing `code-reviewer` + `security-auditor` + `test-engineer`.
- **Initialization**: If a specialist persona is not in the system's `Available subagents` registry, define it in the current session using `define_subagent` using the system prompt text located in `%USERPROFILE%\.gemini\config\agents\<persona>.md`.
- **Handoff Briefing**: Share a dense, brief note containing the exact goal, the files changed, and links to the required `SKILL.md` files. Do not dump the entire codebase into the subagent invocation prompt.

#### E. Design, Styling, and Typography Tasks
- **Rule**: When tasks involve layout design, styling, typography, or UI/UX improvements:
- **Skill Mapping**: ALWAYS trigger and consult the `typography-guide` skill for system font stacks, curated open-source font families, line heights, scales, and loading performance rules.

#### F. Software Engineering Workflows (Prioritize agent-skills pack)
- **Rule**: Map tasks to their corresponding lifecycle phase workflows:
- **Skill Mapping**:
  - `/spec` -> `spec-driven-development` (specifications)
  - `/plan` or `/planning` -> `planning-and-task-breakdown` (atomic task breakdown)
  - `/build` -> `incremental-implementation` (incremental feature building)
  - `/test` -> `test-driven-development` (Red-Green-Refactor, DAMP tests)
  - `/review` -> `code-review-and-quality` (five-axis review)
  - `/code-simplify` -> `code-simplification` (reducing complexity)
  - `/ship` -> `shipping-and-launch` (deployment & checklists)

#### G. Headless Assistant Delegation (Crush & OpenCode for Token Saving)
- **Rule**: For isolated coding, research, or refactoring tasks, delegate to `crush` or `opencode` via non-interactive commands to prevent inflating the parent agent's context window.
- **Workflow**:
  - **TCP Host Execution**: On Windows, always use `-H tcp://127.0.0.1:9090` to bypass unstable Named Pipe IPC hangs.
  - **Non-Interactive Guardrail**: Always close standard input or pipe empty input (`echo "" | crush ...`) and redirect stdout/stderr to a file or stream to completely bypass TUI/spinner rendering hangs in background sessions.
  - **Auto-Start Server**: If port 9090 is not listening, start the daemon first: `crush server -H tcp://127.0.0.1:9090` in the background.
  - Retrieve only the final response/modifications into the main session.
- **Ultimate Autonomic Model Routing (Brain & Autonomy)**:
  - Automatically evaluate the prompt's complexity, cost constraints, and target modality (text, code, image, video) to switch between the following tiers:
    1. **Free / High-Speed Flash Tier (Simple Tasks, Syntactic Checks, Basic Research)**:
       - *Default choice for initial investigations and low-complexity tasks.*
       - *Models:* `google/gemini-2.5-flash:free`, `meta-llama/llama-3-8b-instruct:free`, `deepseek/deepseek-v4-flash:free` (OpenRouter).
       - *Execution:* Run `echo "" | crush -H tcp://127.0.0.1:9090 run -m openrouter/deepseek/deepseek-v4-flash "your query"` (or Gemini).
    2. **Advanced Reasoning / Code Intelligence Tier (Complex Debugging, Coding, Architecture, Auditing)**:
       - *Used for multi-file refactoring, reasoning, planning, and security audits.*
       - *Models:* `meta/llama-3.3-70b-instruct` (NVIDIA NIM), `deepseek/deepseek-v4-pro` (OpenRouter), `moonshotai/kimi-k2.6` (OpenRouter/Moonshot).
       - *Execution:* Run `echo "" | crush -H tcp://127.0.0.1:9090 run -m nvidia/meta/llama-3.3-70b-instruct "your query"` or fallback to `openrouter/deepseek/deepseek-v4-pro`.
    3. **Creative Visual / Multimodal Tier (UI Designs, Styling Mockups, Graphic Assets)**:
       - *Used for image generation, interface layout design drafts, and style cards.*
       - *Models:* `black-forest-labs/flux-1.1-pro`, `openai/gpt-5-image` (OpenRouter).
    4. **Dynamic Video Demonstration Tier (Motion Mockups, Walkthroughs, Transition Demos)**:
       - *Used for rendering short motion walkthroughs or interaction animations.*
       - *Models:* `kwaivgi/kling-v3.0-pro`, `google/veo-3.1-fast` (OpenRouter).
  - **Self-Healing & Fallback Execution**:
    - If a command fails (due to rate limits, authentication issues, or model timeouts), automatically retry using the alternative provider or scale to the next available tier (e.g., fallback from `nvidia` NIM to OpenRouter's `deepseek/deepseek-v4-pro`).
    - Keep local `.crush.json` and `.opencode.json` updated with all these models and their correct base endpoints.
  - **Native Gemini & Verification Balance (Anti-Hallucination Guardrails)**:
    - **No Complete Dependency**: Do not completely rely on external models. Antigravity's native Gemini models (Gemini 2.5 Flash / Pro) are highly competent. Use them as the primary orchestrator, planner, and key code generator for core logic.
    - **Outcome Verification**: Any code generated headlessly via external models (e.g., `crush run`) MUST be immediately validated using the main agent's native environment tools (compilers, linters, or test suites).
    - **Fallback to Native Gemini**: If the external model generates broken code or experiences hallucination, route the debugging and correction task directly back to the native Gemini model within the parent session to rewrite/fix the logic.
    - **Paywall Protection**: Prioritize free-tier models (OpenRouter `:free` tags) and models covered by NVIDIA's free developer credits (NVIDIA NIM endpoints) to avoid hitting paywalls.

#### H. General Communication & Response Compression (Caveman Skills)
- **Rule**: When the user requests token savings, brief responses, or triggers caveman mode.
- **Skill Mapping**:
  - General chat compression: Use the `caveman` skill (default 'full' mode, or specify lite/ultra/wenyan).
  - Terse commit messages: Use `caveman-commit`.
  - Terse code reviews: Use `caveman-review`.
  - Saving tracking: Use `caveman-stats` to print session savings.
  - File compression: Use `caveman-compress` to compress text/rule files.

## 3. Understanding Project & Conversation History
Before executing a task in an already present project, or when starting a new session on an ongoing task, obtain full context:
- **Analyze Conversation Logs**: Check if there are past conversations in this workspace. Read the chronological transcript log at `%USERPROFILE%\.gemini\antigravity\brain\<conversation-id>\.system_generated\logs\transcript.jsonl` to understand what requests were made, what files were edited, and the decisions taken.
- **Leverage Code Review Graph**: Query the `code-review-graph` MCP tools first. Run `list_graph_stats_tool` to see if a graph has been built. If not, build it. Run `get_architecture_overview_tool` and `detect_changes_tool` to understand the codebase's architecture and the current delta (unstaged/uncommitted changes) of the project.

### 4. Execution Plan
Before running any modifying commands or making code changes:
1. Formulate a minimal-token execution plan identifying the exact skills/MCPs to trigger.
2. If the task is complex, document the steps in `task.md`.
3. Use the chosen skills/MCP tools to gather context and perform the task.
4. Report results concisely to the user, highlighting token savings where applicable.

