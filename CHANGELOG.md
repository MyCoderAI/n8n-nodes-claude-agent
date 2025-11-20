# Changelog

All notable changes to this project will be documented in this file.

## [0.1.18] - 2025-11-20

### Added
- Output Schema support: Define JSON schemas to enforce structured output formats
- New "Output Schema (JSON)" field in Additional Options for consistent, predictable outputs
- Automatic validation and parsing of JSON schemas before execution

### Changed
- Enhanced data consistency by allowing users to define expected output structures

## [0.1.17] - 2025-11-20

### Added
- Resume session support: Added ability to resume previous Claude Code sessions using session IDs
- New "Resume Session ID" field in Additional Options to continue conversations from previous executions
- Session IDs are now available in node output for storage and reuse in subsequent workflow steps

### Changed
- Enhanced workflow capabilities by enabling session continuity across multiple node executions

## [0.1.16] - Previous Release

Initial stable release with core Claude Code functionality.

