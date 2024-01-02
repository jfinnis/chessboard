# Usage of Bun Instead of Node

## Context

Tooling for JS and TS is a huge pain point of most projects. Typescript requires a compile step 
and tests require separate setup with their own configuration. Bun seeks to unify this process.

## Decision

Bun is the current new hotness and this project will use it in order to see if it is indeed
production-ready,
including the Bun Test commands. All package.json scripts should use bun and not Node.js.

## Status

Accepted

## Consequences

There may be libraries that might slightly not work under Bun, though most major ones should be compatible.

<!-- Template Source: https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions -->
