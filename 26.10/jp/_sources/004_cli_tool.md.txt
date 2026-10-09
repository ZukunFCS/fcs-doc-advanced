# CLI Tool

FCS CLI tool provides a script-based interface for automating facial capture and animation processing workflows. It allows you to load sessions, modify session properties, process videos, and upload animations to Maya—all through a simple YAML script format.

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Script Format](#script-format)
  - [Validation Strictness](#validation-strictness)
  - [Profiles](#profiles)
- [Execution Model](#execution-model)
- [Commands](#commands)
- [Step Types](#step-types)
- [Examples](#examples)
- [Logging](#logging)
- [Error Handling](#error-handling)
- [Maya Integration](#maya-integration)
- [Troubleshooting](#troubleshooting)

## Installation

The CLI tool is part of the FCS (Facial Capture System) package starting from FCS 26.04. 
It is automatically installed when you install FCS.

## Quick Start

Create a YAML script file (e.g., `my_script.yaml`):

```yaml
version: 1

context:
  session: "D:/Expo/Celllook2/FCS/Mao/Nike2/fcs_session.yaml"
  wait_seconds_after_scene_open: 2.0  # Optional: wait 2 seconds after scene opens
  fisheye: true  # Optional: enable fisheye correction
  pipeline: "Rich"  # Optional: use Rich pipeline
  denoising: "my_profile"  # Optional: load denoising profile from presets
  initial_scene_open: true  # Optional: open scene after validation (default: true)
  command_port: 42069  # Optional: Maya commandPort for all operations
  rename_controllers:  # Optional: modify controller name prefixes
    prefix: "char_face_"
    action: "prepend"  # or "remove"

steps:
  - process:
      video: "D:/Expo/Celllook/Facial/RecData/000_00_t00.mp4"
      upload:
        animation: true
        audio: true
      overrides:
        command_port: 42070  # Optional: use different port for this step
```

Run the script:

```bash
FCS_CLI.exe --file my_script.yaml
```

## Script Format

### Top-Level Structure

Every script must have three required sections:

```yaml
version: 1                    # Required: Must be exactly 1
context:                     # Required: Script context
  session: <string>          # Required: Path to fcs_session.yaml
steps:                       # Required: List of steps to execute
  - <step>                   # One or more steps
```

### Version

Currently, only version `1` is supported. This field ensures forward compatibility as the script format evolves.

### Context

The `context` section defines the session file to load at the start of script execution.

- **`session`** (required, string): Path to the FCS session YAML file. Must point to a file named exactly `fcs_session.yaml`; any other filename will fail validation.
- **`wait_seconds_after_scene_open`** (optional, float): Global sleep time in seconds to wait after a Maya scene is opened. This applies to all scene opening operations in the script, including when scenes are opened via `reopen_maya_scene` in `process` steps or when Maya launches with a scene. Default: `0.0` (no wait)
- **`fisheye`** (optional, bool): Enable or disable fisheye correction for video processing. If provided, overrides the UI setting. Default: `true`
- **`pipeline`** (optional, string): Processing pipeline to use for video processing. Must be one of: `"Rich"`, `"Robust"`, `"RP"`, `"RP++"`, `"Robust++"`, `"Rich++"`. If provided, overrides the UI setting. Default: `"RP++"`
- **`denoising`** (optional, string): Path to a denoising/smoothing profile file, or a filename to load from the smoothing presets directory. If it's a full path, it must exist. If it's just a filename (not a full path), it will be loaded from `FCS_TMP_DIR/smoothing_presets/filename.yaml`. If provided, loads the profile before processing. Default: No Smoothing
- **`command_port`** (optional, integer): Maya commandPort number to use for all Maya operations in the script. Must be an integer between 1 and 65535. If provided, recreates the connection with the specified port and uses it for all Maya preflight checks and uploads. Default: 42069.
- **`initial_scene_open`** (optional, bool): If `true` (the default), automatically opens the Maya scene once after data validation and before running all steps. The scene is opened only once at the start of script execution (after the preflight check), not before each step. If `false`, skips the initial scene opening. Default: `true` (scene will be opened automatically if `maya_scene` and `maya_base` are set in the session).
- **`rename_controllers`** (optional, mapping): Modify controller names by prepending or removing a prefix. This is applied once after the session is loaded, before any steps execute. Useful for adapting controller names to match Maya scene naming conventions.
  - `prefix` (required, string): The prefix to prepend or remove from all controller names
  - `action` (optional, string): Operation to perform - `"prepend"` (default) or `"remove"`
- **`playblast`** (optional, mapping): Override playblast settings for all process steps that export playblast. If not set, application settings are used.
  - `camera` (optional, string): Maya camera name (e.g. `"persp"`).
  - `width` (optional, integer): Output width in pixels.
  - `height` (optional, integer): Output height in pixels.
  - `percent` (optional, integer): Resolution percent (e.g. 100, must be 1–100).
  - `quality` (optional, integer): Playblast quality (e.g. 100, must be 1–100).
- **`profiles`** (optional, list): Rules to enable/disable ROM profiles in the loaded session before any steps run. See [Profiles](#profiles) for full details.

### Steps

Steps are executed sequentially in the order they appear. Each step must be a single-key mapping with one of these keys:
- `process` - Process a video and optionally upload to Maya
- `sleep` - Pause script execution for a specified duration

### Validation Strictness

Script validation follows a **strict schema contract**. The validator rejects any deviation from the defined schema:

1. **Unknown top-level fields → error**: Only `version`, `context`, and `steps` are allowed at the top level. Any other field will cause validation to fail.

2. **Unknown context fields → error**: Only the documented context fields are allowed. Unknown fields in the `context` section will cause validation to fail.

3. **Unknown step types → error**: Only `process` and `sleep` are valid step types. Any other step type will cause validation to fail.

4. **Unknown step fields → error**: Each step type has a defined set of allowed fields. Any field not explicitly documented for that step type will cause validation to fail.

5. **Extra keys in nested structures → error**: Nested structures (like `upload` in `process` steps, or `overrides`) only accept their documented fields. Unknown keys will cause validation to fail.

6. **Order matters**: Steps are executed sequentially in the exact order they appear in the `steps` list. The execution order is significant and cannot be changed.

**Examples of validation failures:**

```yaml
# ❌ Invalid: Unknown top-level field
version: 1
context:
  session: "path/to/session.yaml"
steps: []
unknown_field: "value"  # Error: unknown top-level field

# ❌ Invalid: Unknown context field
version: 1
context:
  session: "path/to/session.yaml"
  unknown_context_field: "value"  # Error: unknown context field
steps: []

# ❌ Invalid: Unknown step type
version: 1
context:
  session: "path/to/session.yaml"
steps:
  - unknown_step: {}  # Error: unknown step type

# ❌ Invalid: Unknown step field
version: 1
context:
  session: "path/to/session.yaml"
steps:
  - process:
      video: "path/to/video.mp4"
      unknown_field: "value"  # Error: unknown field in process step

# ❌ Invalid: Unknown nested field
version: 1
context:
  session: "path/to/session.yaml"
steps:
  - process:
      video: "path/to/video.mp4"
      upload:
        animation: true
        unknown_upload_field: true  # Error: unknown field in upload
```

### Profiles

The `profiles` context field lets you enable or disable profiles in the session before any steps run. Rules are applied sequentially — later rules override earlier ones for the profiles they match.

Each rule has three fields:

| Field | Required | Values | Description |
|-------|----------|--------|-------------|
| `match` | yes | `"all"` or a list of criteria | Which profiles to target |
| `select` | yes | `"all"`, `"none"`, or integer ≥ 1 | What to do with matched profiles |
| `condition` | no | `AND` (default) or `OR` | How to combine multiple criteria |

**`match` criteria** — each item in the list is a single-key mapping:

| Key | Matches when… |
|-----|--------------|
| `video: "<stem>"` | Profile's source video filename (without extension) equals value |
| `not_video: "<stem>"` | Profile has no source video, or its stem differs from value |
| `user_tag: "<tag>"` | Profile has this user tag |
| `no_user_tag: "<tag>"` | Profile does NOT have this user tag |

**`select` values:**

- `"all"` — enable all matched profiles
- `"none"` — disable all matched profiles
- integer N — randomly enable N of the matched profiles (error if fewer than N matched)

**Examples:**

```yaml
profiles:
  # Disable everything first
  - match: all
    select: none

  # Then enable exactly 10 profiles whose source video is "ROM_walk"
  - match:
      - video: "ROM_walk"
    select: 10

  # Enable all profiles tagged "hero" OR tagged "featured"
  - match:
      - user_tag: "hero"
      - user_tag: "featured"
    condition: OR
    select: all

  # Enable profiles tagged "validated" AND whose video is NOT "ROM_bad"
  - match:
      - user_tag: "validated"
      - not_video: "ROM_bad"
    condition: AND   # default, can be omitted
    select: all
```

> **Note**: `match` must be a YAML list (using `-` items). A plain mapping is rejected to prevent YAML's silent duplicate-key merging (e.g. two `video:` keys would collapse into one).

## Execution Model

Understanding how scripts execute helps you write effective automation workflows. The FCS CLI follows a predictable execution model:

### Execution Lifecycle

1. **Script Initialization**: The script is loaded and validated against the schema. Any schema error exits immediately with code 1 before any session or Maya operations occur.

2. **License Check**: License is checked out/validated. Failure exits with code 3.

3. **Session Loading**: The session file specified in `context.session` is loaded once. The session remains in memory throughout execution.

4. **Controller Renaming**: If `rename_controllers` is specified, controller name prefixes are prepended or removed once before any steps run.

5. **Profile Selection**: If `profiles` is specified, the rules are applied sequentially to set each ROM profile's enabled state.

6. **Affogato Initialization**: A connection to Maya's commandPort is established.

7. **Maya Preflight**: Maya reachability is verified. Failure exits with code 2 — no steps execute.

8. **Initial Scene Opening**: If `initial_scene_open` is `true` (the default) and the session has `maya_scene` and `maya_base` configured, the Maya scene is opened once before any steps run. Failures are non-fatal (logged as warnings). The script waits for `wait_seconds_after_scene_open` seconds after opening.

9. **Step Execution**: Steps execute sequentially in the order they appear. The license is re-checked before each step after the first. There is no rollback, branching, or parallelism.

### Context and Overrides

- **Context Fields**: All fields defined in the `context` section apply globally to all steps unless explicitly overridden. This includes settings like `fisheye`, `pipeline`, `denoising`, `command_port`, and `playblast`.

- **Step Overrides**: The `overrides` section in a `process` step applies only for the duration of that specific step. After the step completes, the global context values are restored. This allows you to temporarily change settings (like `command_port`, `maya_scene`, or `maya_base`) for individual processing operations.

### Execution Guarantees
- **Sequential Execution**: Steps always execute one at a time, in order
- **No Rollback**: If a step fails, execution stops; previous steps are not undone
- **No Branching**: Conditional logic or loops are not supported
- **No Parallelism**: Multiple steps cannot run simultaneously
- **Session Persistence**: The session remains in memory throughout execution; changes are not persisted to disk

## Commands

### Run Script

Execute a YAML script:

```bash
FCS_CLI.exe --file <script_path>
```

**Options:**
- `--file`, `-f`: Path to the YAML script file (required)
- `--dry-run`: Validate the script without executing it

**Examples:**

```bash
# Run a script
FCS_CLI.exe --file my_script.yaml

# Validate without executing
FCS_CLI.exe --file my_script.yaml --dry-run
```

## Step Types

### `process` Step

Processes a single video file and optionally uploads results to Maya.

**Format:**
```yaml
- process:
    video: <string>                    # Required
    upload:                             # Optional
      animation: <bool>                # Default: false
      audio: <bool>                    # Default: false
      frames: <bool>                   # Default: false
      lm_frames: <bool>                # Default: false
    export:                             # Optional
      scene: <bool>                    # Default: false
      playblast: <bool>                # Default: false
    force_reprocess: <bool>            # Optional, default: true
    time_offset_frames: <int>          # Optional, default: 0
    reopen_maya_scene: <bool>          # Optional, default: auto (see below)
    overrides:                          # Optional
      command_port: <int>              # Optional, override commandPort for this step
      maya_scene: <string>             # Optional, override maya_scene for this step
      maya_base: <string>              # Optional, override maya_base for this step
      out_scene_path: <string>        # Optional, path to save Maya scene file (.ma or .mb)
      out_playblast_path: <string>    # Optional, path to save playblast video
```

**Fields:**

- **`video`** (required, string): Path to the video file to process
- **`upload`** (optional, mapping): Upload options to Maya
  - `animation` (bool): Upload animation curves
  - `audio` (bool): Upload audio track
  - `frames` (bool): Upload video frames as image sequence
  - `lm_frames` (bool): Upload landmark-annotated frames. **Not supported with `++` pipelines** (`RP++`, `Rich++`, `Robust++`); raises `LM_FRAMES_UNSUPPORTED_PIPELINE` if used with one.
- **`export`** (optional, mapping): Export options after processing
  - `scene` (bool): Export Maya scene file
  - `playblast` (bool): Export playblast video
- **`force_reprocess`** (optional, bool): Force reprocessing even if cache exists. Default: `true`
- **`time_offset_frames`** (optional, integer): Frame offset for animation upload. Default: `0`, must be >= 0.
- **`reopen_maya_scene`** (optional, bool): Controls whether the Maya scene is reopened before processing:
  - `true` — always reopen, regardless of overrides or upload flags
  - `false` — never reopen (explicit opt-out)
  - omitted — **auto**: reopen only when any override (`command_port`, `maya_scene`, or `maya_base`) is present AND at least one `upload.*` flag is `true`
  - Positive values: Animation starts at the `time_offset_frames`th frame on Maya
  - Zero: No offset
- **`overrides`** (optional, mapping): Override values for this specific process step
  - `command_port` (optional, integer): Maya commandPort number to use for this step. Must be an integer between 1 and 65535. If provided, recreates the connection with the specified port for this step only, overriding the port from `context.command_port` or application settings. A preflight check is performed after to ensure Maya is reachable.
  - `maya_scene` (optional, string): Path to Maya scene file to use for this step. Overrides the session's `maya_scene` when `reopen_maya_scene` is `true`.
  - `maya_base` (optional, string): Path to Maya workspace base directory to use for this step. Overrides the session's `maya_base` when `reopen_maya_scene` is `true`.
  - `out_scene_path` (optional, string): Path to save Maya scene file (must have `.ma` or `.mb` extension). If not provided when `export.scene` is `true`, a warning is logged and the scene is **not saved**.
  - `out_playblast_path` (optional, string): Path to save playblast video, **without a file extension** (`.mp4` is appended automatically). If not provided when `export.playblast` is `true`, a default path is derived from the session's output folder and app settings.
  
  **Note**: The process step always recreates the Affogato connection with the effective port (override or context) and performs a preflight check before processing. When `reopen_maya_scene` is omitted and overrides are present, the scene is reopened automatically (see `reopen_maya_scene` above).


**Internal Maya Workflow**  
When any upload.* option is enabled in a process step, the CLI performs the following operations in Maya via commandPort, in strict sequence:
1. Scene timing setup
  - Set the Maya scene FPS to match the input video.
  - Set the scene playback range to match the total frame count of the video.
2. Audio setup (if `upload.audio = true`)
  - Import the audio track from the input video.
  - Attach the audio to the Maya timeline.
3. Reference frame setup (if `upload.frames = true` or `upload.lm_frames = true`)
  - Extract video frames as an image sequence.
  - Create or update an imagePlane using:
    raw frames if upload.frames = true
    landmark-annotated frames if upload.lm_frames = true

4. Animation reset
  - Remove all existing animation keyframes for every controller defined in the session.
  - This guarantees deterministic uploads and prevents keyframe accumulation across runs.

5. Animation upload
  - Apply newly computed animation curves to all session controllers.
  - If time_offset_frames > 0, all keyframes are shifted forward by the specified number of frames prior to insertion.

6. Output saving
  - Save the playblast video (if export.playblast = true).
  - Save the Maya scene file (if export.scene = true).


Notes

All operations are executed atomically per process step; partial uploads are not supported.  

If reopen_maya_scene = true, the Maya scene is reopened before this workflow begins.  

Controller matching is name-based. Controllers that cannot be resolved will silently receive no animation; no rollback is performed.  

This workflow is executed only when at least one upload.* option is enabled. Processing without uploads does not modify the Maya scene.

**Example:**
```yaml
- process:
    video: "D:/Expo/Celllook/Facial/RecData/000_00_t00.mp4"
    upload:
      animation: true
      audio: true
    export:
      scene: true
      playblast: true
    force_reprocess: true
    reopen_maya_scene: true
    time_offset_frames: 100
    overrides:
      command_port: 42070
      maya_scene: "D:/maya_scenes/alternate_scene.mb"
      maya_base: "D:/maya_workspace"
      out_scene_path: "D:/output/take_01.ma"
      out_playblast_path: "D:/output/take_01_playblast"
```

### `sleep` Step

Pauses script execution for a specified duration. Useful for waiting between operations or allowing external processes to complete.

**Format:**
```yaml
- sleep:
    seconds: <float>    # Required: number of seconds to sleep
```

**Fields:**

- **`seconds`** (required, float): Number of seconds to pause execution. Must be a non-negative number.

**Example:**
```yaml
- sleep:
    seconds: 5.0  # Wait 5 seconds

- sleep:
    seconds: 2.5  # Wait 2.5 seconds
```

## Examples

### Example 1: Basic Processing

Process a video and upload animation to Maya:

```yaml
version: 1

context:
  session: "D:/Expo/Celllook2/FCS/Mao/Nike2/fcs_session.yaml"

steps:
  - process:
      video: "D:/Expo/Celllook/Facial/RecData/000_00_t00.mp4"
      upload:
        animation: true
```

### Example 2: Multiple Videos with Scene Changes

Process multiple videos, changing Maya scene between them. Because `maya_scene` is overridden and `upload.animation` is true, the scene is reopened automatically:

```yaml
version: 1

context:
  session: "D:/Expo/Celllook2/FCS/Mao/Nike2/fcs_session.yaml"

steps:
  - process:
      video: "D:/Expo/Celllook/Facial/RecData/000_00_t00.mp4"
      upload:
        animation: true
        audio: true
      overrides:
        maya_scene: "D:/maya_scenes/scene_01.mb"

  - process:
      video: "D:/Expo/Celllook/Facial/RecData/000_01_t00.mp4"
      upload:
        animation: true
      overrides:
        maya_scene: "D:/maya_scenes/scene_02.mb"
```

### Example 3: Animation with Time Offset

Upload animations with different time offsets:

```yaml
version: 1

context:
  session: "D:/Expo/Celllook2/FCS/Mao/Nike2/fcs_session.yaml"

steps:
  - process:
      video: "D:/Expo/Celllook/Facial/RecData/000_00_t00.mp4"
      upload:
        animation: true
      time_offset_frames: 100    # Starts at frame 100 in Maya

  - process:
      video: "D:/Expo/Celllook/Facial/RecData/000_01_t00.mp4"
      upload:
        animation: true
      time_offset_frames: 200    # Starts at frame 200 in Maya
```

### Example 4: Controller Prefix Management

Add controller prefix in context before processing:

```yaml
version: 1

context:
  session: "D:/Expo/Celllook2/FCS/Mao/Nike2/fcs_session.yaml"
  rename_controllers:
    prefix: "char_face_"
    action: "prepend"

steps:
  - process:
      video: "D:/Expo/Celllook/Facial/RecData/000_00_t00.mp4"
      upload:
        animation: true
```

### Example 5: Full Processing Pipeline

Complete workflow with all features. Note: `lm_frames` requires a non-`++` pipeline (e.g. `Rich`, `Robust`, `RP`), so the context sets `pipeline: "Rich"`:

```yaml
version: 1

context:
  session: "D:/Expo/Celllook2/FCS/Mao/Nike2/fcs_session.yaml"
  wait_seconds_after_scene_open: 2.0
  initial_scene_open: true
  command_port: 42069
  pipeline: "Rich"

steps:
  - process:
      video: "D:/Expo/Celllook/Facial/RecData/000_00_t00.mp4"
      upload:
        animation: true
        audio: true
        frames: true
        lm_frames: true
      export:
        scene: true
        playblast: true
      force_reprocess: true
      time_offset_frames: 0
      # reopen_maya_scene omitted — auto-reopens because overrides are present and upload is requested
      overrides:
        command_port: 42070
        maya_scene: "D:/maya_scenes/alternate_scene.mb"
        maya_base: "D:/maya_workspace"
        out_scene_path: "D:/output/take_01_processed.ma"
        out_playblast_path: "D:/output/take_01_playblast"
```

### Example 6: Skip Initial Scene Opening

Disable the automatic scene open at startup, then explicitly reopen per-step:

```yaml
version: 1

context:
  session: "D:/Expo/Celllook2/FCS/Mao/Nike2/fcs_session.yaml"
  initial_scene_open: false  # Skip initial scene opening after validation

steps:
  - process:
      video: "D:/Expo/Celllook/Facial/RecData/000_00_t00.mp4"
      upload:
        animation: true
      reopen_maya_scene: true  # Explicitly reopen before this step
```

### Example 7: Profile Selection

Disable all profiles then randomly enable 10 from a specific video:

```yaml
version: 1

context:
  session: "D:/Expo/Celllook2/FCS/Mao/Nike2/fcs_session.yaml"
  profiles:
    - match: all
      select: none
    - match:
        - video: "ROM_walk"
      select: 10

steps:
  - process:
      video: "D:/Expo/Celllook/Facial/RecData/000_00_t00.mp4"
      upload:
        animation: true
```

## Logging

When a script is executed (not in `--dry-run` mode), the CLI automatically creates a log file next to the script at `<script_name>.log`. For example, running `my_script.yaml` produces `my_script.log` in the same directory.

- **Log level**: INFO and above (INFO, WARNING, ERROR)
- **Encoding**: UTF-8
- **Lifecycle**: The log file is created when execution begins and the log sink is removed when execution completes (regardless of success or failure). If the log file already exists, it is overwritten.

This log file captures the same structured messages shown in the console output, providing a persistent record of script execution for debugging and auditing.

## Error Handling

### Error Codes

The CLI uses structured error codes for programmatic error handling:

| Code | Description |
|------|-------------|
| `SESSION_NOT_FOUND` | Session file does not exist |
| `SESSION_INVALID` | Session file is invalid or corrupted |
| `SESSION_LOAD_ERROR` | Error loading session (generic load failure) |
| `NO_SESSION_LOADED` | Attempted operation without loading a session |
| `MISSING_RENAME_CONTROLLERS_PREFIX` | Missing prefix in `rename_controllers` context field |
| `INVALID_RENAME_CONTROLLERS_PREFIX` | Invalid prefix value in `rename_controllers` context field |
| `INVALID_RENAME_CONTROLLERS_ACTION` | Invalid action in `rename_controllers` context field (must be "prepend" or "remove") |
| `PROFILES_INSUFFICIENT_MATCH` | `select: N` specified but fewer than N profiles matched the rule |
| `VIDEO_NOT_FOUND` | Video file does not exist |
| `MAYA_NOT_REACHABLE` | Maya commandPort is not reachable |
| `MAYA_SCENE_NOT_SET`    | Maya scene path not set in session or overrides |
| `MAYA_SCENE_NOT_FOUND`  | Maya scene file does not exist |
| `MAYA_SCENE_OPEN_ERROR` | Failed to open Maya scene (raised when `reopen_maya_scene` is `true`) |
| `MAYA_BASE_NOT_SET`     | Maya base path not set in session |
| `MAYA_BASE_NOT_FOUND`   | Maya base folder does not exist |
| `PIPELINE_ERROR` | Video processing pipeline failed (train/predict failure) |
| `ANIMATION_NOT_FOUND` | Animation cache file not found after processing |
| `LM_FRAMES_UNSUPPORTED_PIPELINE` | `lm_frames` upload requested with a `++` pipeline (not supported) |
| `DENOISING_PROFILE_NOT_FOUND` | Denoising profile file not found at specified path |
| `DENOISING_PROFILE_LOAD_ERROR` | Failed to load denoising profile file |
| `OUTPUT_DIR_NOT_CREATED` | Failed to create required output directory |
| `OUTPUT_FILE_NOT_CREATED` | Expected output file(s) were not created after processing |
| `PLAYBLAST_PATH_HAS_SUFFIX` | `out_playblast_path` was provided with a file extension (`.mp4` is appended automatically) |

### Execution Behavior

- **Validation Errors**: Script validation fails before any steps are executed (exit code 1)
- **Maya Errors**: Maya-related failures (not reachable, scene open failure, etc.) exit with code 2
- **Execution Errors**: Script stops at the first failed step (exit code 3)

### Exit Codes

- `0`: Success
- `1`: Validation error (script schema validation, missing fields, invalid values)
- `2`: Maya related error (Maya not reachable, scene open failure, Maya configuration issues)
- `3`: Execution failure (license check failed, session load error, pipeline error, step execution failure)

## Maya Integration

### Prerequisites

1. **Maya must be running** with commandPort enabled
2. **CommandPort** must be open (typically port 42069, or as specified in the script's `context.command_port`)

### Maya Preflight and Scene Opening

Before executing any steps, the CLI performs a preflight check:

1. Tests Maya commandPort connectivity
2. If Maya is not reachable:
   - Logs error: `MAYA_NOT_REACHABLE`
   - Exits with code 2
   - No steps are executed
3. If Maya is reachable and `initial_scene_open` is `true` (the default):
   - Automatically opens the Maya scene specified in the session (`maya_scene` and `maya_base`)
   - Waits for `wait_seconds_after_scene_open` seconds if configured
   - This ensures the scene is ready before processing begins

### Upload Options

When processing videos, you can upload:

- **Animation**: Facial animation curves (blendshapes, controllers)
- **Audio**: Audio track from video
- **Frames**: Video frames as image sequence for reference
- **LM Frames**: Landmark-annotated frames for visualization

### Scene Management

- **`reopen_maya_scene`**: Controls when the Maya scene is reopened before a process step. `true` = always, `false` = never, omitted = auto (when any override is present and at least one upload flag is true). When reopening, override values for `maya_scene`/`maya_base` take precedence over session values.
- **`overrides.out_scene_path`**: Saves the Maya scene to a specific path after processing
- **`overrides.out_playblast_path`**: Saves a playblast video to a specific path after processing
- Scene paths are resolved from the session's `maya_base` and `maya_scene` properties
- **Process Step Preflight**: Before each process step, a connection is recreated with the effective port (from override or context), and a preflight check is performed to ensure Maya is reachable

### Time Offset

The `time_offset_frames` parameter allows you to control where animation starts on the Maya timeline:

- **Positive offset**: Animation starts later (e.g., `100` starts at frame 100)
- **Zero**: Animation starts at the default position (typically frame 0)
- **Note**: Only non-negative values (>= 0) are allowed

This is useful for:
- Combining multiple takes in a single timeline
- Aligning animation with existing keyframes
- Creating animation sequences with gaps

## Troubleshooting

### Script Validation Fails

**Problem**: Script fails validation with error about structure or types.

**Solutions**:
- Ensure `version: 1` is present and exactly `1`
- Check that `context.session` is a non-empty string
- Verify `steps` is a non-empty list
- Ensure each step has exactly one key (`process` or `sleep`)
- Check field types match the schema (strings, booleans, integers)

### Maya Not Reachable

**Problem**: Script exits with `MAYA_NOT_REACHABLE` error.

**Solutions**:
- Ensure Maya is running
- Verify commandPort is open: In Maya, run `cmds.commandPort(n=':42069', stp='python')` (or use the port specified in `context.command_port` if provided)
- Verify firewall/network settings allow localhost connections
- If using a custom `command_port` in context, ensure Maya's commandPort matches the specified port number

### Video Processing Fails

**Problem**: `PIPELINE_ERROR` during video processing.

**Solutions**:
- Verify video file exists and is readable
- Check session has valid solver configuration
- Ensure sufficient disk space for cache
- Review logs for detailed error messages

### Animation Not Uploading

**Problem**: Animation upload appears to succeed but nothing appears in Maya.

**Solutions**:
- Verify Maya scene has the correct character rig loaded
- Check controller names match between session and Maya scene
- Ensure animation layer exists in Maya (default: "BaseAnimation")
- Review Maya script editor for Python errors

## Best Practices

1. **Always validate first**: Use `--dry-run` to validate scripts before execution
2. **Use explicit paths**: Prefer absolute paths for reliability
3. **Test incrementally**: Start with simple scripts, add complexity gradually
5. **Check Maya connection**: Ensure Maya is running before processing with upload
6. **Use time offsets carefully**: Verify frame ranges to avoid overlaps
7. **Version control scripts**: Keep scripts in version control for repeatability

## Advanced Usage

### Batch Processing

Process multiple videos in sequence:

```yaml
version: 1

context:
  session: "D:/Expo/Celllook2/FCS/Mao/Nike2/fcs_session.yaml"

steps:
  - process:
      video: "D:/Expo/Celllook/Facial/RecData/000_00_t00.mp4"
      upload:
        animation: true
      time_offset_frames: 0

  - process:
      video: "D:/Expo/Celllook/Facial/RecData/000_01_t00.mp4"
      upload:
        animation: true
      time_offset_frames: 1000

  - process:
      video: "D:/shots/take_03.mp4"
      upload:
        animation: true
      time_offset_frames: 2000
```

### Controller Prefix Management

Add controller prefix in context before processing:

```yaml
version: 1

context:
  session: "D:/Expo/Celllook2/FCS/Mao/Nike2/fcs_session.yaml"
  rename_controllers:
    prefix: "char_face_"
    action: "prepend"

steps:
  - process:
      video: "D:/Expo/Celllook/Facial/RecData/000_00_t00.mp4"
      upload:
        animation: true
```

### Conditional Scene Switching

Change Maya scene per step. Scene is reopened automatically because `maya_scene` is overridden and upload is requested:

```yaml
version: 1

context:
  session: "D:/Expo/Celllook2/FCS/Mao/Nike2/fcs_session.yaml"

steps:
  - process:
      video: "D:/shots/closeup_01.mp4"
      upload:
        animation: true
      overrides:
        maya_scene: "D:/maya_scenes/closeup_scene.mb"

  - process:
      video: "D:/shots/wide_01.mp4"
      upload:
        animation: true
      overrides:
        maya_scene: "D:/maya_scenes/wide_scene.mb"
```

## Support

For issues, questions, or feature requests, please refer to the main FCS documentation or contact the development team.
